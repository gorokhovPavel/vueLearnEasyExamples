<template>
    <div class='main'>
		<table class='reports fullSize' border='0'>
			<tr>
				<td width='30%' v-for='(item, index) in reportDataList' :key='index' >
					<h3>{{$lang.messages[item.titleLang]}}</h3>
					<div @click="getPointReport(item.objForRepost)">
						<a href="#">{{$lang.messages.today}}</a>
					</div>
					<div><a href="#">{{$lang.messages.for}} {{$lang.messages.last}} 24 {{$lang.messages.hours}}</a></div>
					<div><a href="#">{{$lang.messages.for}} {{$lang.messages.last}} 7 {{$lang.messages.days}}</a></div>
					<div><a href="#">{{$lang.messages.for}} {{$lang.messages.thisName}} {{$lang.messages.mounth}}</a></div>
					<div><a href="#">{{$lang.messages.for}} {{$lang.messages.thisName}} {{$lang.messages.year}}</a></div>
				</td>
			</tr>
			<tr v-if='false' >
				<td>
					<h2>by cameras</h2>
					<div><a href="#">today</a></div>
					<div><a href="#">last 24 hours</a></div>
					<div><a href="#">last 7 days</a></div>
					<div><a href="#">this month</a></div>
					<div><a href="#">this year</a></div>
				</td>
				<td style="">
					<h2>by floors</h2>
					<div><a href="#">today</a></div>
					<div><a href="#">last 24 hours</a></div>
					<div><a href="#">last 7 days</a></div>
					<div><a href="#">this month</a></div>
					<div><a href="#">this year</a></div>
				</td>
				<td>
					&nbsp;
				</td>
			</tr>
		</table>
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
	table.reports td {
		text-align: 'center';
	}
	table.reports div {
		line-height : 30px;
		font-size : 13px;
	}
</style>