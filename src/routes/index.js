import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFoundPage from '../views/NotFoundPage.vue';
import SignupView from '../views/SignupView.vue';
import LoginView from '../views/LoginView.vue';
import StoreEdit from '../views/StoreEdit.vue';
import StoreList from '../views/StoreList.vue';
import StoreRegister from '../views/StoreRegister.vue';
import StoreDetail from '../views/StoreDetail.vue';
import ReviewForm from '../views/ReviewForm.vue';
import ReviewDetail from '../views/ReviewDetail.vue';
import ReviewList from '../views/ReviewList.vue';
import Homepage from '../views/Homepage.vue';


Vue.use(VueRouter);
// 라우터 설정정
export default new VueRouter({
    mode: 'history',
	routes: [
        {
            path: '/',
            name: 'Homepage',
            redirect: '/Home'
        },
        {
            path: '/Home',
            name: 'Homepage',
            component:Homepage
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
            path: '/review/:storeNo/register',
            name: 'ReviewForm',
            component: ReviewForm 
        },
        {
            path: '/review/:reviewNo',
            name: 'ReviewDetail',
            component: ReviewDetail,  // 리뷰 상세 컴포넌트
            props: true
        
        },
        {
            path: '/review/:storeNo',
            name: 'ReviewList',
            component: ReviewList,  
            props: true 
          
        },
        {
            path: '*',
            component: NotFoundPage
        }
    ],
});
