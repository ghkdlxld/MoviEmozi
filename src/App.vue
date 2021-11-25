<template>
  <div id="app">
    <v-card class="overflow-hidden">
      <v-app-bar color="#43a047" style="height:100px; padding-bottom:30px;"
      :src="require(`@/assets/bar.jpg`)" fade-img-on-scroll shrink-on-scroll
      scroll-target="#scrolling">
      <template v-slot:img="{props}">
        <v-img v-bind="props" gradient="to top right,  rgba(117, 116, 204, 0.7), rgba(25,32,72,.7)">
        </v-img>
      </template>
    <div id="nav" class="d-flex">
     <v-app-bar-title style="width:300px; padding-left:20px; white-space:no-wrap;"><router-link :to="{ name: 'Home'}">MoviEmozi</router-link></v-app-bar-title> 
    
       <v-spacer></v-spacer>
      <div style="display:flex;">
        <!-- <router-link :to="{ name: 'cardGame'}" class="mx-2">Movie Recommend</router-link> | -->
        <!-- Community => 자유, Review, 건의 -->
        <router-link :to="{ name: 'Community'}" class="mx-2">Community</router-link>  |
        <router-link :to="{ name: 'QuestionList' }" class="mx-2">1:1 문의</router-link>  |
        <router-link :to="{ name: 'cardGame' }" class="mx-2">영화 추천</router-link>
        <!-- profile drop down => profile logout / signup login -->
        <the-profile-bar :isLogin="isLogin"></the-profile-bar>
        </div>
    </div>
      </v-app-bar>
      <v-sheet id="scrolling" class="overflow-y-auto" style="background-color:black; padding-top:30px;">

        <router-view :key="$route.fullPath" @login="isLogin=true" @logout="isLogin=false"/>

      </v-sheet>
    </v-card>

  </div>
</template>

<script>
import TheProfileBar from '@/components/TheProfileBar'


export default {
  name: 'App',
  components: {
    TheProfileBar,
  },
  data:function(){
    return{
      isLogin : false
      }
  },
  methods: {

  },
  created:function(){
    if (localStorage.getItem('jwt')){
      this.isLogin = true
      this.$store.dispatch('setToken')
    }else{
      this.isLogin = false
    }
  }
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
  margin-bottom: 20px;
}

#nav a {
  font-weight: bold;
  color: silver;
  text-decoration: none;
  font-size : 20px;
}

#nav a.router-link-exact-active {
  color: white;
}

.v-toolbar__content, .v-toolbar__extension{
  display: inline !important;
}

.wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    overflow:hidden;
    background-color: #fff;
    background-image: 
        radial-gradient(at top left, #84e27b, transparent),
        radial-gradient(at top right, #bdffe4, transparent),
        radial-gradient(at bottom left, #0a4c7b, transparent);
  }
  .aurora-base {
    position: absolute;
    filter: blur(50px);
    opacity: 0.7;
  }
  .aurora-one {
    width: 500px;
    height: 600px;
    background-color: #50c8ec;
    left:-50px;
    top:-300px;
    z-index: 3; /* 첫 번째 그라데이션이 맨 앞으로 오도록 조정 */
  }
  .aurora-two {
    width: 800px;
    height: 800px;
    background-color: #339c4e;
    bottom:-30px;
    left:-80px;
  }
  .aurora-three {
    border-radius: 50%; /* 그라데이션이 부드럽게 겹치도록 영역을 좀더 둥글게 */
    width: 450px;
    height: 450px;
    bottom:-80px;
    right:-200px;
    background-color: #6658b3;
  }
</style>
