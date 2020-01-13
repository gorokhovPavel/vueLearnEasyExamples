import SampleUtils from './SampleUtils'
import lang from '../language/Translate'

export default class ChartSettings {

	constructor( inChartColors, inSeed, inMonths, inColors  ){
		this._dataCount = 27;
		this._inChartColors = inChartColors;		
		this._sampleUtils = new SampleUtils(inSeed, inMonths, inColors);
    }

    getConfig1 = function(){
        const config1 = {
            type : 'line',
            data : {
                labels: ['-6 h', '-5 h', '-4 h', '-3 h', '-2 h', '-1 h', 'Now'],
                datasets: [
                    {
                        label : `${lang.getMessages('gateMapName')} 1`,
                        backgroundColor : this._inChartColors.red,
                        borderColor : this._inChartColors.red,
                        data: [
                            15,
                            12,
                            10,
                            18,
                            28,
                            35,
                            19
                        ],
                        fill: false,
                    }, {
                        label : `${lang.getMessages('gateMapName')} 2`,
                        fill : false,
                        backgroundColor : this._inChartColors.blue,
                        borderColor : this._inChartColors.blue,
                        data: [
                            24,
                            3,
                            7,
                            12,
                            42,
                            11,
                            8
                        ],
                    }
                ]
            },
            options : {
                responsive: false,
                title: {
                    display: false,
                    text: ''
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: true,
                            labelString: 'time'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }]
                }
            }
        }
        return config1;   
    }
	
	generateData = function(){
		let data = [];
		for ( let i = 0; i < this._dataCount; ++i) {
			data.push({
				x : this._sampleUtils.rand(this.minXy, this.maxXy),
				y : this._sampleUtils.rand(this.minXy, this.maxXy),
				r : this._sampleUtils.rand(5, 20),
				name : "Point 1"
			});
		}
		return data;
	}

	getChartData = function( inChartData ) {	
        const datasets = inChartData.map(item=>{
            return {
                label : lang.getMessages(item.name),
                backgroundColor : this._inChartColors[item.color],
                borderColor : this._inChartColors[item.color],
                data : item.data
            }
        });
        return {datasets};
	}

	getChartOptions = function( inMaxMinObj ){
        const { xMin, xMax, yMin, yMax } = inMaxMinObj;
		return {
			aspectRatio : 1,
			plugins : {
				datalabels : {
					anchor : function (context) {
						var value = context.dataset.data[context.dataIndex];
						return value.x < 1000 ? 'end' : 'center';
					},
					align : function (context) {
						var value = context.dataset.data[context.dataIndex];
						return value.x < 1000 ? 'end' : 'center';
					},
					color : function (context) {
						var value = context.dataset.data[context.dataIndex];
						return value.x < 1000 ? context.dataset.backgroundColor : 'white';
					},
					font : {
						weight: 'bold'
					},
					formatter : function (value, context) {
						return context.dataset.label;
					},
					offset: 2,
					padding: 0
				}
            },
            scales : {
                xAxes : [{
                    ticks: { max: xMax, min: xMin }
                }],
                yAxes : [{ 
                    ticks : { max: yMax, min: yMin }
                }]
            }
        };
	}
}