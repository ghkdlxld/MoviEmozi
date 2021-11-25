<template>
  <div class="grid">
  <ul class="list">
    <li class="card" :style="`background-color: red;`"></li>
    <li class="card"></li>
    <li class="card"></li>
    <li class="card"></li>
    <li class="card"></li>
    <li class="card"></li>
    <li class="card"></li>
    <li class="card"></li>
    <li class="card gg"></li>
    <li class="card"></li>
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
  name: 'cardGame',
  components: {
  },
  data: function () {
    return {
      movieAll: null,
      cards: [],
    }
  },
  methods: {
    shuffle: (cards) => {
      for (let i = 0; i < cards.length; i++) {
        //Fisher-Yates shuffle
        const rnd = Math.random() * i | 0;
        const tmp = cards[i];
        cards[i] = cards[rnd];
        cards[rnd] = tmp;
      }
      return cards;
    },

    imgUrl: function(card){
      const imagePath = card['poster_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },

    stack: function () {
      const cards = document.querySelectorAll('.card')
      cards.forEach((card, e) => {
        setTimeout(function() {
          cards[e].setAttribute('class', 'card')
        }, e*150)
      })
    },

    spread: function() {
      const cards = document.querySelectorAll('.card')
      cards.forEach((card, e)=> {
      setTimeout(function() {
      cards[e].setAttribute("class", "card ani" + e);
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
      this.cards = movies
      console.log(this.cards)
      this.cards = this.shuffle(this.cards)
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

.card {
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
.card:nth-child(5n) {
  margin-right: 0;
}
.card.ani0 {
  right: 948px;
  bottom: 326px;
}
.card.ani1 {
  right: 711px;
  bottom: 326px;
}
.card.ani2 {
  right: 474px;
  bottom: 326px;
}
.card.ani3 {
  right: 237px;
  bottom: 326px;
}
.card.ani4 {
  right: 0;
  bottom: 326px;
}
.card.ani5 {
  right: 948px;
  bottom: 0;
}
.card.ani6 {
  right: 711px;
  bottom: 0;
}
.card.ani7 {
  right: 474px;
  bottom: 0;
}
.card.ani8 {
  right: 237px;
  bottom: 0;
}
</style>