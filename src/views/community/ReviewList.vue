<template>
  <div data-app>
    <h3 style="color:white"> 리뷰 게시판 </h3>
    <hr>
    <v-row>
      <v-col cols="auto">
      <v-btn tile outlined dark @click="reviewCreate">Create</v-btn>
      </v-col>
    </v-row>
    <hr style="color:white;">
    <v-row>
      <v-col cols="3" class="px-0 py-0">
      <span style="color:white;">Movie: </span>
      <v-select
        v-model="movie_select"
        color="black"
        solo background-color="black"
        :items="items"
        label="영화 선택"
        dense
        id="select"
      ><v-text-field hide-details></v-text-field></v-select>
      </v-col>
      <v-col cols="3" class="my-3 px-2">
        <input type="text" v-model="movie_select" @input="autoComplete">
        <div v-show="!isDisable">
          <div @click="searchAdd" style="cursor:pointer; color:white;" 
          v-for="(res,index) in keyword" :key="index"
          >{{res}}</div>
        </div>
      </v-col>
      <v-col cols="2" class="my-3">
       <v-btn x-small @click="class_dis"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-col>
    </v-row>
    <div v-if="reviewLists">
    <div v-if="movie_select">
    <review-list-item
    :reviewList="movieFilter"
    >
    </review-list-item>
    </div>
    
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script>

import ReviewListItem from './ReviewListItem.vue'
import {mapState} from 'vuex'
import _ from 'lodash'
const movieTitle = 'movieTitle'
export default {
  name:'Review',
  components:{
    ReviewListItem,
  },
  data:function(){
    return{
      movie_select : 'all',
      items : null,
      keyword : null,
      isDisable : false,
    }
  },
  methods:{
    reviewCreate:function(){
      this.$router.push({name:'ReviewCreate'})
    },
    autoComplete(event){
      this.movie_select = event.target.value
      if (this.movie_select){
        this.isDisable = false
        this.keyword = this.movieTitle.filter(title =>{
            return title.match(new RegExp("^" + this.movie_select, "i"))
          })
        } else {
          this.isDisable=true
        }},
    searchAdd:function(event){
      this.movie_select = event.target.innerHTML
      const autocomplete = document.querySelector('.autocomplete')
      this.isDisable = true
    },
    class_dis:function(){
      this.isDisable = true
    }
  },
  computed:{
    ...mapState([
      'reviewLists',
    ]),
    ...mapState(
      movieTitle,
      ['movieTitle',]
    ),
    movieFilter(){
      var filter = []
      this.reviewLists.forEach(review=>{
        const movieId = review['movie_id']-1
        if (this.movie_select === this.movieTitle[movieId]){
          filter.push(review)
        } else if (this.movie_select === 'all'){
          filter = this.reviewLists
          return
        }
      })
      return filter
    },
  },
  
  created: function(){
    this.items = _.cloneDeep(this.movieTitle)
    this.items.splice(0,0,'all')
    
  }
}
</script>

<style>

</style>