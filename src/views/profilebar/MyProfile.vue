<template>
  <div style="color:white;" class="container">
  
  <v-btn class="my-3">
  <v-icon large>mdi-account-circle</v-icon>
  </v-btn>
      <v-col align="center">
      <!-- <input type="file" @change="onInputImage()" ref="Image" class="image"> -->
      <button style="color: white;" @click="sendImage()">+++</button>
      <v-file-input v-model="files" name="files" label="Profile Image"></v-file-input>

      </v-col>
    <h1>{{username}}  
      <v-btn outlined @click="follow"><v-icon large style="color: silver;" >{{follow_btn}}</v-icon></v-btn>
      </h1>
    <hr>
    <div align="left">
    <v-icon large style="color: silver;" class="mb-3 mx-2">mdi-bookmark-multiple </v-icon> 
    <span style="font-size:20px;">찜한 영화 </span>
    </div>

    영화이름 슬라이더 

    <hr>

    <div align="left">
    <v-icon large style="color:silver;" class="mb-3 mx-2">mdi-thumb-up</v-icon>
    <span style="font-size:20px;">영화 추천</span>
    </div>
    <recommend></recommend>
    영화 찜목록 슬라이더

    <hr>

    <v-container>
      <v-row>
        <v-col cols="6" style="text-align:left; border-right:1px solid white;">
        <div align="left">
        <v-icon large style="color:silver;" class="mb-3 mx-2">mdi-pen</v-icon>
        <span style="font-size:20px;">POST</span>         
        </div>

          <div v-if="board">
            <div v-for="post in board" :key="post.id" class="container">
              <p @click="movePost(post.id)">[{{boardNum[post.board_num]}}] - {{post.title}} 
                <v-icon style="color:silver;margin-left:25px;">mdi-arrow-right</v-icon></p>
              <p style="font-size:13px;">마지막 수정 : {{post.updated_at | betweenDate}}</p>
              <hr>
            </div>
          </div>
          <div v-if="review">
            <div v-for="rev in review" :key="rev.id" class="container">
              <p @click="moveReview(rev.id)">[{{movieTitle[rev.movie_id-1]}}'s review] - {{rev.title}}
                <v-icon style="color:silver;margin-left:25px;">mdi-arrow-right</v-icon></p>
              <p style="font-size:13px;">마지막 수정 : {{rev.updated_at |betweenDate}}</p>
              <hr>
            </div>

          </div>

          <div v-if="!review && !board">
            <p>아직 작성한 글이 없습니다.</p>
          </div>
        </v-col>

        <v-col cols="6" style="text-align:left; padding-left:20px;">
        <div align="left">             
        <v-icon large style="color:silver;" class="mb-3 mx-2">mdi-forum</v-icon>
        <span style="font-size:20px;">Comment</span>
        </div>

          <div v-if="chat_comments">
            <div v-for="chat_comment in chat_comments" :key="chat_comment.id" 
            class="container">
              <p>[{{chat_comment.chatboard}}] - {{chat_comment.content}}</p>
              <p style="font-size:13px;">마지막 수정 : {{chat_comment.updated_at | betweenDate}}</p>
              <hr>
            </div>
          </div>

          <div v-if="review_comments">
            <div v-for="review_comment in review_comments" :key="review_comment.id" 
            class="container">
              <p>[{{review_comment.review}}] - {{review_comment.content}}</p>
              <p style="font-size:13px;">마지막 수정 : {{review_comment.updated_at | betweenDate}}</p>
            </div>
          </div>

          <div v-if="!chat_comments && !review_comments">
            <p>아직 작성한 댓글이 없습니다.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import Recommend from './Recommend.vue'

const movieTitle = 'movieTitle'
const userStore = 'userStore'

export default {
  name: 'MyProfile',
  components:{
    Recommend,
  },
  data:function(){
    return{
    username : this.$route.params.username,
    user_info : null,
    files:null,
    board : null,
    review : null,
    review_comments:null,
    chat_comments:null,
    isfollowed:null,
    followers : null,
    followings : null,
  }},
  computed:{
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
    follow_btn(){
      return this.isfollowed ? 'mdi-account-multiple-check' : 'mdi-account-multiple-plus'
    },
    ...mapState([
      'boardLists',
      'reviewLists',
      'boardNum',
      'userId_name',
    ]),
    ...mapState(
      movieTitle,
      ['movieTitle',]
    ),
  }
  ,
  methods:{
    follow:function(){
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/${this.user_info.id}/follow/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.isfollowed = res.data.followed
        this.followers = res.data.followers
        this.followings = res.data.followings

      })
      .catch(err=>{
        if (err.response.status === 406){
          alert(err.response.data.error)
        }
      })
    },
    movePost:function(id){
      this.$router.push({name:'BoardDetail', params: {chatId:id}})
    },
    moveReview:function(id){
      this.$router.push({name:'ReviewDetail', params: {reviewId:id}})
    },
    
    sendImage(){
      let info = new FormData()
      info.append('files',this.files)
      if (this.files === ''){
        info.append('files',[])
      } else {
        for (let i=0; i < this.files.length; i++){
          info.append('files',this.files[i])
        }
      }
      console.log(info)
      const token = localStorage.getItem('jwt')
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/upload/`,
        data : info,
        headers:{'Content-Type': 'multipart/form-data','Authorization' : `JWT ${token}`}
      })
      .then(res=>{
        console.log('아무거나')
        console.log(res)
      })
    },


    // react eventHandler part
    // foo = (e) => {
    // const formData = new FormData();
    // formData.append('file', e.target.files[0]);
    
    // this.props.bar(formData);
    // } 

  // Redux action part. Axios sends image to backend
  //   export const bar = (image) => {

  //   return dispatch => {
  //     return axios.post('/image/', image)
  //       .then(res => {
  //         dispatch(bar_(res.data));
  //     })
  //   }
  // },





  
    import_review_comment:function(){
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${this.user_info.id}/comment_list_review/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.review_comments = res.data
      })
    },
  },
  created:function(){
    this.$store.dispatch('CreateUserList')
    axios({
      method:'get',
      url:`http://127.0.0.1:8000/accounts/${this.username}/`,
      headers: this.$store.state.config
    })
    .then(res=>{
      this.user_info = res.data[0]
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${this.user_info.id}/comment_list_chat/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.chat_comments = res.data
      })
      this.import_review_comment()
      this.$store.dispatch('CreateChatBoard')
      this.$store.dispatch('CreateReviewBoard')
      if (this.boardLists){
      var post = this.boardLists.filter(post=>{
        return post.user === this.user_info.id
      })
      this.board = post
      }
      if (this.reviewLists){
      var rev = this.reviewLists.filter(rev=>{
        return rev.user === this.user_info.id
      })
      this.review = rev
      }
    })
    

  },
  filters:{
    betweenDate:function(value){
      if (value===""){
        return ''
      }
      const date = new Date(value)
      const today = new Date()
      const takenTime = today - date
      const takenSecond = takenTime / 1000 
      const takenMinute = takenSecond / 60
      const takenHour = takenMinute / 60
      const takenDay = takenHour / 24
      const takenWeek = takenDay / 7

      if (takenSecond < 60) {return '방금전'}
      if (takenMinute < 60) {return `${Math.floor(takenMinute)}분 전`} 
      if (takenHour < 24) {return `${Math.floor(takenHour)}시간 전`}
      if (takenDay < 7) {return `${Math.floor(takenDay)}일 전`}  
      if (takenWeek < 5) {return `${Math.floor(takenWeek)}주 전`} 
    },
  }

}
</script>

<style>
.v-file-input{
  margin-bottom: 10px;
  padding-top: 5px;
  padding-right: 10px;
  background-color: rgb(135, 161, 89);
  width:310px;
  height: 45px;
}
</style>