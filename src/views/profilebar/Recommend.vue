<template>
  <div>
    <!-- <input type="file" @change="recommend()"> -->
    <button @click="recommend()">추천</button>
    <input type="file" @change="onInput()" ref="file" name="file">
  </div>
</template>

<script src="https://unpkg.com/vue-request/dist/vue-request.min.js"></script>
<script>
import axios from 'axios'

export default {
  name:'Recommend',
  data:function(){
    return{
      api_url:'/v1/vision/face',
      Client_ID : 'oTXX6kMwz__NOqLgy4dH',
      Client_Secret : 'L5ot3Ah5zY',
      file : '',


    }
  },
  methods:{
    onInput:function(){
      this.file = this.$refs.file.files[0]
      // const url = URL.createObjectURL(file)
  },
    recommend:function(){
      const formData = new FormData()
      formData.append('image', this.file)
      axios({
        method: 'post',
        url: this.api_url,
        headers: {
          "Content-Type":'multipart/form-data',
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Cookie,Accept,X-PINGOTHER",
          "Access-Control-Allow-Methods":'GET,POST,OPTIONS',
          "Access-Control-Allow-Credentials":true,
          "X-Naver-Client-Id": this.Client_ID,
          "X-Naver-Client-Secret": this.Client_Secret,
        },
        data: formData
      })
      .then(res=>{
        console.log(res)
      })


//       const FormData = require("form-data");
//       const axios = require("axios");
//       const fs = require("fs");
//       const path = require("path");
//       var request = require("request");

//     const face_detect_api_url = "https://openapi.naver.com/v1/vision/face";

//     const NAVER_CLIENT_ID = "oTXX6kMwz__NOqLgy4dH";
//     const NAVER_CLIENT_SECRET = "L5ot3Ah5zY";

//     // axios 사용하는 방법

// // node환경에서 FormData를 넣기위해 form-data를 사용하실 수 있습니다.
// // https://github.com/form-data/form-data
// // axios에서도 이 방법을 소개하고 있네요!
// // https://github.com/axios/axios#form-data
//     var form = new FormData();
//     form.append("image", this.$refs['file'].files[0]);

//     axios
//     .post(face_detect_api_url, form, {
//     headers: {
//       // axios에서는 content-type을 자동으로 바꿔주지 않기 때문에
//       // 다음과 같이 header를 넣어주어야 합니다
//       // ...form.getHeaders(),
//       'Accept': 'text/html',
//       "X-Naver-Client-Id": NAVER_CLIENT_ID,
//       "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
//       },
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch(err=>{
//       console.log(err)
//     })
// // request 이용하는 방법

// // https://developers.naver.com/docs/clova/api/CFR/API_Guide.md#Nodejs
// var _formData = {
//   image: fs.createReadStream(__dirname + "/sample.jpg"),
// };

// request
// .post({
//   url: celeb_api_url,
//   formData: _formData,
//   headers: {
//     "X-Naver-Client-Id": NAVER_CLIENT_ID,
//     "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
//   },
// })
// .on("response", function (response) {
//   console.log(response.statusCode); // 200
//   console.log(response.headers["content-type"]);
// });





      // var _formData = {
      //   image : "image",
      //   image : fs.createReadStream(path.join(__dirname + "/sean.jpg")),
      // }
      // let _req = axios({
      //   method:'POST',
      //   url: this.api_url,
      //   headers:{
      //     "Content-Type": "multipart/form-data;",
      //     "X-Naver-Client-Id" : this.Client_ID, 
      //     "X-Naver-Client-Secret":this.Client_Secret,
      //   },
      //   formData : _formData,
      // })

      // let _req= axios.post(this.api_url, _formData, {
      //   'X-Naver-Client-Id' : this.Client_ID, 'X-Naver-Client-Secret':this.Client_Secret,
      // })
      // .then((result)=>{
      //   console.log(result)
      //   res.json(_req);
      // })
      // .catch(err=>{
      //   console.error(err);
      //   next(err);
      // })

      // var _req = request.post({
      //   url:this.api_url,
      //   formData : _formData,
      //   headers:{
      //     'X-Naver-Client-Id' : this.Client_ID, 'X-Naver-Client-Secret':this.Client_Secret,
      //   },
      // })
      // .on("response", function(response){
      //   console.log(response.statusCode)
      //   console.log(response.headers["content-type"])
      // })
      // console.log(request.head)
      // console.log(_req)
      // _req.pipe(res)


      // axios({
      //   method:'post',
      //   url: this.api_url,
      //   headers:{}
        
      // })
    }
  },

}
</script>

<style>

</style>