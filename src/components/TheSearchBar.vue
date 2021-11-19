<template>
  <div>
    <input
    class="form-control"
    @keyup.enter="searchMovie"
    type="text"
    style="width: 250px;"
    >
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