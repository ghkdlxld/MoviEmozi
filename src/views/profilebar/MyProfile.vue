<template>
  <div style="color:white;" class="container">
  
  <v-btn class="my-3">
  <v-icon large>mdi-account-circle</v-icon>
  </v-btn>

    <h1>{{username}}'s Profile</h1>
    <hr>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyProfile',
  data:function(){
    return{
    username : this.$route.params.username,
    user_info : null,
  }},
  computed:{
  }
  ,
  created:function(){
    axios({
      method:'get',
      url:`http://127.0.0.1:8000/accounts/${this.username}/`,
      headers: this.$store.state.config
    })
    .then(res=>{
      this.user_info = res.data[0]
    })
  }

}
</script>

<style>

</style>