import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

// const router = createRouter()

/**
 * The router factory
 */
// function createRouter() {
    const router = new Router({
        // scrollBehavior,
        mode: 'history',
        routes,
    })
    // @Todo i got problem here, so I got to stop it till i finish developing
    // router.beforeEach(beforeEach)
    // router.afterEach(afterEach)
    // return router
// }


async function beforeEach(to, from, next) {

}


async function afterEach(to, from, next) {

}

function resolveComponents(components) {
    return Promise.all(
        components.map(component => {
            return typeof component === 'function' ? component() : component
        })
    )
}

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    }

    if (to.hash) {
        return {selector: to.hash}
    }

    const [component] = router.getMatchedComponents({...to}).slice(-1)

    if (component && component.scrollToTop === false) {
        return {}
    }

    return {x: 0, y: 0}
}

export default router
