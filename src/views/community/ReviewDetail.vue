<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:"ReviewDetail",
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

}
</script>

<style>

</style>