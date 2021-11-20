<template>
  <div>
    <div align="left">
    <h3>Comment</h3>
      <div v-if="loginRequest" style="color:red">로그인하시면 댓글 작성이 가능합니다!! </div>
    <span style="margin: 4px 30px 0 10px;">
      <input type="text" style="width:85%; height:60px" @keyup.enter="createComment"
      v-model="value"
      >
    <v-btn class="mx-2" fab dark id="create" @click="createComment">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </span>
    <br>
    <hr>
    <div
    v-for="comment in comment_list"
    :key="comment.id"
    >
    <p style="text-align:left;">작성자: {{userNameList[comment.user]}}</p>
    <span style="font-size:20px">{{comment.content}}</span>
      <span id="time">
        등록 : {{comment.created_at|dateFormat}} <br>
        수정 : {{comment.updated_at|dateFormat}}
      </span>
    <br>
    <hr>
    </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
  name:"BoardDetailComment",
  props:{
    board_pk:Number
  },
  data:function(){
    return{
      comment_list:null,
      value:null,
      loginRequest:false,
    }
  },
  computed:{
    ...mapState([
      'userNameList',
    ])
  },
  methods:{
    createComment:function(){
      var data = {content: this.value}
      const boardId = this.board_pk
      axios.post(`http://127.0.0.1:8000/community/${boardId}/chat_comments/`, data, {headers: this.$store.state.config},
      {xsrfCookieName: 'csrftoken', xsrfHeaderName: 'X-CSRFToken'})
      .then(res=>{
        console.log(res)
        this.loginRequest = false
      })
      .catch(err=>{
        if(err.response){
          if (err.response.status === 401){
            this.loginRequest = true
            this.value = ''
          }
        }

      })
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
  created:function(){
    const boardId = this.board_pk
    axios({
      method:'get',
      url:`http://127.0.0.1:8000/community/${boardId}/chat_comments/`
    })
    .then(res=>{
      this.comment_list = res.data
    })
    .catch(err=>{
      console.log(err)
    })
  }


}
</script>

<style>
input{
  color:white;
  border: 1px solid white;
  
}
#create{
  width: 30px;
  height: 30px;
}

#time{
  font-size:12px;
  float:right;
}

</style>