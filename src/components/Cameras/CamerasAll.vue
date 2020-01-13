<template>
    <div class='main'>
		<floors />
		<router-link :to="'/CameraVideo/'+item.id"
			v-for='(item, index) in cameraList' :key='index' 
			class='camera_view pointer shadowDivHover' >
				<img class='cameraMenuImg fullSize' v-if='item.id' :src='getCameraGifFile(item.id)' />
		</router-link>
	</div>
</template>
<script>
	import floors from '../Additional/Floors'
	import {mapGetters} from 'vuex'
	export default {
		components : {floors},
		data : ()=>({		
			cameraList : [],
		}),
		computed : {
			...mapGetters(['getCameraImgFile', 'getCameraGifFile'])
		},
		created(){
			this.setInitCameraList();			
		},
		methods : {
			setInitCameraList(){
				for (var i=0; i<8; i++){
					let index = i+1;
					const cameraItem = {
						id : index
					}
					this.cameraList = [ ...this.cameraList, cameraItem ];
				}
			}
		}
	}
</script>
<style lang='scss' >
	.camera_view {
		display : inline-block;
		width : 32.5%;
		margin : 5px;
	}
	.cameraMenuImg {
		height : 200px;
	}
</style>