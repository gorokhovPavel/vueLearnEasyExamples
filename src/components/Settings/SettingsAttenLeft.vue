<template>
    <div class='main'>
		<floors />
		<a href="#" class="tile gate_" v-for='(item, index) in floorGatesList' :key='index' >
			<span class="gate_list_title">{{$lang.messages.gateMapName}} {{item.id}}</span> 
			<span class="gate_list_descr">{{$lang.messages.floor}} {{item.id}}</span> 
			<span class="gate_list_check">
				<input type="checkbox"/> {{$lang.messages.entrance}}
			</span> 
			<span class="gate_list_check2">
				<input type="checkbox"/> {{$lang.messages.inverse}}
			</span>
		</a>
		<a-button >{{$lang.messages.save}}</a-button>
	</div>
</template>
<script>
	import floors from '../Additional/Floors'
	export default {
		components : {floors},
		data : ()=>({
			floorGatesList : [],
		}),
		created(){
			this.setInitFloorGatesList();
		},
		methods : {
			setInitFloorGatesList(){
				for (var i=0; i<8; i++){
					let index = i+1;
					const floorItem = {
						id : index,
					}
					this.floorGatesList = [ ...this.floorGatesList, floorItem ];
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
    .gate_ {
		display: block;
		width: 100%;
		line-height: 50px;
		height: 50px;
	}
	.gate_list_title {
		display: inline-block;
		width: 200px;
		font-weight: bold;
	}
	.gate_list_title, .gate_list_check, .gate_list_descr {
		display: inline-block;
		width: 200px;
	}
</style>