<template>
  <div>
    <div class="d-flex justify-content-center" >
          <div @click="stop" class="card bg-dark text-white" style="width: 500px; height: 310px;">
            <img :src="imageUrl" class="card-img-top rounded rounded-3" alt="image" style="height: 310px; width:500px;">
            <div 
            @mouseover="Detail=true" 
            @mouseout="Detail=false"
            class="card-img-overlay p-0"
            >
              <button 
              v-show="Detail"
              class="search-this-movie card bg-dark" 
              style="border-box; width: 500px; height: 310px; opacity: 0.7;"
              
              >
                <div class="container" style="width: 13rem; height: 310px; ">
                  <div class="card-title fw-bold mt-3" style="color: gold;">{{recom.title}}</div>
                  <div class="card-text">{{recom.genres}}</div>
                  <div class="card-text">{{recom.popularity}} | {{recom.runtime}} 분</div>
                </div>
              </button>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name:"RecomList",
  props:{
    recom:Object,
  },
  data:function(){
    return{
      Detail:false,

    }
  },
  computed:{
    imageUrl: function(){
      const imagePath = this.recom['backdrop_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },
  },
  methods:{
    stop:function(){
      this.$emit('stop')
    }
  }


}
</script>

<style>

</style>