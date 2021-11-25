<template>
    <span>
      <img :src="`https://image.tmdb.org/t/p/original${card.poster_path}`" 
      alt="" style="width: 200px;">
    </span>
</template>

<script>


export default {
  name: 'gameCard',
  props: {
    card: Object,
  },
  methods: {

  },
  computed: {

    imageUrl: function(){
      const imagePath = this.movieCard['poster_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },
  },
  mounted: function(){
    console.log(this.card)
  }
}
</script>

<style>

</style>