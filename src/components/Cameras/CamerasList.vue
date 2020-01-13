<template>
    <div class='main'>
		<floors />
		<router-link :to="'/CameraVideo/'+item.id"
			v-for='(item, index) in cameraList' :key='index' 
			class="tile camera_list" >
				<span href="#" v-if='isSettings' class="icon_edit"></span>
				<span class="camera_list_title">{{$lang.messages.camera}} {{item.id}}</span> 
				<span class="camera_list_desc">{{$lang.messages.descOfCamera}} {{item.id}}</span>
		</router-link>
		<router-link v-if='isSettings' :to='"/CameraAdd"' >
			<a-button >{{$lang.messages.addCamera}}</a-button>
		</router-link>
	</div>
</template>
<script>
	import floors from '../Additional/Floors'
	export default {
		components : {floors},
		data : ()=>({
			cameraList : [],
			isSettings : false,
		}),
		created(){
			this.isSettings = this.$route.params.IsSet == 1 ? true : false;
			this.setCameraList();
		},
		methods : {
			setCameraList(){
				for (var i=0; i<8; i++){
					let index = i+1;
					const cameraItem = {
						id : index,
					}
					this.cameraList = [ ...this.cameraList, cameraItem ];
				}
			}
		}
	}
</script>