<template>
    <div class='flexContainerAdp ordinarContainerAdp'>
		<floors class='flexItemAdp' />
		<router-link :to="'/CameraVideo/'+item.id"
			v-for='(item, index) in cameraList' :key='index' 
			class='pointer shadowDivHover flexItemAdp ordinarItemPadAdp' >
				<img v-if='item.id' :src='getCameraGifFile(item.id)' />
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