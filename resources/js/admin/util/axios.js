// import router from '@/router'
// import i18n from "@/lang/lang";
import * as axios from "axios";

export const API_URL = '/api/';

const EXAMPLE_URI = 'example';


/**
 * this function is used to create paramQuery
 *
 * @param param
 * @return {string}
 * @author Amr
 */
const getParam = (param = undefined) => {
    let queryParam = '';
    if (param != undefined && typeof param == 'object') {
        for (let name in param) {
            queryParam += `${name}=${param[name]}&`
        }
        queryParam = queryParam.substring(0, queryParam.length - 1);
        queryParam = '?' + queryParam
    }
    return queryParam;
    return API_URL + CONSTANTS_URI + '' + queryParam;
}
export const routes = {
        example: {
            fetch: function () {
                return API_URL + EXAMPLE_URI + '/test/'
            },
        }
}

const getHeader = () => {
    let userInfo = localStorage.getItem('userInfo');                                                             // get user's Info form the local storage if there is any @author Amr
    if (userInfo == null) {                                                                                             // if there is no user's info return the config without any updates @author Amr
        return null;
    }
    userInfo = JSON.parse(userInfo);                                                                                  // parse the json object to get the access_token and token_type @author Amr
    let header = {
        "Authorization": `${userInfo.token_type} ${userInfo.access_token}`,
        // "lang": i18n.locale
    }
    return header;

}

axios.interceptors.request.use(function (config) {

        let userInfo = localStorage.getItem('userInfo');                                                             // get user's Info form the local storage if there is any @author Amr
        if (userInfo == null) {                                                                                             // if there is no user's info return the config without any updates @author Amr
            return config;
        }
        if (config.headers.common.Authorization == undefined) {
            userInfo = JSON.parse(userInfo);                                                                                  // parse the json object to get the access_token and token_type @author Amr
            config.headers.common.Authorization = `${userInfo.token_type} ${userInfo.access_token}`;
            config.headers.common['Authorization'] = `${userInfo.token_type} ${userInfo.access_token}`;
            config.headers.Authorization = `${userInfo.token_type} ${userInfo.access_token}`;
        }
        // appeand the token with request's header @author Amr
        // config.headers.lang = i18n.locale;

        return config;
    }
    // ,
    // error => Promise.reject(error)
);

axios.interceptors.response.use(
    response => {
        const {status, message} = response.data;
        if (response.data.status === 'error') {

            switch (response.data.error_code) {
                case 102 :
                    break;
                case 106 :
                    window.location.href = '/' + SUPER_URI;
                    break;
                default :
                    break;
            }
            return response;
        }
        return response;
    },
    error => {
        console.log('error', error)
        const {status} = error.response;
        console.error('error.response', error.response);
        // console.error("response", status)
        // Show the user a 500 error
        if (status >= 500) {
            Brilliant.$emit('error', error.response.data.message)
        }

        // Handle Session Timeouts
        if (status === 401) {
            window.location.href = Brilliant.config.base
        }

        // Handle Forbidden
        if (status === 403) {
            router.push({name: '403'})
        }

        // Handle Token Timeouts
        if (status === 419) {
            Brilliant.$emit('token-expired')
        }

        return Promise.reject(error)
    }
)

const instance = axios;
// instance.defaults.headers.common = getHeader()
export default instance

export const makeRequest = (method, url, data, then_function, catch_function) => {
    switch (method) {
        case 'POST':
            return axios.post(url, data).then(then_function).catch(catch_function);
        case 'PUT':
            return axios.put(url, data).then(then_function).catch(catch_function);
        case 'PATCH':
            return axios.patch(url, data).then(then_function).catch(catch_function);
        case 'DELETE':
            return axios.delete(url, data).then(then_function).catch(catch_function);
        default :
            return axios.get(url, data).then(then_function).catch(catch_function);
    }
};

export const getAPI = (url, data) => {
    return axios.get(url, data);
};
export const postAPI = (url, data) => {
    return axios.post(url, data);
};
export const putAPI = (url, data) => {
    return axios.put(url, data);
};
export const patchAPI = (url, data) => {
    return axios.patch(url, data);
};
