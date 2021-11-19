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
              >
                <td>{{ review.id }}</td>
                <td> 리뷰 </td>
                <td>{{ review.title }}</td>
                <td>{{review.user}}</td>
                <td>{{review.movie_id}}</td>
                <td>{{review.updated_at}}</td>
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
  computed:{
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
  }
}
</script>

<style>

</style>