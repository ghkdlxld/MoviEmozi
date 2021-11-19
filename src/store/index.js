import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boardLists : null,
    reviewLists : null,
    boardNum : {'1': '자유', '2':'건의', '3':'영화 추천','4':'파티 모집'}
  },
  mutations: {
    CREATE_CHAT_LIST:function(state, chatlst){
      state.boardLists = chatlst
    },
    CREATE_REVIEW_LIST:function(state, reviewlst){
      state.reviewLists = reviewlst
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
    }
  },
  modules: {
  }
})
