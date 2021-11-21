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

    <div v-if="!isUpdated">
    <div align='left'>
    <span style="font-size:30px">Title: {{detail.title}} </span>
      <v-btn id="edit" @click="isUpdated=true">
        <v-icon left>mdi-pencil</v-icon><b> Edit</b>
      </v-btn>
      <p class="my-0">등록시각 : {{created}}</p>
      <p>수정시각 : {{updated}}</p>
      <div id="user">작성자 : {{detail.user}} </div>
    </div>
    <br>
      <div class="my-3" align='left'>
        <div id="content">내용 :  </div>
        {{detail.content}}
      </div>
      <br>
      <div align="right"> 
      <v-btn id="delete" class="my-2 ma-2" @click="Delete">
        <v-icon left> mdi-delete</v-icon> <b>Delete</b>
      </v-btn>
      </div>
      </div>

      <div v-else align="left">
        <form>
        <div style="font-size:30px">
        Title: <input type="text" id="updated_title" v-model="detail.title">
        <v-btn @click="editcancel" id="update_cancel" small>
          <v-icon left> mdi-format-color-marker-cancel </v-icon> <b>Cancel</b></v-btn>
        </div>
        <br>
        <p v-if="isNull_title" id="null">제목을 입력해주세요!!</p>
        <br>
        <div id="user">작성자 : {{detail.user}} </div>
        <br>
        내용 : <v-btn type="reset" style="background:white; float:right;" x-small @click="clear"><v-icon>mdi-cached</v-icon>Clear</v-btn>
        <v-textarea
          type="text"
          auto-grow
          filled
          id="updated_detail"
          v-model="detail.content"
          >
          </v-textarea>
        <p v-if="isNull_content" id="null">내용을 입력해주세요!!</p>
      <v-btn id="updated_edit" @click="update">
        <v-icon left>mdi-pencil</v-icon><b> Save</b>
      </v-btn>
      </form>
      <br><br>
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
      updated : null,
      created : null,
      isUser : false,
      isUpdated : false,
      updated_title : null,
      title : null,
      content : null,
      chatId : null,
      isNull_title : false,
      isNull_content : false,
    }
  },
  methods:{
    Delete:function(chatId){
      chatId = this.chatId
      axios({
        method:'delete',
        url:`http://127.0.0.1:8000/community/${chatId}/chat_detail/`,
        headers:this.$store.state.config
      })
      .then(()=>{
        this.CreateChatDetail()
      })
    },
    update:function(chatId){
      chatId = this.chatId
      const edit_title = this.detail.title
      const edit_content = this.detail.content
      if (edit_content.trim() && edit_title.trim()){
        this.isUpdated = false
        axios({
          method:'put',
          url:`http://127.0.0.1:8000/community/${chatId}/chat_detail/`,
          data:{title:edit_title, content:edit_content, board_num:this.detail.board_num},
          headers : this.$store.state.config
        })
        .then(()=>{
          this.CreateChatDetail()
        })
      } else if (edit_title.trim()){
        this.isNull_content = true
        this.isNull_title = false
      } else if (edit_content.trim()){
        this.isNull_title = true
        this.isNull_content = false
      } else {
        this.isNull_content = true
        this.isNull_title = true
      }
    },
    editcancel:function(){
      this.isUpdated = false
      this.detail.title = this.title
      this.detail.content = this.content
    },
    clear:function(){
      this.detail.content = '';
      this.detail.title = '';
    },
    CreateChatDetail:function(chatId){
      chatId = this.$route.params.chatId
      this.chatId = chatId
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${chatId}/chat_detail/`,
        headers:this.$store.state.config
      })
      .then(res=>{
        this.detail = res.data
        this.title = res.data.title
        this.content = res.data.content
        
        this.$store.dispatch('dateFormat',this.detail.updated_at)
        this.updated = this.$store.state.date

        this.$store.dispatch('dateFormat', this.detail.created_at)
        this.created = this.$store.state.date
      })
      .catch(err=>{
        if (err.response.status === 401){
          console.log(err)
        }
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
  },
  updated:function(){
    this.$store.dispatch('CreateUserList')
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

#clear{
  background-color: #558B2F;
}

#null{
  text-align: left;
  color : red;
  font-weight: bold;
  margin-bottom: 0px;
}

#edit{
  float: right;
  background-color: #558B2F;
}
#update_cancel{
  float:right;
  background-color: #E53935;
}

#updated_edit{
  background-color: #558B2F;
  float : right;
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

#updated_detail{
  background-color:white;
} 
</style>