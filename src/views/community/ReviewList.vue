<template>
  <div>
    <h3> 리뷰 게시판 </h3>
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
  methods:{
    CreateReviewDetail:function(context,reviewId){
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${reviewId}/review_detail/`,

      })
      .then(res=>{
        console.log(res)

      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  created: function(){
  
  }
}
</script>

<style>

</style>