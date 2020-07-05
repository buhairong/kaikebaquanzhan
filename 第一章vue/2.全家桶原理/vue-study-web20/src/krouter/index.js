import Vue from 'vue'
import VueRouter from './kvue-router1'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
        {
            path: '/about/info',
            name: 'About',
            component: {render(h){return h('div', 'info page')}}
        }
    ]
  },
    {
        path: '*',
        name: 'NotFound',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
