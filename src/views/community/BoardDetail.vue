<template>
  <div>

  </div>
</template>

<script>
export default {
  name:"BoardDetail",
  methods:{
    CreateChatDetail:function(context,chatId){
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${chatId}/chat_detail/`,

      })
      .then(res=>{
        console.log(res)

      })
      .catch(err=>{
        console.log(err)

      })
    },
  }

}
</script>

<style>

</style>