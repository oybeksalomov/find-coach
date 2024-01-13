import { createRouter, createWebHistory } from "vue-router";
import CoachesList from './pages/coaches/CoachesList.vue'

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
        {path: '/register', component: () => import('./pages/coaches/CoachRegistration.vue')},
        {path: '/requests', component: () => import('./pages/requests/RequestRecieved.vue')},
        {path: '/:notFound(.*)', component: null}
    ]
})

export default router