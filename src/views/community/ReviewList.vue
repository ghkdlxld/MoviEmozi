<template>
  <div>
    <h3 style="color:white"> 리뷰 게시판 </h3>
    <hr>
    <review-list-item
    :reviewList="reviewLists"
    >
    </review-list-item>
  </div>
</template>

<script>
import ReviewListItem from './ReviewListItem.vue'
import {mapState} from 'vuex'

export default {
  name:'Review',
  components:{
    ReviewListItem,
  },
  computed:{
    ...mapState([
      'reviewLists',
    ])
  },
  
  created: function(){
  
  }
}
</script>

<style>

</style>