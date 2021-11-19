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
    boardNum : {'1': '자유', '2':'건의', '3':'영화 추천','4':'파티 모집'},

    movieList: null,
  },
  mutations: {
    CREATE_CHAT_LIST:function(state, chatlst){
      state.boardLists = chatlst
    },
    CREATE_REVIEW_LIST:function(state, reviewlst){
      state.reviewLists = reviewlst
    },


    LOAD_MOVIE_LIST: function(state, movielist){
      state.movieList = movielist
      console.log(movielist)
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



    loadMovieList: function({commit}) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/',
      })
      .then(res => {
        commit('LOAD_MOVIE_LIST', res.data)
      })
    }
    

    
  },




  modules: {
  }
})
