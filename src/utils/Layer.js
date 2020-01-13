import extension from '../utils/Extension'

export default class Layer {
    //Отображаем геоплан на карте
    static setAddImageObj( inMapObj, inMaxMinLatLonObj, inAddressFile, inObjName ) { 
        const coordinateFile = extension.getAllMaxMinCoordForDraw( inMaxMinLatLonObj, false );
        inMapObj.addLayer({
            id : inObjName,
            type : 'raster',
            source : {
                type : 'image',
                url : inAddressFile,
                coordinates : coordinateFile
            },
            paint : {
                'raster-opacity' : 1
            },
        });
    }
    //Добавляем стандартные точки
    static async setAddPointsOfHeatMap( inMapObj, inData, nameOflayer ) {

        let colorRgb = extension.getRandomColor();
        let colorRadius = 2;
        let colorOpacity = 1;
        let circleStrokeWidth = 10;
        let circleStrokeOpacity = 0;
        let idOfTrack = 0;

        //Все зависит от того, что рисуем : тепловую карту, шаги или точки
        if ( nameOflayer === 'heatMap' ) {
            const radiusArr = extension.getArrForPorpertyOfPoints(6, 200, 0.2);
            colorRgb = {
                property : 'color',
                stops : [
                    [0, '#ffcc99'],
                    [1, '#ffb266'],
                    [2, '#ff9933'],
                    [3, '#ff8000'],
                    [4, '#cc6600'],
                    [5, '#994c00'],
                    [6, '#663300'],
                ]
            };
            colorRadius = {
                property : 'radius',
                stops : radiusArr
            }
            colorOpacity = 1;

        } else if ( nameOflayer === 'pointMap' ) {
            const radiusArr = extension.getArrForPorpertyOfPoints(0.5, 50, 8);
            colorRgb = '#00338d';
            colorRadius = 7;
            circleStrokeOpacity = 0.2;
            circleStrokeWidth = {
                property : 'strokeRadius',
                stops : radiusArr
            };  
        } else {
            idOfTrack = +nameOflayer.split('trackMap')[1];
        }

        const gjPoint = {
            type : "FeatureCollection",
            features : []
        }

        inMapObj.addSource(nameOflayer, {
            type : 'geojson',
            data : gjPoint
        });
    
        for ( let i = 0; i < inData.length; i++ ) {

            gjPoint.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [inData[i].x.toString(), inData[i].y.toString()]
                },
                properties : {
                    id : inData[i].id,
                    color : Math.floor(inData[i].count/200),
                    radius : inData[i].count,
                    strokeRadius : inData[i].r,
                    info : ( nameOflayer.indexOf('trackMap') === -1 ) ? extension.getInfoByObject(inData[i], nameOflayer) : idOfTrack
                }
          });
        }
    
        inMapObj.getSource(nameOflayer).setData(gjPoint);
        inMapObj.addLayer({
            id : nameOflayer,
            source : nameOflayer,
            type : 'circle',
            paint : {
                'circle-stroke-color' : '#000',
                'circle-stroke-opacity' : circleStrokeOpacity,
                'circle-stroke-width' : circleStrokeWidth,
                'circle-color' : colorRgb,
                'circle-opacity' : colorOpacity,
                'circle-radius' : colorRadius,
            }
        });
    }
    static setAddLinesOfgateMap( inMapObj, inData, nameOflayer ) {
        inData.forEach( item=> {
            const {x1,x2,y1,y2} = item;
            const coordinates = [[x1,y1],[x2,y2]];
            const isAds = ( nameOflayer === 'adsMap' );
            let infoObj = '';
            let propObj = null;

            //Рисуем штрихи у рекламных щитов 
            if( isAds ){
                infoObj = extension.getInfoByObject( item, nameOflayer );
                propObj = { info : infoObj, direction : item.direction };
                this._setCreateLine( inMapObj, isAds, nameOflayer, item.id, coordinates, propObj, item.direction );
            } else {
                infoObj = extension.getInfoByObject( item, nameOflayer );
                propObj = { info : infoObj };
            }

            //Рисуем полную линию у всех
            this._setCreateLine( inMapObj, isAds, nameOflayer, item.id, coordinates, propObj, null );
        });
    }

    static _setCreateLine( inObjMap, inIsAds, nameObj, idObj, coordObj, inPropObj, isForwardDir ) {
        
        let [ lineWidth, lineOffset, lineDasharray, nameLayer, lineColor ] = [ 0, 0, 0, '' ];
        inPropObj = { ...inPropObj, id : idObj };
        lineColor = '#00338d';

        if( typeof(isForwardDir) !== 'boolean' ) {
            lineWidth = 5;
            lineOffset = 0;
            lineDasharray = [5,0];
            nameLayer = `${nameObj}_${idObj}`;
            lineColor = inIsAds ? lineColor : '#ff1493'; 
        } else {
            lineWidth = 2;
            lineOffset = isForwardDir ? 5 : -5;
            lineDasharray = [2,2];
            nameLayer =  `${nameObj}_${idObj}_${idObj}`;
        }

        inObjMap.addLayer({
            id : nameLayer,
            type : "line",
            source : {
                type : "geojson",
                data : {
                    type : "Feature",
                    properties : inPropObj,
                    geometry : {
                        type : "LineString",
                        coordinates : coordObj
                    }
                }
            },
            layout : {
                'line-cap' : 'butt',
            },
            paint : {
                'line-color' : lineColor,
                'line-width' : lineWidth,
                'line-offset' : lineOffset,
                'line-dasharray' : lineDasharray
            }
        });
    }
    //Мутируем объект на карте
    static setEditObjOfMap(inMapObj, name, id){

        const mapSources = inMapObj.getStyle().sources;
        const objLayer = inMapObj.getStyle().layers.find(x => {
            return (x.source || []).indexOf(name) !== -1;
        });

        const mapFeatuBySource = mapSources[name].data.features;
        const featureIndex = mapFeatuBySource.findIndex(item => item.properties.id === id);

        mapFeatuBySource.splice(featureIndex, 1);
        mapSources[name].data.features = mapFeatuBySource;
        objLayer['source'] = mapSources[name];

        inMapObj.removeLayer(name);
        inMapObj.removeSource(name);
        inMapObj.addLayer(objLayer);
    }
    //Удаляем объект с карты по его названию
    static setDeleteObjOfMap( inMapObj, inObjMapName ) {
        //Находим все слои, что означают точки
        const circleLayerArr = inMapObj.getStyle().layers.filter(x => {
            return (x.source || []).indexOf(inObjMapName) !== -1;
        });
        //Удаляем все эти точки
        circleLayerArr.forEach(x => {  
            inMapObj.removeLayer(x.id);
            inMapObj.removeSource(x.source);
        });
    }
}