<template>
  <div class="grid">
  <ul class="list">
    <li class="gamecard" :style="`background-color: red;`"></li>
    <li class="gamecard"></li>
    <li class="gamecard"></li>
    <li class="gamecard"></li>
    <li class="gamecard"></li>
    <li class="gamecard"></li>
    <li class="gamecard"></li>
    <li class="gamecard"></li>
    <li class="gamecard gg"></li>
    <li class="gamecard"></li>
  </ul>
  
  <button class="stack btn btn-success"
  @click="stack()">Stack</button>
  <button class="spread btn btn-warning"
  @click="spread()">Spread</button>
  
</div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'gamecardGame',
  components: {
  },
  data: function () {
    return {
      movieAll: null,
      gamecards: [],
    }
  },
  methods: {
    shuffle: (gamecards) => {
      for (let i = 0; i < gamecards.length; i++) {
        //Fisher-Yates shuffle
        const rnd = Math.random() * i | 0;
        const tmp = gamecards[i];
        gamecards[i] = gamecards[rnd];
        gamecards[rnd] = tmp;
      }
      return gamecards;
    },

    imgUrl: function(gamecard){
      const imagePath = gamecard['poster_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },

    stack: function () {
      const gamecards = document.querySelectorAll('.gamecard')
      gamecards.forEach((gamecard, e) => {
        setTimeout(function() {
          gamecards[e].setAttribute('class', 'gamecard')
        }, e*150)
      })
    },

    spread: function() {
      const gamecards = document.querySelectorAll('.gamecard')
      gamecards.forEach((gamecard, e)=> {
      setTimeout(function() {
      gamecards[e].setAttribute("class", "gamecard ani" + e);
        }, e * 150)
      })
    }
  },
  computed: {
  },

  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/',
    })
    .then(res => {
      this.movieAll = res.data

      let random = _.sampleSize(this.movieAll, 5)
      let movies = []
      for (var ran of random) {
        movies.push(ran)
        movies.push(ran)
      }
      this.gamecards = movies
      console.log(this.gamecards)
      this.gamecards = this.shuffle(this.gamecards)
    })
  }
}
</script>

<style>
.grid {
  width: 1170px;
  margin: 0 auto;
}

.list {
  height: 652px;
  position: relative;
  list-style-type: none;
  padding-left: 0;
}

.gamecard {
  transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  perspective: 1000;
  -ms-transform: perspective(1000px);
  -moz-transform: perspective(1000px);
  -ms-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  float: left;
  width: 222px;
  height: 311px;
  background-color: #eee;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 30px 0 15px 15px;
}
.gamecard:nth-child(5n) {
  margin-right: 0;
}
.gamecard.ani0 {
  right: 948px;
  bottom: 326px;
}
.gamecard.ani1 {
  right: 711px;
  bottom: 326px;
}
.gamecard.ani2 {
  right: 474px;
  bottom: 326px;
}
.gamecard.ani3 {
  right: 237px;
  bottom: 326px;
}
.gamecard.ani4 {
  right: 0;
  bottom: 326px;
}
.gamecard.ani5 {
  right: 948px;
  bottom: 0;
}
.gamecard.ani6 {
  right: 711px;
  bottom: 0;
}
.gamecard.ani7 {
  right: 474px;
  bottom: 0;
}
.gamecard.ani8 {
  right: 237px;
  bottom: 0;
}
</style>