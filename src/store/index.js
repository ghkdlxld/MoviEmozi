import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

export default new Vuex.Store({
  state: {
    boardLists : null,
    reviewLists : null,
    userNameList : [0,],
    boardNum : {'1': '자유', '2':'건의', '3':'영화 추천','4':'파티 모집'},
    isLogin : false,

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
    LOGIN:function(state){
      state.isLogin = true
    },
    LOGOUT:function(state){
      state.isLogin = false
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
      console.log(shortment)
    }



  },
  actions: {
    CreateChatBoard:function({commit}){
      axios({
        method:'get',
        url:'http://127.0.0.1:8000/community/chats/',
      })
      .then(res=>{
        commit('CREATE_CHAT_LIST',res.data)
      })
    },
    CreateReviewBoard:function({commit}){
      axios({
        method:'get',
        url:'http://127.0.0.1:8000/community/reviews',
      })
      .then(res=>{
        commit('CREATE_REVIEW_LIST', res.data)
      })
    },
    CreateUserList:function({commit}){
      axios({
        method:'get',
        url:'http://127.0.0.1:8000/accounts/userlist',
      })
      .then(res=>{
        commit('CREATE_USER_NAME_LIST', res.data)
      })
    },
    Login:function({commit}){
      commit('LOGIN')
    },
    Logout:function({commit}){
      commit('LOGOUT')
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
        url: `http://127.0.0.1:8000/movies/${movie_pk}/shortment/`,
      })
      .then(res =>{
        commit('GET_SHORT_MENT', res.data)
      })
      .catch(() => {
        console.log('아직 한줄평이 없습니다.')
      })
    },
    addShortment: function({commit}, movie_pk, shortment) {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${movie_pk}/shortment/`,
        data: shortment
      })
      .then(res => {
        commit('ADD_SHORTMENT', res.data)
      })
    }

    

    
  },




  modules: {
  }
})
