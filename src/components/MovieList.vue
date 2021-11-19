<template>
  <div class="d-flex flex-column p-5">
    <div class="d-flex justify-content-between mx-3">
      <the-sort-bar></the-sort-bar>
      <the-search-bar @search-movie="searchMovie"></the-search-bar>
    </div>
    <div class="home d-flex" style="flex-wrap:wrap;">
      <movie-card
      v-for="movieCard in movieList"
      :key="movieCard.title"
      :movieCard="movieCard"
      class="col-lg-2 col-md-3 col-sm-4 my-3"
      >
      </movie-card>
    </div>
  </div>
</template>

<script>
import TheSortBar from '@/components/TheSortBar'
import TheSearchBar from '@/components/TheSearchBar'
import MovieCard from '@/components/MovieCard'
import { mapState } from 'vuex'

export default {
  name: 'MovieList',
  components: {
    TheSearchBar,
    TheSortBar,
    MovieCard,
  },
  methods: {
    searchMovie: function (searchData) {
      console.log(searchData)
    }
  },
  computed: {
    ...mapState([
      'movieList'
    ])
  }
}
</script>




<style>
</style>
