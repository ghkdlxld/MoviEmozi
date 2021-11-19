<template>
  <div class="container" style="color:white;" v-if="detail">
    <div align="left">
      <v-btn id="back" @click="moveToList">
          <v-icon left>
            mdi-arrow-left
          </v-icon>목록
        </v-btn>
    </div>
    <hr>
    <div align='left'>
    <span style="font-size:30px">Title: {{detail.title}} </span>
      <v-btn id="edit">
        <v-icon left>mdi-pencil</v-icon><b> Edit</b>
      </v-btn>
      <p class="my-0">등록시각 : {{detail.created_at | dateFormat}}</p>
      <p>수정시각 : {{detail.updated_at | dateFormat}}</p>
      <div id="user">작성자 : {{detail.user}} </div>
    </div>
    <br>
      <div class="my-3" align='left'>
        <div id="content">내용 :  </div>
        {{detail.content}}
      </div>
      <br>
      <div align="right"> 
      <v-btn id="delete" class="my-2 ma-2">
        <v-icon left> mdi-delete</v-icon> <b>Delete</b>
      </v-btn>
      </div>
      <hr>
      <div>
      <board-detail-comment :board_pk="detail.id"></board-detail-comment>
      </div>
      
  </div>
</template>

<script>
import BoardDetailComment from './BoardDetailComment.vue'
import axios from 'axios'
export default {
  name:"BoardDetail",
  components:{
    BoardDetailComment
  },
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
    },
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
    moveToList:function(){
      if (this.detail.board_num === "2" ){
        this.$router.push({name:"Community", query:{board:'question'}})
        } else{
        this.$router.push({name:"Community", query:{board:'chat'}})
      }
      
    }
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
  background-color: #558B2F;
}

#delete{
  background-color:#E53935;
  color:black;
}

#back{
  background-color: violet;
  color:black
}

#content{
  font-size: 15px;
}
</style>