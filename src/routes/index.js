import Vue from 'vue';
import VueRouter from 'vue-router';
import TestView from '../views/TestView.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import SignupView from '../views/SignupView.vue';
import LoginView from '../views/LoginView.vue';
import StoreEdit from '../views/StoreEdit.vue';
import StoreList from '../views/StoreList.vue';
import StoreRegister from '../views/StoreRegister.vue';
import StoreDetail from '../views/StoreDetail.vue';

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
            path: '/user/signup', 
            name: 'Signup', 
            component: SignupView 
        },
        { 
            path: '/user/login', 
            name: 'Login', 
            component: LoginView 
        },
        {
            path: '/store/edit/:storeNo',
            name: 'StoreEdit',
            component: StoreEdit
        },
        {
            path: '/store',
            name: 'StoreList',
            component: StoreList
        },
        {
            path: '/store/register',
            name: 'StoreRegister',
            component: StoreRegister
        },
        {
            path: '/store/:storeNo',
            name: 'StoreDetail',
            component: StoreDetail
        },
        {
            path: '*',
            component: NotFoundPage
        },
    ],
});
