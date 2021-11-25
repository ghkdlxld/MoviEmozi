<template>
  <div>
    <div id="map" style="width:500px;height:400px;"></div>
  </div>
</template>

	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f8eab9b5839f80f717e69870eba54891"></script>
	<script>
		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		var map = new kakao.maps.Map(container, options);
	</script>
<script>

export default {
  name:"Map",
  created:function(){
  }
}
</script>

<style>

</style>