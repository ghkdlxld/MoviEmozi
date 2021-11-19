<template>
  <div>
    <h3>자유 게시판</h3>
    <v-row>
      <v-col cols="auto">
      <v-btn tile outlined color="success" @click="chatsCreate">Create</v-btn>
      </v-col>
    </v-row>
    <hr>
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
  name: 'BoardList',
  components:{
    BoardListItem,
  },
  methods:{
    chatsCreate:function(){
      
    }
  },

  computed:{
    ...mapState([
      'boardLists'
    ]),
    filtering:function(){
      const questions = []
      if (this.boardLists){
      this.boardLists.forEach(num=>{
        if (num.board_num === '1'){
          questions.push(num)
        }
      })
      }
      return questions
    }
  },
}
</script>

<style>

</style>