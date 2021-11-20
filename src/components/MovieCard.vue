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
          @click="[getVideo(), getShortMent()]">
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
        <div class="modal-content container bg-dark" style="width:2000px; height:900px;">
          <div class="modal-header">
            <h3 class="modal-title fw-bold text-white" id="exampleModalLabel">영화 상세정보</h3>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- body -->
          <div class="modal-body container">
            <div class="d-flex justify-content-between">
              <h3 class="text-start">{{ movieCard.title }}</h3>
              <div class="mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>
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
              <div class="fs-6 mb-5 text-start" style="width:1120px;">{{movieCard.overview}}</div>
            </div>
            <h4 class="text-start mt-4">한줄평</h4>
            <hr>
            <div 
            v-for="shortment in shortments"
            :key="shortment.id"
            class="d-flex flex-column container border border-secondary border-1 rounded-3 mb-3">
            <div class="fs-5 text-start">{{ shortment.content }}</div>
            <div class="d-flex">
              <div>{{ shortment.user }}</div>
              <div class="mx-4">{{ shortment.created_at}}</div>
            </div>
            </div>
          </div>

          <!-- footer -->
          <div class="modal-footer">
            <div class="d-flex justify-content-start">
              <div v-if="isLogin">
                <textarea 
                class="form-control"
                style="width: 600px;" 
                v-model="shortmentInput"></textarea>
                <button @click="addShortment" class="btn btn-outline-secondary">+</button>
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

export default {
  name: 'MovieCard',
  props: {
    movieCard: Object,
  },
  data: function () {
    return {
      Detail: false,
      star: 0,
      videoUrl: null,
      shortmentInput: null,
      isLogin: false,
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
    addShortment: function() {
      const data = {
        content: this.shortmentInput,
        id: this.movieCard.id
      }
      this.$store.dispatch('addShortment', data)
      this.getShortMent()
      this.shortmentInput = null
    }
  },
  computed:{
    ...mapState([
    'shortments',
  ]),
  imageUrl: function(){
    const imagePath = this.movieCard['poster_path']
    return `https://image.tmdb.org/t/p/original${imagePath}`
    }
  },
  created: function() {
    if (localStorage.getItem('jwt')){
      this.isLogin = true
      this.$store.dispatch('setToken')
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
</style>