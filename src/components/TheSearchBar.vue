<template>
  <div class="container">
    <div class="d-flex justify-content-end">
      <input
      class="form-control"
      @keyup.enter="searchMovie"
      type="text"
      style="width: 250px;"
      >
    </div>
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