<template>
  <div class="d-flex justify-content-between" style="width: 530px">
      <!-- 장르 -->
      <div class="dropdown text-white">
        <button 
        class="btn btn-outline-secondary dropdown-toggle" 
        type="button" id="dropdownMenuButton2" 
        data-bs-toggle="dropdown" aria-expanded="false">
          <span class="mx-2">장르 전체</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li><a class="dropdown-item" href="#">액션</a></li>
          <li><a class="dropdown-item" href="#">모험</a></li>
          <li><a class="dropdown-item" href="#">코미디</a></li>
          <li><a class="dropdown-item" href="#">애니메이션</a></li>
        </ul>
      </div>

      <!-- 러닝타임(긴순/짧은순) -->
      <!-- 개봉일(최신순/오래된순) -->
      <!-- 평점(popularity) -->
      
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheSortBar',
  methods: {

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