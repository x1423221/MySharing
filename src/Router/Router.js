import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
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

