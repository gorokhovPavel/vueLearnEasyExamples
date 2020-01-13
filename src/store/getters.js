const getters = {
    getRuLang : state=> state.isRuLang,
    getIsLoading : state=>state.isLoading,
    getMapData : state=> { 
        return {
            tokenMap : state.tokenMap, 
            styleMap : state.styleMap, 
            сenterMap : state.сenterMap,
            zoomMap : state.zoomMap
        }
    },
    getMapBox : state=> {
        return {
            mainMap : state.mainMap,
            mapObjDraw : state.mapObjDraw
        }
    },
    getAreaInfo : state=> {
        return {
            gateMap : state.gateMap, 
            pointMap : state.pointMap,
            heatMap : state.heatMap,
            trackMap : state.trackMap,
            adsMap : state.adsMap
        }
    },
    getChartColors : state => state.chartColors,
    getGeoPoints : state=> {
        return {
            firGeoPoint : state.firGeoPoint,
            secGeoPoint : state.secGeoPoint,
            thirGeoPoint : state.thirGeoPoint,
            fourGeoPoint : state.fourGeoPoint,
        }
    },
    getCenterInterval : state=> {
        return {
            bearingDegree : state.bearingDegree,
            lonXInterval : state.lonXInterval,
            latYInterval : state.latYInterval,
            relCenterLon : state.relCenterLon,
            relCenterLat : state.relCenterLat,
        }
    },
    getDialogData : state=> {
        const {dialogActive, dialogText} = state;
        return {dialogActive, dialogText};
    },
    getGeoObjects : state=> {
        const { geoObjectArr, currentGeoObject } = state;
        return { geoObjectArr, currentGeoObject };
    },
    getShowOptions : state => {
        const { geoPlanMapShow, heatMapShow, trackMapShow, pointMapShow, gateMapShow, adsMapShow } = state;
        return { geoPlanMapShow, heatMapShow, trackMapShow, pointMapShow, gateMapShow, adsMapShow };
    },
    getOptionsModeMap : state=>{
        const { optShowingArr, optAddingArr } = state;
        return { optShowingArr, optAddingArr };
    },
    getGeoPlanMapFile : state=>state.addressGeoplanFile,
    getMaxMinTerritory : state=>{
        const { xMin, xMax, yMin, yMax } = state;
        return { xMin, xMax, yMin, yMax };
    },
    getCameraImgFile : state => id => 
        id ? require(`../content/images/${id}img.jpg`) : require(`../content/images/defimg.jpg`),

    getCameraGifFile : state => id => {
        let srcGif = '';
        try {
            srcGif = require(`../content/videos/${id}.gif`);
        } catch( error ){
            console.log(error);
            srcGif = require(`../content/images/test.gif`)
        }
        return srcGif;
    },

    getMaxMinLatLon : state => {
        const { minLonMap, minLatMap, maxLonMap, maxLatMap } = state; 
        return { minLonMap, minLatMap, maxLonMap, maxLatMap };
    }
}

export default getters;