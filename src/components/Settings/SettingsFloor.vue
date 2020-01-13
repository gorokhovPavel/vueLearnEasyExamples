<template>
    <div class='main'>
		<a href="settings_floors_1.html" class="tile floors_list">
			<table >
				<tr>
					<td style="width: 2%">
						<span href="#" class="icon_edit"></span>
					</td>
					<td style="width: 2%">
						<span class="floor_img">
							<img :src='getGeoPlanMapFile' style="height: 200px;"/>
						</span>
					</td>
					<td>
						<span class="floor_name">{{$lang.messages.floor}} 1</span>
					</td>
					<td>
						<span class="floor_descr">{{$lang.messages.descrOfFloor}} 1</span>
					</td>
				</tr>
			</table>
		</a>
		<router-link :to='"/CameraAdd"' >
			<a-button >{{$lang.messages.addFloor}}</a-button>
		</router-link>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		data : ()=>({
			settingsFloorLabel : 'settings :: floors',
		}),
		computed : {
			...mapGetters(['getGeoPlanMapFile'])
		},
	}
</script>
<style >
	.floors_list {
		width: 100% !important;
		line-height: 50px !important;
		height: 220px !important;
		padding: 10px 20px;
	}
	.floors_list .floor_img {
		display: inline-block;
		height: 210px;
	}
	.floors_list .floor_name {
		font-weight: bold;
	}
</style>