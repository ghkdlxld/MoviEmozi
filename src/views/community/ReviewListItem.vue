<template>
  <div>
    <div id="app" class="my-4">
      <v-app id="inspire">
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
                  Movie
                </th>
                <th class="text-center">
                  Updated_at
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="review in DataList"
                :key="review.id"
                @click="moveToDetail(review.id)"
              >
                <td>{{ review.id }}</td>
                <td> 리뷰 </td>
                <td>{{ review.title }}</td>
                <td>{{userNameList[review.user]}}</td>
                <td>{{review.movie_id}}</td>
                <td>{{review.updated_at |dateFormat}}</td>
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
import {mapState} from 'vuex'

export default {
  name:"ReviewListItem",
  props:{
    reviewList:Array,
  },
  data:function(){
    return{
      dataPerPage:10,
      curPageNum:1,
    }
  },
  methods:{
    moveToDetail:function(reviewId){
      this.$router.push({name:'ReviewDetail', params: {reviewId:reviewId}})
    }
  },
  computed:{
    ...mapState([
      'userNameList',
    ]),
    startOffset(){
      return ((this.curPageNum-1) * this.dataPerPage)
    },
    endOffset(){
      return (this.startOffset + this.dataPerPage)
    },
    numOfPages(){
      return Math.ceil(this.reviewList.length / this.dataPerPage)
    },
    DataList(){
      return this.reviewList.slice(this.startOffset, this.endOffset)
    }
  },
  filters:{
    dateFormat:function(value){
      if (value===""){
        return ''
      }
      const date = new Date(value)
      const year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()

      hour = (hour>12) ? 'PM' +' '+(hour-12) : 'AM' +' '+hour
      month = (month<10) ? '0'+month : month
      day = (day<10) ? '0'+day : day
      minute = (minute<10)? '0'+minute : minute
      
      return year + '-' + month+'-'+day+' '+hour+':'+minute;
    }
  },
}
</script>

<style>

</style>