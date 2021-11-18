<template>
  <div>
    <h2>Boxoffice Top 10</h2>
    <carousel-3d>
      <slide :index="0">
        Slide 1 Content
      </slide>
      <slide :index="1">
        Slide 2 Content
      </slide>
      <slide :index="2">
        <img :src="`https://image.flaticon.com/icons/png/512/4825/4825430.png`" alt="">
        Slide 3 Content
      </slide>
    </carousel-3d>

    <!-- <carousel-3d>
      <slide v-for="(slide, i) in slides" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <img 
          :data-index="index" 
          :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" 
          :src="{}">
        </template>
      </slide>
    </carousel-3d> -->
  </div>
</template>

<script>
import axios from 'axios'
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'BoxOffice',
  components: {
    Carousel3d,
    Slide,
  },
  data: function() {
    return {
      topTen: [],
    }
  },
  methods: {
  },
  created() {
    const KOFIC_API = '4264dfeb35de00f9b3425f81600289c2'
    var date = new Date()
    var year = date.getFullYear()
    var month = ("0" + (1 + date.getMonth())).slice(-2)
    var tday = ("0" + date.getDate()).slice(-2)
    const today = year + month + tday - 7

    axios({
      method: 'get',
      url: `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${KOFIC_API}&targetDt=${today}&weekGb=0`,
    })
    .then(res => {
      this.topTen = res.data.boxOfficeResult.weeklyBoxOfficeList
      console.log(this.topTen)
    })
  }
}
</script>



<style>
</style>
