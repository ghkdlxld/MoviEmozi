<template>
  <div data-app>
    <h3 style="color:white">자유 게시판</h3>

    <hr>
    <v-row>
      <v-col cols="auto">
      <v-btn tile outlined dark @click="chatsCreate">Create</v-btn>
      </v-col>
    </v-row>
    <hr style="color:white;">
    <v-row>
      <v-col cols="3" class="px-0 py-0">
      <span style="color:white;">Category: </span>
      <v-select
        v-model="select"
        color="black"
        solo background-color="black"
        :items="items"
        item-text="name"
        item-value="value"
        label="카테고리 선택"
        dense
        id="select"
      ></v-select>
      </v-col>
    </v-row>
    <div v-if="boardLists">
    <board-list-item
    :boardList="CategoryFilter"
    >
    </board-list-item>
    </div>
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
  data:function(){
    return{
      items: [{value:'0',name:'all'},{value:'1', name:'자유'},
      {value:'3',name:'영화 추천'},{value:'4',name:'파티 모집'}],
      select : '0',
      cnt_list : [],
    }
  },
  methods:{
    chatsCreate:function(){
      this.$router.push({name:"BoardCreate", query:{category:'chat'}})
    },
  },

  computed:{
    ...mapState([
      'boardLists',
      'userNameList',
    ]),
    filtering:function(){
      const questions = []
      if (this.boardLists){
      this.boardLists.forEach(num=>{
        if (num.board_num != '2'){
          questions.push(num)
        }
      })
      }
      return questions
    },
    CategoryFilter(){
      var filter = []
      this.filtering.forEach(board=>{
        if (board['board_num'] === this.select ){
          filter.push(board)
        } else if (this.select === '0'){
          filter = this.filtering
          return
        }
      })
      return filter
    },
  },
}
</script>

<style>

</style>