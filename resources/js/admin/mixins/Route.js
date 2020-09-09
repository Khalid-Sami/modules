export default {
    methods: {
        /**
         * this function is used to
         * append query params. into
         * route
         *
         * @param value
         * @author Amr
         */
        pushQuery(value) {
            let routeQuery = this.$route.query;
            let query = {
                ...routeQuery,
                ...value
            }
            this.__pushToRoute(query);
        },
        /**
         * this function is used to get all route's
         * query params
         */
        getQuerey() {
            return this.$route.query;
        },
        /**
         * this function is used to
         * push the given query into route
         * but this function should be called
         * locally
         *
         * @private
         * @param query
         */
        __pushToRoute(query) {
            this.$router.push({query: {}})
            this.$router.push(query)
        },
        /**
         * remove query param according to the given
         * key
         *
         * @param removedKey
         * @author Amr
         */
        removeQuery(removedKey) {
            let routeQuery = Object.assign({} , this.$route.query);
            delete routeQuery[removedKey]
            this.__pushToRoute(routeQuery);

        }
    }
}