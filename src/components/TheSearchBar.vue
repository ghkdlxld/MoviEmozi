<template>
<div>

  <div class="d-flex justify-content-center">
    <div cols="3" class="my-3 px-2">
      
    </div>
    <button small @click="class_dis"
    class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" 
    aria-controls="offcanvasNavbar">
      <v-icon style="color: white;">mdi-magnify</v-icon></button>
    <div v-if="movieSelect">
    </div>


    <!-- search bar hamberger-->
    <nav>
      <div class="container-fluid">
        <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title text-light" id="offcanvasNavbarLabel">Search Movie</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <form >
              <div>
                <div class="d-flex">
                  <input type="text" @input="autoComplete" class="form-control me-2" placeholder="Search" aria-label="Search">
                  <button class="btn btn-success" type="submit">Search</button>
                </div>

                <div v-show="!isDisable" class="list-group list-group-flush">
                  <div
                  style="cursor:pointer; color:dark;" 
                  class="list-group-item list-group-item-action bg-dark text-secondary"
                  v-for="(movie, index) in keyword" 
                  :key="`key-${index}`"
                  >
                    <div 
                    class="d-flex flex-column align-items-center fs-5 fw-bold p-3 rounded rounded-3">
                      <div class="my-2">{{movie}}</div>
                        <img @click="searchMovie(movie)" 
                        :src="searchImgUrl(movie)" alt="" id="searchdark" 
                        class="rounded rounded-3" style="height:270px; width:190px;">
                    </div>
                  </div>
                </div>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </nav>
  </div>
  

</div>
  
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

const movieTitle = 'movieTitle'

export default {
  name: 'TheSearchBar',
  props: {
    movieAll: Array,
  },
  data: function() {
    return {
      movieSelect : 'all',
      keyword: null,
      items: null,
      isDisable: false,

      searchThisMovie: null,
    }
  },
  methods: {
    autoComplete: function (event) {
      this.movieSelect = event.target.value
      if(this.movieSelect) {
        this.isDisable = false
        this.keyword = this.items.filter(title => {
          return title.includes(this.movieSelect)
        })
      } else {
        this.isDisable = true
      }
    },
    searchMovie: function(select) {
      for (let movie of this.movieAll) {
        if(movie.title === select) {
          this.searchThisMovie = movie
          this.$emit('search-movie', this.searchThisMovie)
        }
      }
      

    },
    class_dis:function(){
      this.isDisable = true
    },

    searchImgUrl: function (item) {
      var imgsrc = null
      for (let movie of this.movieAll) {
        if (movie.title === item) {
          imgsrc = `https://image.tmdb.org/t/p/original${movie['poster_path']}`
        }
      }
      return imgsrc
    }
  },
  computed: {
    ...mapState(
      movieTitle,
      ['movieTitle',]
    ),
  },

  created: function() {
    this.items = _.cloneDeep(this.movieTitle)
    this.items.splice(0,0,'all') 
  }
}
</script>

<style>
#searchdark{
  box-shadow: 0px 0px 17px 6px black;
}
</style>