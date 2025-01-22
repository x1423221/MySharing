import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("../components/HomeComponents.vue")
        },
        {
            path: '/group',
            name: 'group',
            component: () => import("../components/GroupComponents.vue")
        },
        {
            path: '/history',
            name: 'history',
            component: () => import("../components/HistoryComponents.vue")
        }
    ],
})

export default router

