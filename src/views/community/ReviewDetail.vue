<template>
  <div class="container" style="color:white;">
    <h1 class="d-flex">Title:{{detail.title}}</h1>
      <h5 class="d-flex">작성자 : {{detail.user}}</h5>
      <div class="d-flex">
        <p>수정시각 : {{detail.updated_at | dateFormat}}</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:"ReviewDetail",
  data:function(){
    return{
      detail : null,
    }
  },
  methods:{
    CreateReviewDetail:function(reviewId){
      reviewId = this.$route.params.reviewId
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${reviewId}/review_detail/`,

      })
      .then(res=>{
        this.detail = res.data

      })
      .catch(err=>{
        console.log(err)
      })
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
  created: function(){
    this.CreateReviewDetail()
  }

}
</script>

<style>

</style>