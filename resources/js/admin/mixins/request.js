import axios from "../util/axios";
import Constants from "../util/constants";

export default {
    data() {
        return {
            header: {}
        }
    },
    methods: {
        request: function (end_point, data = {}, success_callback = undefined, error_callback = undefined, finally_callback = undefined, is_loader_displayed = true) {
            let _this = this;
            success_callback = success_callback || _this.onSuccess;
            error_callback = error_callback || _this.onError;
            // _this.showLoader();
            let method = end_point.method.toLowerCase();
            let header = this.getRequestHeader();
            console.log('datata', data)
            return axios[method](end_point.url, data, header).then(function (response) {
                switch (response.status) {
                    case Constants.SUCCESS_RESPONSE:
                        return success_callback(response); // success handler
                    case Constants.ERROR_RESPONSE :
                        return error_callback(response); // error handler
                }
            }).catch(error_callback).finally(finally_callback || this.onFinally);
        },
        onSuccess: function (response) {
            // called if success callback not exists
        },
        onError(xhr) {
            // called if error callback not exists

        },
        onFinally(data) {
            //called if finally callback not exists
        },
        getRequestHeader() {
            let _this = this;
            return {
                headers: _this.header
            }
        },
    }
}
