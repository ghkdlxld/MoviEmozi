import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Community from '@/views/community/Community.vue'
import QuestionList from '@/views/community/QuestionList.vue'
import Signup from '@/views/profilebar/Signup.vue'
import Login from '@/views/profilebar/Login.vue'
import MyProfile from '@/views/profilebar/MyProfile.vue'
import BoardDetail from '@/views/community/BoardDetail.vue'
import ReviewDetail from '@/views/community/ReviewDetail.vue'
import ReviewList from '@/views/community/ReviewList.vue'
import BoardCreate from '@/views/community/BoardCreate.vue'
import ReviewCreate from '@/views/community/ReviewCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // community 전체페이지 (자유, 건의, 리뷰)
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path:'/review',
    name:'ReviewList',
    component:ReviewList
  },
  // 글 쓰기 
  {
    path: '/community/create',
    name:'BoardCreate',
    component:BoardCreate
  },
  {
    path:'/community/review/create',
    name:'ReviewCreate',
    component:ReviewCreate
  },
  // 게시판 상세 페이지
  {
    path:'/community/:chatId/chat_detail',
    name: 'BoardDetail',
    component: BoardDetail
  },
  {
    path:'/community/:reviewId/review_detail',
    name: 'ReviewDetail',
    component: ReviewDetail
  },
  // 1:1 건의
  {
    path: '/community/question/',
    name: 'QuestionList',
    component: QuestionList
  },
  // 프로필 (signup, login / logout, myprofile)
  {
    path: '/profile/:username/',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/profilebar/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profilebar/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
