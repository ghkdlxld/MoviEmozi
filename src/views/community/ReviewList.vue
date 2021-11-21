<template>
  <div>
    <h3 style="color:white"> 리뷰 게시판 </h3>
    <hr>
    <v-row>
      <v-col cols="auto">
      <v-btn tile outlined dark @click="reviewCreate">Create</v-btn>
      </v-col>
    </v-row>
    <div v-if="reviewLists">
    <review-list-item
    :reviewList="reviewLists"
    >
    </review-list-item>
    </div>
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
  methods:{
    reviewCreate:function(){
      this.$router.push({name:'ReviewCreate'})
    },
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