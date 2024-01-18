import { createRouter, createWebHistory } from "vue-router";
import CoachesList from './pages/coaches/CoachesList.vue'
import store from './store/index.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList},
        {
            path: '/coaches/:id',
            props: true,
            component: () => import('./pages/coaches/CoachDetail.vue'), 
            children: [
                {path: 'contact', component: () => import('./pages/requests/ContactCoach.vue')}
            ]
        },
        {path: '/register', component: () => import('./pages/coaches/CoachRegistration.vue'), meta: {ifAuthorized: true}},
        {path: '/requests', component: () => import('./pages/requests/RequestRecieved.vue'), meta: {ifAuthorized: true}},
        {path: '/auth', component: () => import('./pages/auth/UserAuth.vue'), meta: {ifNotAuthorized: true}},
        {path: '/:notFound(.*)', component: null}
    ]
})

router.beforeEach((to, _, next) => {
    if(to.meta.ifAuthorized && !store.getters.isAuthenticated) {
        next('/auth')
    } else if( to.meta.ifNotAuthorized && store.getters.isAuthenticated) {
        next('/coaches')
    } else {
        next()
    }
})

export default router