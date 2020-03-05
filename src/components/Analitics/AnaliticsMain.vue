<template>
	<div class='flexContainerAdp' > 
		<canvas id='gatesAdsChartId' class='fullSize flexItemAdp analItemPosAdp ' height='300px' >
		</canvas>
		<canvas 
			id = 'pointsChartId' class='fullSize flexItemAdp backPointsChartAdp' :height='chartPointsCanvasHeight'
			:style="{ 'background' : 'url('+getGeoPlanMapFile+')', 'background-size' : '100% 100%' }" >
		</canvas>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import extension from '../../utils/Extension'
	import Chart from 'chart.js'
	import ChartSettings from '../../utils/ChartSettings'

    export default {
		data :()=>({
			config : null,
			chartData : null,
			chartOptions : null,
			chartPointsCanvasHeight : null,
		}),
		computed : {
			...mapGetters([ 'getChartColors', 'getGeoPlanMapFile', 'getAreaInfo', 'getCenterInterval', 'getMaxMinTerritory' ]),
		},
        mounted() {		
			
			//This is the setting of height size for canvas object, pointsChartId
			this.chartPointsCanvasHeight = ( window.innerWidth > 600 ) ? '400px' : '200px';

			const objForArea = { 
				inTimeTerritoryData : null, 
				callBack : ()=> {
					
					const [ xShift, yShift ] = [ 1.5, -6 ];
					const midVal = (val1, val2)=>(val1+val2)/2;
					const toShiftFixed = (val1, val2)=>(+val1+val2).toFixed(2);

					const adsMapData = this.getAreaInfo.adsMap.map(item=>{
						let { x1, y1, x2, y2, mid1, mid2 } = item;
						let xMid = midVal(x1,x2);
						let yMid = midVal(y1,y2);
						let mid = midVal(mid1,mid2);
						[xMid, yMid] = extension.getModifyCoordToXy( [xMid, yMid], this.getCenterInterval );						
						return {
							x : toShiftFixed(xMid, xShift),
							y : toShiftFixed(yMid, yShift),
							r : (mid+1)*5, 
							name : `ads ${item.id}`
						};
					});
					
					const pointMapData = this.getAreaInfo.pointMap.map(item=>{
						const newCoord = extension.getModifyCoordToXy( [item.x, item.y], this.getCenterInterval );
						return {
							x : toShiftFixed(newCoord[0], xShift),
							y : toShiftFixed(newCoord[1], yShift),
							r : (item.count+1)*1.5, 
							name : `point ${item.id}`
						};
					});

					const chartSettings = new ChartSettings( this.getChartColors, 110, this.months, this.colors );
					this.config = chartSettings.getConfig1();

					const localChartData = [{	
							color : 'blue',
							name : 'pointMapName', 
							data : pointMapData
						}, 
						{
							color : 'red',
							name : 'adsMapName', 
							data : adsMapData
						}
					];

					this.chartData = chartSettings.getChartData(localChartData);					
					this.chartOptions = chartSettings.getChartOptions(this.getMaxMinTerritory);
					
					const chartObject = {
						type : 'bubble',
						data : this.chartData,
						options : this.chartOptions
					};

					let gatesAdsChart = document.querySelector('#gatesAdsChartId').getContext('2d');
					gatesAdsChart = new Chart(gatesAdsChart, this.config);

					let pointsChart = document.querySelector('#pointsChartId').getContext('2d');
					pointsChart = new Chart( pointsChart, chartObject );
				}
			};

			this.setUpdateAreaData(objForArea);
		},
		methods : {
			...mapActions(['setUpdateAreaData']),
		}
    }
</script>