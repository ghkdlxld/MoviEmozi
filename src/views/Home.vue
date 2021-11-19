<template>
  <div class="home">
    <box-office></box-office>
    <movie-list></movie-list>
  </div>
</template>

<script>
import BoxOffice from '@/components/BoxOffice'
import MovieList from '@/components/MovieList'

export default {
  name: 'Home',
  components: {
    BoxOffice,
    MovieList,
  },
  created: function() {
  }
}
</script>
