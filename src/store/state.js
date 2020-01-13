const state = {

    isRuLang : false,
    isLoading : false,

    tokenMap : 'pk.eyJ1IjoicGdvcm9raG92IiwiYSI6ImNqNGZpNmMwejFpYTkycW9hcDVpMGY5eWIifQ.qR43A9Zo6KIuUkeLyqzm2g',
    //styleMap : 'mapbox://styles/mapbox/satellite-v9',     
    styleMap : 'mapbox://styles/mapbox/emerald-v8',     
    сenterMap : [ '49.18539242', '55.76482491' ],  
    zoomMap : 17.5,
    
    dialogActive : false,
    dialogText : '',

    mainMap : null,
    mapObjDraw : null,
    
    gateMap : null, 
    pointMap : null,
    heatMap : null,
    trackMap : null,
    tracksKeysMap : null,
    adsMap : null,

    minLonMap : 49.1833205454042, 
    minLatMap : 55.76437481094737, 
    maxLonMap : 49.18701010868449, 
    maxLatMap : 55.765168571140634,
    
    xMin : -84.5,
    xMax : 7.23,
    yMin : -21,
    yMax : 21,

    bearingDegree : 0,//55,
    lonXInterval : null,
    latYInterval : null,
    relCenterLon : null,
    relCenterLat : null,

    centerX : null,
    centerY : null,
    centerLon : null,
    centerLat : null,

    geoPlanMapShow : true,
    heatMapShow : false,
    trackMapShow : false,
    pointMapShow : false,
    gateMapShow : false,
    adsMapShow : false,
    
    geoObjectArr : [
        { id : 1, type : 'point', name : 'pointMapName' },
        { id : 2, type : 'gate', name : 'gateMapName' },
        { id : 3, type : 'ads', name : 'adsMapName' },
        { id : 4, type : 'terr', name : 'territoryName' },
    ],
    currentGeoObject : 1,

    addressGeoplanFile : require(`../content/images/camera4.png`),

    chartColors : {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    },

    optShowingArr : [
        {
            type : 'reconciliation',
            objectName : 'geoPlanMap',
        },{
            type : 'heat-map',
            objectName : 'heatMap'
        },{
            type : 'user',
            objectName : 'trackMap'
        },{
            type : 'environment',
            objectName : 'pointMap'
        },{
            type : 'bars',
            objectName : 'gateMap'
        },{
            type : 'right-square',
            objectName : 'adsMap'
        }
    ],

    optAddingArr : [
        {
            type : 'environment',
            label : 'pointMapName',
            drawObj : 'draw_circle'
        }, {
            type : 'bars',
            label : 'gateMapName',
            drawObj : 'draw_line_string'
         }, {
            type : 'right-square',
            label : 'adsMapName',
            drawObj : 'draw_line_string'
        }
    ],
};

export default state;