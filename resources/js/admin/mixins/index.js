import Vue from 'vue'
import request from '@/mixins/request'
import endPoints from './endPoints';
import Route from './Route';


/**
 * _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _  _ _ _ _  _ _ _
 *
 *                      MIXINS
 * _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _  _ _ _ _  _ _ _
 *
 * register mixin globally
 * @author Amr
 */
Vue.mixin(request)
Vue.mixin(endPoints)
Vue.mixin(Route)
/**
 * this mixins composes all curd operations
 * in the system
 *
 * @author Amr
 */

// export {
//     InteractsWithQueryString
// }
