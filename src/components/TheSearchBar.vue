<template>
  <div>
    <input 
    @keyup.enter="searchMovie"
    type="text">
  </div>
</template>

<script>
export default {
  name: 'TheSearchBar',
  methods: {
    searchMovie: function (event) {
      this.$emit('search-movie', event.target.value)
    }
  }
}
</script>

<style>

</style>