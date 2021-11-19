<template>
  <div style="color:white;">
    <h1>Signup</h1>
    <div>
      <label for="username">UserName:  </label>
      <input type="text" id="username" v-model="user.username">
    </div>
    <br>
    <div>
      <label for="password">password:   </label>
      <input type="text" id="password" v-model="user.password">
    </div>
    <br>
    <div> 
      <label for="passwordConfirm"> passwordConfirm:   </label>
      <input type="text" id="passwordConfirm" v-model="user.passwordConfirm"
      @keyup.enter="signup"
      >
    </div>
    <br>
    <button @click="signup">Sign Up</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',

  data:function(){
    return{
      user:{
        username:null,
        password : null,
        passwordConfirm : null,
      }
    }
  },
  methods:{
    signup : function(){
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/signup/`,
        data: this.user
      })
      .then(() =>{
        this.$router.push({name:'Login'})
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