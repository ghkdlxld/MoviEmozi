<template>
  <div class = "container">
    <h3 style="color:white">1:1 문의</h3>
    <hr>
    <v-row>
      <v-col cols="auto">
      <v-btn tile outlined style="color:silver;" @click="chatsCreate">Create</v-btn>
      </v-col>
    </v-row>
    <board-list-item
    :boardList="filtering"
    >
    </board-list-item>
  </div>
</template>

<script>
import BoardListItem from './BoardListItem.vue'
import {mapState} from 'vuex'


export default {
  name: 'Question',
  components:{
    BoardListItem,
  },
  methods:{
    chatsCreate:function(){
      if (this.isLogin){
      this.$router.push({name:'BoardCreate', query:{category:'question'}})
      } else{
        this.$router.push({name:'Login',query:{category:'question'}})
      }
    },
  },
  computed:{
    ...mapState([
      'boardLists',
      'isLogin',
    ]),
    filtering:function(){
      const questions = []

      if (this.boardLists){
      this.boardLists.forEach(num=>{
        if (num.board_num === '2'){
          questions.push(num)
        }
      })}
      return questions
    },
  },

}
</script>

<style>

</style>