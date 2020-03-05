<template>
    <div class='flexContainerAdp reportContainer fullSize'>
		<div class='flexItemAdp reportPosAdp' v-for='(item, index) in reportDataList' :key='index' >
			<h3 class='bold upper' >{{$lang.messages[item.titleLang]}}</h3>
			<div @click="getPointReport(item.objForRepost)">
				<a href="#">{{$lang.messages.today}}</a>
			</div>
			<div><a href="#">{{$lang.messages.for}} {{$lang.messages.last}} 24 {{$lang.messages.hours}}</a></div>
			<div><a href="#">{{$lang.messages.for}} {{$lang.messages.last}} 7 {{$lang.messages.days}}</a></div>
			<div><a href="#">{{$lang.messages.for}} {{$lang.messages.thisName}} {{$lang.messages.mounth}}</a></div>
			<div><a href="#">{{$lang.messages.for}} {{$lang.messages.thisName}} {{$lang.messages.year}}</a></div>
		</div>
	</div>
</template>
<script >
	import { mapActions, mapGetters } from 'vuex'
	export default {
		data : ()=>({
			reportDataList : []
		}),
		computed : {
			...mapGetters(['getAreaInfo'])
		},
		created(){
			this.setInitReportData();
			this.setUpdateAreaData();
		},
		methods : {
			...mapActions(['getPointReport', 'setUpdateAreaData']),
			setInitReportData(){
				this.reportDataList = [
					{
						objForRepost : 'ads',
						titleLang : 'adsMapName'
					}, {
						objForRepost : 'point',
						titleLang : 'pointMapName'
					}, {
						objForRepost : 'gate',
						titleLang : 'gateMapName'
					}
				]
			}
		}
	}
</script>
<style lang="scss">
	//@import '../../content/style/adaptiveStyle.scss';
	.reportContainer div {
		line-height : 30px;
	}
</style>