<template>
  <div>
    <div id="app" class="my-4">
      <v-app>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  No.
                </th>
                <th class="text-center">
                  Category
                </th>
                <th class="text-center">
                  Title
                </th>
                <th class="text-center">
                  User
                </th>
                <th class="text-center">
                  Updated_at
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="board in DataList"
                :key="board.id"
              >
                <td>{{ board.id }}</td>
                <td>{{ boardNum[board.board_num] }}</td>
                <td>{{ board.title }}</td>
                <td>{{board.user}}</td>
                <td>{{board.updated_at}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <hr>
          <v-pagination
            v-model="curPageNum"    
            :length="numOfPages"
          ></v-pagination>
      </v-app>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:"BoardListItem",
  props:{
    boardList:Array,
  },
  data:function(){
    return{
      dataPerPage:10,
      curPageNum:1,
    }
  },
  computed:{
    ...mapState([
      'boardNum'
    ]),
    startOffset(){
      return ((this.curPageNum-1) * this.dataPerPage)
    },
    endOffset(){
      return (this.startOffset + this.dataPerPage)
    },
    numOfPages(){
      return Math.ceil(this.boardList.length / this.dataPerPage)
    },
    DataList(){
      return this.boardList.slice(this.startOffset, this.endOffset)
    },
  }
  

}
</script>

<style>

</style>