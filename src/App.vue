<template>
  <div id="app">
    <div id="nav" class="d-flex justify-content-between">
      <router-link :to="{ name: 'Home'}">Home</router-link>
      <div class="d-flex">
        <!-- Community => 자유, Review, 건의 -->
        <router-link :to="{ name: 'Community'}" class="mx-2">Community</router-link>  |
        <router-link :to="{ name: 'QuestionList' }" class="mx-2">1:1 문의</router-link>  |

        <!-- profile drop down => profile logout / signup login -->
        <the-profile-bar></the-profile-bar>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import TheProfileBar from '@/components/TheProfileBar'

export default {
  name: 'App',
  components: {
    TheProfileBar
  },
  methods: {
  },
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: rgb(192, 189, 189);
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
