<template>
  <div class="d-flex justify-content-center">
    <div class="card bg-dark text-white" style="width: 13rem; height: 310px;">
      <img :src="imageUrl" class="card-img-top" alt="image" style="width: 13rem; height: 310px;">
      <div 
      @mouseover="Detail=true" 
      @mouseout="Detail=false"
      class="card-img-overlay p-0"
      >
        <div 
        v-show="Detail" 
        class="card bg-dark m-0 p-2" 
        style="border-box; width: 13rem; height: 310px; opacity: 0.7;">
          <p class="card-title">{{movieCard.title}}</p>
          <p class="card-text">{{movieCard.popularity}} | {{movieCard.runtime}} 분</p>
          <p class="card-text">{{movieCard.genres}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movieCard: Object,
  },
  data: function () {
    return {
      Detail: false
    }
  },
  methods:{
  },
  computed:{
  imageUrl: function(){
    const imagePath = this.movieCard['poster_path']
    return `https://image.tmdb.org/t/p/original${imagePath}`
  }},
}
</script>

<style>
  * {
      box-sizing:border-box;
  }
</style>