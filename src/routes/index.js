import Vue from 'vue';
import VueRouter from 'vue-router';
import TestView from '../views/TestView.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import { component } from 'vue/types/umd';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
	routes: [
        {
            path: '/',
            redirect: '/test',
        },
        {
            path: '/test',
            component: TestView,
        },
        {
            path: '*',
            component: NotFoundPage
        }
    ],
});
