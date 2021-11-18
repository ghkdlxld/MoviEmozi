<template>
  <div>
    <h2>Boxoffice Top 10</h2>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BoxOffice',
  methods: {
  },
  created() {
    const KOFIC_API = '4264dfeb35de00f9b3425f81600289c2'
    var date = new Date()
    var year = date.getFullYear()
    var month = ("0" + (1 + date.getMonth())).slice(-2)
    var tday = ("0" + date.getDate()).slice(-2)
    const today = year + month + tday - 7

    console.log(today)
    axios({
      method: 'get',
      url: `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${KOFIC_API}&targetDt=${today}&weekGb=0`,
    })
    .then(res => {
      console.log(res)
    })
  }
}
</script>



<style>
</style>
