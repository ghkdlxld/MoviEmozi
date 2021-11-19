import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Community from '@/views/community/Community.vue'
import QuestionList from '@/views/community/QuestionList.vue'
import Signup from '@/views/profilebar/Signup.vue'
import Login from '@/views/profilebar/Login.vue'
import MyProfile from '@/views/profilebar/MyProfile.vue'
import Logout from '@/views/profilebar/Logout.vue'
import BoardDetail from '@/views/community/BoardDetail.vue'
import ReviewDetail from '@/views/community/ReviewDetail.vue'

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
  // 게시판 상세 페이지
  {
    path:'/community/:chatId/detail',
    name: 'BoardDetail',
    component: BoardDetail
  },
  {
    path:'/community/:reviewId/detail',
    name: 'ReviewDetail',
    component: ReviewDetail
  },
  // 1:1 건의
  {
    path: '/community/question/',
    name: 'QuestionList',
    component: QuestionList
  },
  // // 프로필 (signup, login / logout, myprofile)
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile
  // },
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
  {
    path: '/profilebar/myprofile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/profilebar/logout',
    name: 'Logout',
    component: Logout
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
