<template>
    <div class='divMap noselect' >
        <mapbox class='map' v-if='mapToken'
            :access-token = mapToken
            :map-options="{
                center : mapCenter,
                style : mapStyle,
                zoom : mapZoom,
            }"
            :scale-control="{
                show : true,
                position : 'bottom-right',
            }"
            @map-init = 'setMapStart'
            @map-load = 'setMapLoad'
            @map-click = 'setMapClick'
            @map-mousemove = 'setMapMove'
            @map-contextmenu = 'setMapContext'
        />
        <navigationMap v-if='localLatLon' :coordNavigation='coordNavigation' />
        <optionsMap v-if='isLoad' />
    </div>
</template>
<script>
    import Vue from 'vue'
    import { mapActions, mapMutations, mapGetters } from 'vuex'
    import mapbox from 'mapbox-gl-vue'
    import mapboxgl from 'mapbox-gl'
    import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
    import drawStyles from '../../utils/DrawStyles'
    import { CircleMode, DragCircleMode, DirectMode, SimpleSelectMode } from 'mapbox-gl-draw-circle'
    import DrawSquare from 'mapbox-gl-draw-square'
    import navigationMap from './NavigationMap'
    import optionsMap from './OptionsMap'
    import popupContent from './PopupContent'
    import extension from '../../utils/Extension'
    
    export default {
        components : {
            mapbox, navigationMap, optionsMap
        },
        data :()=> ({
            mapMain : null,
            mapStyle : null,
            mapToken : null,
            mapCenter : null,
            mapZoom : null,
            coordNavigation : null,
            isLoad : false,
            popup : null,
            popupContent : null,
            localLatLon : null,
            isClickPopup : false,
        }),
        computed : {
            ...mapGetters([ 'getMapData', 'getMapBox', 'getCenterInterval', 'getDialogData', 'getGeoObjects', 'getAreaInfo' ]),
        },
        created() {   
            this.setDefaultShowingModes();
            this.mapStyle = this.getMapData.styleMap;
            this.mapCenter = this.getMapData.сenterMap;
            this.mapToken = this.getMapData.tokenMap;
            this.mapZoom = this.getMapData.zoomMap;
            this.popup = new mapboxgl.Popup();
            this.popupContent =  Vue.extend(popupContent);
            this.coordNavigation = { xy : '', lonLat : '' };
            this.localLatLon = '';
        },
        methods : {
            ...mapActions([ 'setActionClick', 'setResetMbDraw', 'setAddNewObj', 'setDelCurrentObj', 'setAddObjToMap', 'setDeleteFromMap', 'setChangeMapCursor' ]),
            ...mapMutations([ 'setCurrentMapValue', 'setDefaultShowingModes' ]),
            setMapStart(map) {                
                const global = this;
                global.mapMain = map;
                new Promise(function(resolve, reject) {
                    resolve( new MapboxDraw({
                        defaultMode : "draw_circle",
                        userProperties : true,
                        styles : drawStyles.styleMapBoxDrawList(),
                        modes: { ...MapboxDraw.modes,
                            draw_circle : CircleMode,
                            drag_circle : DragCircleMode,
                            direct_select : DirectMode,
                            simple_select : SimpleSelectMode,
                            draw_square : DrawSquare,
                        }
                    }));
                }).then( result=> {    
                    global.setCurrentMapValue( { field : 'mapObjDraw', value : result });
                    global.setCurrentMapValue( { field : 'mainMap', value : global.mapMain });
                });
            },
            setMapLoad( map ) {
                this.isLoad = true;
                map.setBearing(this.getCenterInterval.bearingDegree);
            },
            setMapMove( inMap, e ) {

                if( !this.isLoad ) return;

                this._setScaleLatLon(e);
                this._setRemovePopUp();

                //Ищем все объекты на карте с префиксом Map, заоднго и возвращаем всю прозрачность обратно
                const styleLayerArr = inMap.getStyle().layers.filter( item => {
                    if( ( item.source || [] ).indexOf('Map') !== -1) {
                        this._setPropertyByTypeObj( inMap, item.source, 1 );
                        return item;
                    }
                });
                
                //Собираем айдишники слоев
                let features = [];
                styleLayerArr.forEach( item=> {
                    const localFeatures = inMap.queryRenderedFeatures( e.point, { layers : [item.id] });
                    if( localFeatures.length ) {
                        features = [ ...features, localFeatures ];
                    }
                });                

                //Смотрим на айдишники и в зависимости от типа выводим поповер или просто затемняем
                if( features.length > 0 ) {
                    const feature = features[0][0];
                    inMap.getCanvas().style.cursor = (features.length) ? 'pointer' : '';    
                    if( feature.source === 'heatMap' ) return;   
                    styleLayerArr.forEach( x=> {
                        if( x.id !== feature.source ) {
                            this._setPropertyByTypeObj( inMap, x.source, 0.05 );
                        } else {
                            this._setAddPopUp( inMap, feature, feature.properties.info, null );
                            this.isClickPopup = ( feature.source !== 'pointMap' && feature.source.indexOf('trackMap') === -1  );
                        }
                    });
                }
            },
            setMapClick(map, e){
                //Текущий активный объект
                const selDrowItem = extension.getSelectDraw(this.getMapBox.mapObjDraw, true);
                //Последний объект, что в имеющийся коллекции 
                const lastDrawItem = extension.getSelectDraw(this.getMapBox.mapObjDraw, false);

                if( !lastDrawItem ) return;

                //Останавливаем стролительство линии после 2х точек
                if ( lastDrawItem.geometry.coordinates.length >= 3 ) {
                    this.getMapBox.mapObjDraw.changeMode('simple_select');
                }

                if( selDrowItem ) {
                    const { geoObjectArr, currentGeoObject } = this.getGeoObjects;
                    const geoObj = geoObjectArr.find(item=>item.id === currentGeoObject);
                    const [ nameGeoObj, typeGeoObj ] = geoObj ? [ geoObj.name, geoObj.type ] : ['pointMapName', 'point'];
                    this.isClickPopup = true;
                    this._setAddPopUp( map, selDrowItem, this.$lang.messages[nameGeoObj], typeGeoObj ); 
                    if( selDrowItem.properties.isCircle ){
                        this.setChangeMapCursor(false);
                    }

                } else {
                    this.setChangeMapCursor(false);
                }
            },
            setMapContext(inMap) {
                this.setChangeMapCursor(false);
            },
            //Приватные методы
            //Добавление и удаление попвера соответственно
            _setAddPopUp( inMap, inFeature, inText, inType ) {
                
                let coordinates = [];
                const geometryType = inFeature.geometry.type;
                
                if( geometryType === 'Polygon' ) {
                    coordinates = inFeature.geometry.coordinates[0][0];
                } else {
                    coordinates = inFeature.geometry.type === 'Point' ?
                    inFeature.geometry.coordinates :
                    inFeature.geometry.coordinates[0];
                }

                this.popup
                    .setLngLat( coordinates )
                    .setHTML('<div id="vuePopupContent"></div>')
                    .addTo(inMap);

                new this.popupContent({
                    propsData : {
                        typeDraw : inType,
                        feature : inFeature,
                        popInfo : inText,
                        lang : this.$lang,
                        getCenterInterval : this.getCenterInterval,
                        getAreaInfo : this.getAreaInfo,
                        actions : {
                            setResetMbDraw : this.setResetMbDraw,
                            setAddNewObj : this.setAddNewObj,
                            setDelCurrentObj : this.setDelCurrentObj,
                            setAddObjToMap : this.setAddObjToMap, 
                            setDeleteFromMap : this.setDeleteFromMap,
                            setCurrentMapValue : this.setCurrentMapValue
                        }
                    }
                }).$mount('#vuePopupContent');
            },
            _setRemovePopUp() {
                if( !this.isClickPopup ) this.popup.remove();
            },
            //Формирование координат
            _setScaleLatLon(e) {
                this.localLatLon = `${e.lngLat.lng.toFixed(10)} ${e.lngLat.lat.toFixed(10)}`;
                this.coordNavigation.lonLat = this.localLatLon;
                const arrXyCoord = extension.getModifyCoordToXy( [e.lngLat.lng, e.lngLat.lat], this.getCenterInterval );
                if(!arrXyCoord) return;
                this.coordNavigation.xy = `${arrXyCoord[0]} ${arrXyCoord[1]}`;
            },
            //Проставление прозрачности
            _setPropertyByTypeObj( inMap, inSource, inValue ) {
                if( inSource === 'geoPlanMap' || inSource === 'heatMap' ) return;
                let typeOpacityByObjName = 'line-opacity';
                if( inSource.indexOf('gateMap') === -1 && inSource.indexOf('adsMap') === -1 ) {
                    typeOpacityByObjName = 'circle-opacity';
                }
                if( inSource === 'pointMap' ) {
                    const strokeOpacityValue = ( inValue === 1 ) ? inValue/10 : inValue;
                    inMap.setPaintProperty( inSource, 'circle-stroke-opacity', strokeOpacityValue );
                }
                inMap.setPaintProperty( inSource, typeOpacityByObjName, inValue );
            }
        }
    }
</script>
<style lang='scss'>
    @import "../../content/style/mainStyle.scss";
    .divMap { 
        overflow : hidden;
    }
    .map {
        display : flex;
        overflow : hidden;
        min-height : $contentHeight;
    }
    a.mapboxgl-ctrl-logo, .mapboxgl-ctrl.mapboxgl-ctrl-attrib.mapboxgl-compact, .mapboxgl-ctrl-top-right .mapboxgl-ctrl {
        display : none;
    }
    .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {
        margin: 0 0 5px 10px;
    }
</style>