import {createRouter, createWebHistory} from 'vue-router'

// const MODE = import.meta.env.MODE;

export const routes = [
    {path: '/:permalink', component: () => import('../view/Product.vue')},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    console.debug(to, from);
    next();
});
