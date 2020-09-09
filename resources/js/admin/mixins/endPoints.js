let methods = {
    route($routeName, $params = {}) {
        let self = this;
        let currentChild = self.endPoints();  // get route function from end points object
        $routeName.split('.').forEach(function ($uri) {
            if (currentChild[$uri] !== undefined)
                currentChild = currentChild[$uri];  // set child node ( if current node isn't undefined )
        });
        if (currentChild instanceof Function) // check if last node is a function
            return currentChild($params); // execute node function

        return {
            url: self.api_base_link,
            method: 'get',
        };
    },
    endPoints() {
        let self = this;
        return {
            users: {
                fetch: ($params) => {
                    return self.prepareEndPoint('get', $params, self.users)
                },
                find: ($params) => {
                    return self.prepareEndPoint('get', $params, self.example, 'example-1', 'example_id')
                },
                store: ($params) => {
                    return self.prepareEndPoint('post', $params, self.example, 'example-1')
                },
                update: ($params) => {
                    return self.prepareEndPoint('put', $params, self.example, 'example-1', 'example_id')
                },
                activate: ($params) => {
                    return self.prepareEndPoint('patch', $params, self.example, 'example-1', 'example_id')
                },
                delete: ($params) => {
                    return self.prepareEndPoint('delete', $params, self.example, 'example-1', 'example_id')
                },
            },

            prepareEndPoint($method, $params, ...args) {
                let url = this.api_base_link;
                args.forEach(function (object) {  // for each on dynamic parameters
                    Object.keys($params).forEach(function (item) {
                        if (object === item)
                            object = $params[item];    // replace route params by keys from the end point
                    });
                    url += '/' + object; // concatenate new uri
                });
                return {
                    method: $method, // set method from end point object
                    url: url
                };
            }
            ,
        }
    },
    prepareEndPoint($method, $params, ...args) {
        let url = this.api_base_link;
        args.forEach(function (object) {  // for each on dynamic parameters
            Object.keys($params).forEach(function (item) {
                if (object === item)
                    object = $params[item];    // replace route params by keys from the end point
            });
            url += '/' + object; // concatenate new uri
        });
        return {
            method: $method, // set method from end point object
            url: url
        };
    },
}


export default {
    data() {
        return {
            api_base_link: '/admin/api',
            example: 'example',
            users: 'users',
            crud: {
                find: 'find',
                get: 'fetch',
                store: 'store',
                edit: 'edit',
                update: 'update',
                delete: 'delete',
                activate: 'active',
                search: 'search'
            }
        }
    },

    beforeCreate() {
        /**
         * check if component has route variable as prop.
         * if so, remove the route function 'cause that's not necessary to be attached
         * @author Amr
         */
        if (this.$options.props && this.$options.props.route != undefined) {
            delete methods['route']
        }
        /**
         * inject mixins' methods inside the current object
         * to be published over all called vue components
         * @author Amr
         */
        this.$options.methods = {
            ...this.$options.methods,
            ...methods
        }
    },
}
