<template>
  <div class="container" style="color:white;" v-if="detail">
    <h1 class="d-flex">Title: {{detail.title}} </h1>
    <br>
      <div id="user">작성자 : {{detail.user}} 
          <v-btn id="edit">
            <v-icon left>mdi-pencil</v-icon> Edit
          </v-btn>
        </div>
        <br>
        <p>수정시각 : {{detail.updated_at | dateFormat}}</p>
      <content>
        <item style="float:left">내용 :  </item>
        <br>
        {{detail.content}}
      </content>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:"BoardDetail",
  data:function(){
    return{
      detail:null,
    }
  },
  filters:{
    dateFormat:function(value){
      if (value===""){
        return ''
      }
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
      
      return year + '-' + month+'-'+day+' '+hour+':'+minute;
    }
  },
  methods:{
    CreateChatDetail:function(chatId){
      chatId = this.$route.params.chatId
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${chatId}/chat_detail/`,

      })
      .then(res=>{
        this.detail = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
  },
  created: function(){
    this.CreateChatDetail()
  }

}
</script>

<style>
p {
  font-size: 13px;
  text-align: right;
}
#user{
  font-size: 15px;
  text-align: left;
}

#edit{
  float: right;
}

content{
  font-size: 15px;
  float:left;
}
</style>