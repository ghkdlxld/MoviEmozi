const state = {
  LoginUser: null,
 }
 
 
 const mutations = {
  GET_LOGIN_USER: function(state, username) {
    state.LoginUser = username
  },
  REMOVE_LOGIN_USER: function(state) {
    state.LoginUser = null
  }
 }
 
 const actions = {
  getLoginUser: function({commit}, username) {
    console.log(username)
    commit('GET_LOGIN_USER', username)
  },
  removeLoginUser: function({commit}) {
    commit('REMOVE_LOGIN_USER')
  }
 }
 
 export default {
  namespaced: true,

  state: {
    ...state
  },
  mutations,
  actions
 }