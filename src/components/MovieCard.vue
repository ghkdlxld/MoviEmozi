<template>
  <div>
    <!-- movieCard -->
    <div class="d-flex justify-content-center">
      <div class="card bg-dark text-white" style="width: 13rem; height: 310px;">
        <img :src="imageUrl" class="card-img-top" alt="image" style="width: 13rem; height: 310px;">
        <div 
        @mouseover="Detail=true" 
        @mouseout="Detail=false"
        class="card-img-overlay p-0"
        >
          <button 
          v-show="Detail"
          class="card bg-dark m-0 p-2" 
          style="border-box; width: 13rem; height: 310px; opacity: 0.7;"
          data-bs-toggle="modal" :data-bs-target="`#exampleModal-${movieCard.id}`"
          @click="[getVideo(), getShortMent(), getStarAvg()]">
            <p class="card-title">{{movieCard.title}}</p>
            <p class="card-text">{{movieCard.popularity}} | {{movieCard.runtime}} 분</p>
            <p class="card-text">{{movieCard.genres}}</p>
          </button>
        </div>
      </div>
    </div>


    <!-- modal -->
    <!-- header -->
    <div class="modal fade" :id="`exampleModal-${movieCard.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content container bg-dark" style="width:1000px; height:900px;">
          <div class="modal-header">
            <h3 class="modal-title fw-bold text-white" id="exampleModalLabel">영화 상세정보</h3>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- body -->
          <div class="modal-body container">
            <div class="d-flex justify-content-between">
              <h3 class="text-start">{{ movieCard.title }}</h3>
              <div class="mx-4 d-flex">
                <div class="fs-2 mx-1">{{ averageRank }}</div><div style="color: grey;" class="mt-4"> / 5</div>
                <v-icon x-large style="color: goldenrod;">mdi-star</v-icon><div class="fw-light mx-2 mb-1" style="font-size: 35px;">|</div>

              </div>
            </div>
            <header class="text-start d-flex justify-content-between">
              <div>
                <span>popularity {{ movieCard.popularity}}</span>
                <span class="mx-3">{{ movieCard.release_date}} 개봉 </span>
              </div>
            </header>
            <br>
            <div class="d-flex flex-column justify-content-center">
              <iframe id="ytplayer" type="text/html" width="720" height="360" :src="videoUrl" frameborder="0"></iframe>
              <h4 class="text-start mt-4">줄거리</h4>
              <hr>
              <div class="fs-6 mb-5 text-start" style="width:900px;">{{movieCard.overview}}</div>
            </div>
            <h4 class="text-start mt-4">한줄평</h4>
            <hr>

            <div 
            v-for="shortment in shortments"
            :key="shortment.id"
            class="d-flex flex-column container border border-secondary border-1 rounded-3 mb-3"
            style="width:900px;">

              
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <div class="mx-1">{{ userNameList[shortment.user] || shortment.user}}</div>
                  <!-- user가 준 별점 갯수 -->
                  <div class="mx-2">
                    <span v-for="(Info, i) in movieRankInfo" :key="i">
                      <span v-if="Object.keys(Info)[0] === userNameList[shortment.user]">
                        <span v-for="(n,i) in Info[userNameList[shortment.user]]" :key="i+'l'">
                          <v-icon small style="color: goldenrod;">mdi-star</v-icon>
                        </span>
                        <span v-for="(n, i) in (5-Info[userNameList[shortment.user]])" :key="i+'r'">
                          <v-icon small style="color: goldenrod;">mdi-star-outline</v-icon>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>

                
                <div class="mx-3">
                  <button  @click="modifyShortment(shortment.id, shortment.user)" class="mx-2">
                    <v-icon small style="color: silver;">mdi-pencil</v-icon>
                  </button>
                  <button @click="[deleteShortment(shortment.id, shortment.user), deleteStar(shortment.user)]">
                    <v-icon small style="color: silver;">mdi-trash-can</v-icon>
                  </button>
                </div>
              </div>

              <!-- 한줄평 수정 -->
              <div v-if="shortment.id === isUpdate[0] && isUpdate[1]===true"
              class="d-flex justify-content-between">
                <textarea type="text" 
                :value="shortment.content"
                id="editvalue"
                class="fs-5 text-start border border-1 rounded"
                style="color: silver; width:600px;"></textarea>
                <div class="d-flex flex-column">
                  <div class="mx-4 text-end">작성 {{ shortment.created_at}}</div>
                  <div class="mx-4 text-end">수정 {{ shortment.updated_at}}</div>
                </div>
              </div>

              <div v-else class="d-flex justify-content-between item-align-center">
                <div class="fs-5 text-start">{{ shortment.content }}</div>
                <div class="d-flex flex-column">
                  <div class="mx-4 text-end">작성 {{ shortment.created_at}}</div>
                  <div class="mx-4 text-end">수정 {{ shortment.updated_at}}</div>
                </div>
              </div>
            </div>
          </div>


          <!-- footer -->
          <div class="modal-footer">
            <div class="d-flex">

              <div v-if="isLogin" class="d-flex flex-column align-items-start">
                <!-- 별점 주기 -->
                <div>
                  <span v-for="(star, i) in stars" :key="i">
                    <button @click="toggleStar(i)">
                      <div v-if="stars[i]">
                        <v-icon style="color: goldenrod; width: 20px;" class="mx-1">mdi-star</v-icon></div>
                      <div v-else>
                        <v-icon small style="color: goldenrod;" class="mx-1">mdi-star-outline</v-icon></div>
                    </button>
                  </span>
                </div>

                <!-- 한줄평 입력 -->
                <div class="d-flex mt-2">
                  <textarea 
                  class="form-control"
                  style="width: 600px; height: 60px;" 
                  v-model="shortmentInput"></textarea>


                  <button @click="[addShortment(), addRank()]" 
                  class="btn btn-outline-secondary mx-3 mt-1" style="height: 50px;">+</button>
                </div>
              </div>

              <div v-else class="d-flex justify-content-start">
                <textarea disabled style="width: 600px;" class="form-control" placeholder="required login"></textarea>
                <button class="btn btn-outline-secondary">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

const userStore = 'userStore'


export default {
  name: 'MovieCard',
  props: {
    movieCard: Object,
  },
  data: function () {
    return {
      Detail: false,
      stars: [false, false, false, false, false],
      videoUrl: null,
      shortmentInput: null,
      isLogin: false,
      isUpdate: [0, false],
      movieRankInfo: [],
      averageRank: 0,
    }
  },
  methods:{
    getVideo: function(){
      const videoPath = this.movieCard['video_id']
      this.videoUrl = `https://www.youtube.com/embed/${videoPath}`
    },
    getShortMent: function() {
      this.$store.dispatch('getShortMent', this.movieCard.id)
    },


    alreadyGiveRank: function() {
      let giveStar = false
      for (let Info of this.movieRankInfo){
        for(let i in Info){
          if(this.LoginUser === i){
            giveStar = true
            return giveStar
          }
        }
      }
      return giveStar
    },


    addShortment: function() {
      const giveStar = this.alreadyGiveRank()
      console.log(giveStar)

      if (!giveStar) {
        const data = {
          content: this.shortmentInput,
          id: this.movieCard.id,
        }
        this.$store.dispatch('addShortment', data)
        this.getShortMent()
        this.getStarAvg()
        this.shortmentInput = null
      } else{
        alert(`${this.LoginUser}님은 이미 감상평을 등록하셨습니다`)
        this.shortmentInput = ''
        this.stars = [false, false, false, false, false]
      }
    },

    deleteShortment: function(shortmentId, author) {
      if (this.LoginUser === (this.userNameList[author]) || this.LoginUser === author){
        axios({
          method: 'delete',
          url: `http://127.0.0.1:8000/movies/shortments/${shortmentId}/`,
          headers: this.config
        })
        .then(() => {
          this.getShortMent()
          })
        } else {
        alert('삭제 권한이 없습니다!')
      }
    },

    modifyShortment: function(shortmentId, author){
      if (this.LoginUser === (this.userNameList[author]) || this.LoginUser === author) {
        if (this.isUpdate[1] === false) {
          this.wantUpdate(shortmentId)
        } else {
          this.updateShortment(shortmentId)
          this.wantUpdate(shortmentId)
        }
      } else {
        alert('수정 권한이 없습니다!')
      }
    },


    wantUpdate: function(shortmentId){
      this.isUpdate = [shortmentId, !this.isUpdate[1]]
    },

    updateShortment: function(shortmentId) {
      const editValue = document.getElementById('editvalue').value
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/movies/shortments/${shortmentId}/`,
        data: {content: editValue},
        headers: this.$store.state.config
      })
      .then(res=> {
        this.$store.dispatch('betweenDate', res.data.updated_at)
        res.data.updated_at = this.$store.state.betweenDate
        this.getShortMent()
      })
    },
      

    toggleStar: function(index) {
      let starsState = Array(5).fill(false)
      if (index > 0) {
        for (let i=0; i <= index; i++) {
          starsState[i] = true
        }
      } 
      else if (this.stars[0] == true && this.stars[1] == false) {
        starsState.fill(false)
      } 
      else {
        for (let i=0; i <= index; i++) {
          starsState[i] = true
        }
      }
      this.stars = starsState
    },

    getStarAvg: function() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.movieCard.id}/rank/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        const ans = []
        for (let Info of res.data) {
          const InfoObj = {}
          InfoObj[Info['user']] = Info['rank']
          ans.push(InfoObj)
        }
        this.movieRankInfo = ans
        console.log(this.movieRankInfo)


        let total = 0
        let personNum = this.movieRankInfo.length
        for (let Info of this.movieRankInfo){
          for(let i in Info){
            total += Info[i]
          }
        }
        this.averageRank = (total/personNum).toFixed(1)
        if (isNaN(this.averageRank)) {
          this.averageRank = 0
        }
        this.getShortMent()
      })
    },





    addRank: function() {
      let countStar = 0
      for (let i=0; i<5; i++){
        if (this.stars[i] === true) {
          countStar ++
        }
      }
      const giveStar = this.alreadyGiveRank()
      if (!giveStar) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/movies/${this.movieCard.id}/rank/`,
          data: { rank: countStar },
          headers: this.$store.state.config
        })
        .then(() => {
          this.stars = Array(5).fill(false)
          this.getShortMent()
        })
      } else {
        alert('평점을 바꾸길 원하신다면 상단의 "평점 수정하기"를 눌러주세요')
      }
    },

    deleteStar: function (author) {
      const rank
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/movies/${}/rank_update/?rank=1`
        // rank_pk말고 userpk가 편할듯
      })
    }
  },

  computed:{
    ...mapState([
    'shortments',
    'config',
    'userNameList',
    ]),
    ...mapState(userStore,['LoginUser']),
    
    imageUrl: function(){
      const imagePath = this.movieCard['poster_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },
  },

  created: function() {
    if (localStorage.getItem('jwt')){
      this.isLogin = true
      this.$store.dispatch('setToken')
      this.$store.dispatch('Login')
    }
  }
}
</script>

<style>
  * {
      box-sizing:border-box;
  }
  .modal {
    color: rgb(184, 184, 184);
  }

  .modal-footer {
    justify-content: center;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 2px rgb(153, 153, 153);
      border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color:rgb(204, 204, 204);
      -webkit-box-shadow: inset 0 0 1px rgba(90,90,90,0.7);
  }
</style>