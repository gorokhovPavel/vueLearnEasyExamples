<template>
    <div class='main'>
		<h1>{{logoGateSettings}}</h1>
		<div>
			<floors />
			<a href="#" class="tile gate_" v-for='(item, index) in gateList' :key='index'  >
				<span class="gate_list_title"> {{item}} </span> 
				<span class="gate_list_descr">1H: 20; 2H: 40; 4H: 50; 6H: 89; 24H: 240</span>
			</a> 
		</div>                                                                                           
	</div>
</template>
<script>
	import floors from '../Additional/Floors'
	export default {
		components : {floors},
		data : ()=>({
			logoGateSettings : 'settings :: gates :: attendance and left',
			gateList : [],
		}),
		created(){
			this.setGateList();
		},
		methods : {
			setGateList(){
				this.gateList = [
					'Gate 1', 'Gate 2', 'Gate 3', 'Gate 4', 'Gate 5', 'Gate 6', 'Gate 7', 'Gate 8', 'Gate 9'
				]
			}
		}
	}
</script>
<style lang="scss" scoped>
    .gate_ {
		width: 80%;
		line-height: 50px;
		height: 50px;
	}
	.gate_list_title {
		display: inline-block;
		width: 150px;
		font-weight: bold;
	}
	.gate_list_check, .gate_list_descr {
		display: inline-block;
		width: 350px;
	}
</style>