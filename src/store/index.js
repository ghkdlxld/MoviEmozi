import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import createPersistedState from 'vuex-persistedstate'
import userStore from './userStore';


Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})


const store = new Vuex.Store({
  state: {
    boardLists : null,
    reviewLists : null,
    userNameList : [0,],
    boardNum : {'1': '자유', '2':'건의', '3':'영화 추천','4':'파티 모집'},
    isLogin : false,
    config : null,
    date : null,          // yyyy-mm-dd PM/AM yy:mm 형식 출력
    betweenDate : null,   // 몇분전, 방금전 등으로 출력
    movieList: null,
    shortments: null,
  },
  mutations: {
    CREATE_CHAT_LIST:function(state, chatlst){
      state.boardLists = chatlst
    },
    CREATE_REVIEW_LIST:function(state, reviewlst){
      state.reviewLists = reviewlst
    },
    CREATE_USER_NAME_LIST:function(state,list){
      list.forEach(user=>{
        state.userNameList.push(user.username)
      })
    },
    LOGOUT:function(state){
      state.config = null
      state.isLogin = false
      console.log(state.config)

    },
    LOGIN:function(state){
      state.isLogin = true
    },


    LOAD_MOVIE_LIST: function(state, movielist){
      state.movieList = movielist
      console.log(movielist)
    },
    GET_SHORT_MENT: function(state, shortments){
      state.shortments = shortments
    },
    ADD_SHORTMENT: function(state, shortment){
      state.shortments.push(shortment)
    },
    SET_TOKEN:function(state,config){
      state.config = config
    },
    DATE_FILTER: function(state, date){
      state.date = date
    },
    DATE_BETWEEN:function(state,date){
      state.betweenDate = date
    }



  },
  actions: {
    CreateChatBoard:function(context){
      axios({
        method:'get',
        url:'http://127.0.0.1:8000/community/chats_list/',
        headers: context.state.config
      })
      .then(res=>{
        context.commit('CREATE_CHAT_LIST',res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    CreateReviewBoard:function(context){
      axios({
        method:'get',
        url:'http://127.0.0.1:8000/community/reviews',
        headers: context.state.config
      })
      .then(res=>{
        context.commit('CREATE_REVIEW_LIST', res.data)
      })
    },
    CreateUserList:function(context){
      axios({
        method:'get',
        url:'http://127.0.0.1:8000/accounts/userlist',
        headers: context.state.config
      })
      .then(res=>{
        context.commit('CREATE_USER_NAME_LIST', res.data)
      })
    },
    Logout:function({commit}){
      localStorage.removeItem()
      commit('LOGOUT')
    },
    Login:function({commit}){
      commit('LOGIN')
    },
    setToken:function({commit}){
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization : `JWT ${token}`
      }
      commit('SET_TOKEN', config)
    },
    



    loadMovieList: function({commit}) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/',
      })
      .then(res => {
        commit('LOAD_MOVIE_LIST', res.data)
      })
    },
    getShortMent: function({commit}, movie_pk) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${movie_pk}/shortment_list/`,
      })
      .then(res =>{
        commit('GET_SHORT_MENT', res.data)
      })
      .catch(() => {
        console.log('아직 한줄평이 없습니다.')
      })
    },
    addShortment: function(context, data) {
      const movieId = data.id
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${movieId}/shortment/`,
        data: {content : data.content},
        headers: context.state.config, 
      })
      .then(res => {
        context.commit('ADD_SHORTMENT', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 게시글 작성시각을 yyyy-mm-dd AM yy:mm 형식으로 변환하여 출력
    dateFormat:function({commit},value){
      const date = new Date(value)
      const year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()

      hour = (hour>12) ? 'PM' +' '+(hour-12) : 'AM' +' '+hour
      month = (month<10) ? '0'+month : month
      day = (day<10) ? '0'+day : day
      minute = (minute<10)? '0'+minute : minute
      
      commit('DATE_FILTER',year + '-' + month+'-'+day+' '+hour+':'+minute)
    },

    // 댓글 작성시각 / 수정시각에 1일전, 2일전, 방금전 등으로 출력
    betweenDate:function({commit}, value){
      if (value===""){
        return ''
      }
      const date = new Date(value)
      const today = new Date()
      const takenTime = today - date
      const takenSecond = takenTime / 1000 
      const takenMinute = takenSecond / 60
      const takenHour = takenMinute / 60
      const takenDay = takenHour / 24
      const takenWeek = takenDay / 7

      if (takenSecond < 60) {commit('DATE_BETWEEN','방금전'); return;}
      if (takenMinute < 60) {commit('DATE_BETWEEN',`${Math.floor(takenMinute)}분 전`); return;} 
      if (takenHour < 24) {commit('DATE_BETWEEN',`${Math.floor(takenHour)}시간 전`); return;}
      if (takenDay < 7) {commit('DATE_BETWEEN',`${Math.floor(takenDay)}일 전`); return;}  
      if (takenWeek < 5) {commit('DATE_BETWEEN',`${Math.floor(takenWeek)}주 전`); return;} 
    },

  },

  modules: {
    userStore: userStore
  },
  plugins: [
    createPersistedState({
      paths: ['userStore'],
    })
  ]
})

export default store;