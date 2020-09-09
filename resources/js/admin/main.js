import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ApiService from "./common/api.service";
import MockService from "./common/mock/mock.service";
import { VERIFY_AUTH } from "./store/auth.module";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

require('./components/index.js')
require('./mixins/index.js');
require('./plugins/index.js');

const opts = {};

export default new Vuetify(opts);


Vue.config.productionTip = false;

// var VueCookie = require('vue-cookie');
// Vue.use(VueCookie);

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function (msg, vm, trace) {
    // `trace` is the component hierarchy trace
    if (msg === ignoreWarnMessage) {
        msg = null;
        vm = null;
        trace = null;
    }
}

// Global 3rd party plugins
import "bootstrap";
import "popper.js";
import "tooltip.js";
import "perfect-scrollbar";

// Vue 3rd party plugins
import i18n from "./common/plugins/vue-i18n";
import vuetify from "./common/plugins/vuetify";
import "./common/plugins/bootstrap-vue";
import "./common/plugins/perfect-scrollbar";
import "./common/plugins/highlight-js";
import "@babel/polyfill";
import "@mdi/font/css/materialdesignicons.css";

// API service init
// ApiService.init();

// Remove this to disable mock API
// MockService.init();

// Ensure we checked auth before each page load.
// router.beforeEach((to, from, next) => {
//   Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);
//
//   // Scroll page to top on every route change
//   setTimeout(() => {
//     window.scrollTo(0, 0);
//   }, 100);
// });

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount("#app");
