<template>
  <div>
    <h2>Boxoffice Top 10</h2>
      <carousel-3d  
      :controls-visible="true" 
      :controls-prev-html="'&#10092;'" 
      :controls-next-html="'&#10093;'" 
      :controls-width="20" 
      :controls-height="70" 
      :clickable="false"
      v-if="topTenMovie">
        <slide 
        v-for="(slide, i) in slides" 
        :index="i"
        :key="i"
        style="width: 200px;"
        >
          <figure>
            <img :src="`https://image.tmdb.org/t/p/original/${topTenPosterPath[i]}`">
          </figure>
        </slide>
      </carousel-3d>
  </div>
</template>

<script>
import axios from 'axios'
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'BoxOffice',
  components: {
    Carousel3d,
    Slide
  },
  data: function() {
    return {
      topTenMovie: [],
      topTenPosterPath: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      slides: 10
    }
  },
  methods: {
  },

  created() {
    const KOFIC_API = '4264dfeb35de00f9b3425f81600289c2'
    const TMDB_API = '325094f1219be8e028e6413f560bf212'

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
        // console.log(res.data.boxOfficeResult.weeklyBoxOfficeList)
        for (const boxofficeobj of res.data.boxOfficeResult.weeklyBoxOfficeList) {
          var boxOfficeMovie = JSON.parse(JSON.stringify(boxofficeobj))
          this.topTenMovie.push(boxOfficeMovie.movieNm)
        }
      // console.log(this.topTenMovie)

      for (const movie of this.topTenMovie) {
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API}&language=ko-KR&page=1&include_adult=false&query=${movie}`
        })
        .then(res => {
          this.topTenPosterPath[this.topTenMovie.indexOf(movie)] = JSON.parse(JSON.stringify(res.data.results[0].poster_path))
        })
      }
    })
    console.log(this.topTenPosterPath)
    console.log(this.topTenMovie)
  }
}
</script>


<style>
</style>
