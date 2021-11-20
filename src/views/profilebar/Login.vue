<template>
  <div style="color:white;">
    <h1>Login</h1>
    <div>
      <label for="username">UserName:  </label>
      <input type="text" id="username" v-model="user.username">
    </div>
    <br>
    <div>
      <label for="password">password:   </label>
      <input type="text" id="password" v-model="user.password"
      @keyup.enter="Login">
    </div>
    <br>
    <button @click="Login">Login</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',

  data:function(){
    return{
      user:{
        username:null,
        password : null,
      }
    }
  },
  methods:{
    Login : function(){
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/api-token-auth/`,
        data: this.user
      })
      .then((res) =>{
        localStorage.setItem('jwt', res.data.token)
        this.$emit('login')
        this.$store.dispatch('setToken')
        this.$store.dispatch('getLoginUser', this.user.username)
        this.$store.dispatch('Login')
        this.$router.push({name:'Home'})
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>