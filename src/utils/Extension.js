import lang from '../language/Translate'
export default class Extension {
    //Видоизменяем локальные координаты в коллекциях состояния, приводя их к глобальным (lon, lat)
    static getModifyCoordInArr = ( inObjArr, inGlobalCoord, inNumOfMen ) => {
        const { relCenterLon, relCenterLat, lonXInterval, latYInterval } = inGlobalCoord;
        return inObjArr.map( item=> { 
            let finalObj = {};
            const propertiesItemArr = Object.keys(item);
            propertiesItemArr.forEach( elem=> {
                 //Проставляем координаты, [ x,y,x1,y1... ]
                if( elem.indexOf('x') !== -1 && elem.indexOf('max') === -1 ) {
                    finalObj[elem] = relCenterLon + item[elem]*lonXInterval;
                } else if ( elem.indexOf('y') !== -1 ) {
                    finalObj[elem] = relCenterLat + item[elem]*latYInterval;
                } else {
                    finalObj[elem] = item[elem];
                }
            }); 
            if( inNumOfMen ){
                finalObj.man = inNumOfMen;
            }
            return finalObj;
        });
    }
    //Преобразование координат lon/lat => x/y
    static getModifyCoordToXy( inLngLatArr, inCenterInterval ) {

        if( !inLngLatArr || inLngLatArr.length === 0 || !inCenterInterval ) return;
        const { lonXInterval, latYInterval, relCenterLon, relCenterLat } = inCenterInterval;
                
        if( !lonXInterval ) return;
                
        let x = (inLngLatArr[0] - relCenterLon)/lonXInterval;
        let y = (inLngLatArr[1] - relCenterLat)/latYInterval;

        return [x,y].map(x=>x.toFixed(2));
    }
    //Формируем информацию для поповера в зависимости от объекта
    static getInfoByObject(inItem, inMameOfLayer) {
        let resInfo = null;
        if( inMameOfLayer === 'pointMap' ){
            resInfo = `${lang.getMessages('countOfPeople')} : ${inItem.count}`;
        } else if ( inMameOfLayer === 'gateMap' ) {
            resInfo = `${lang.getMessages('countOfPeople')}, 
                ${lang.getMessages('left')} : ${inItem.countLeft}
                ${lang.getMessages('right')} : ${inItem.countRight}`;
        } else if ( inMameOfLayer === 'adsMap' ) {
            const numDir = inItem.direction ? 1 : 2;
            resInfo = `${lang.getMessages('countOfPeople')}
                ${lang.getMessages('max')} : ${inItem[`max${numDir}`]}; 
                ${lang.getMessages('min')} : ${inItem[`min${numDir}`]}; 
                ${lang.getMessages('middle')} : ${inItem[`mid${numDir}`]}`;
        }
        return resInfo;
    }
    //Из глобального объекта mapbox-gl-draw тянем текущий выбранный, если есть
    static getSelectDraw( draw, inIsSelected ) {
        let drawItem = null;
        if( inIsSelected ){
            try{
                drawItem = draw.getSelected().features[0];
            } catch { 
                //console.log('not obj');
            }
        } else {
            try {
                const dataDrawFeatures = draw.getAll().features;
                drawItem = dataDrawFeatures[ dataDrawFeatures.length - 1 ];
            } catch { 
                //console.log('not obj');
            }
        }
        return drawItem;
    }
    static getAllMaxMinCoordForDraw( inMaxMinLatLon, isMapboxDraw ){
        const { minLonMap, minLatMap, maxLonMap, maxLatMap } = inMaxMinLatLon; 
        let coordinateFile = [
            [minLonMap, maxLatMap],
            [maxLonMap, maxLatMap],
            [maxLonMap, minLatMap],
            [minLonMap, minLatMap]
        ];
        if( isMapboxDraw ) {
            coordinateFile = [ ...coordinateFile, [minLonMap, maxLatMap] ];
        }
        return coordinateFile;
    }
    static getMaxMinFromCoord(inArr) {
        const xArr = inArr.map(item=>+item[0]);
        const yArr = inArr.map(item=>+item[1]);
        const [xMax, xMin] = [ Math.max(...xArr), Math.min(...xArr) ];
        const [yMax, yMin] = [ Math.max(...yArr), Math.min(...yArr) ];
        return { xMax, xMin, yMax, yMin };
    }
    static getRandomColor = ()=> {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    static getArrForPorpertyOfPoints( step, max, changeCoeff ) {
        let finalArr = [];
        let index = step;
        while( index < max ) {
            finalArr = [ ...finalArr, [ index, index*changeCoeff ] ];
            index += step;
        }
        return finalArr;        
    }
    static getIdAndName(inNameObjMap){
        const nameObjMapArr = inNameObjMap.split('_');
        const [ nameObjMap, idObjOfMap ] = nameObjMapArr.length>1 ? [ nameObjMapArr[0], +nameObjMapArr[1] ] : [ inNameObjMap, null ];
        const objMap = {
            name : nameObjMap,
            id : idObjOfMap
        };
        return objMap;
    }
}