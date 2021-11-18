<template>
  <div>
    <the-search-bar
    @search-movie="searchMovie">
    </the-search-bar>
  </div>
</template>

<script>
import TheSearchBar from '@/components/TheSearchBar'

export default {
  name: 'MovieList',
  components: {
    TheSearchBar,
  },
  methods: {
    searchMovie: function (searchData) {
      console.log(searchData)
    }
  }
  
}
</script>




<style>
</style>
