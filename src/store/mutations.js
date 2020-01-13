import extension from '../utils/Extension';

const mutations = {
    setCurrentMapValue( state, {field, value} ) {
        state[field] = value;
    },
    setInitAreaData( state, inAreaData ) {
        if( inAreaData ) {
            state.heatMap = Object.values(inAreaData.heat_map);
            state.trackMap = Object.values(inAreaData.tracks).map(item=>Object.values(item));
            state.tracksKeysMap = Object.keys(inAreaData.tracks);
            state.adsMap = inAreaData.ads.map(item=>{
               return {
                    max1 : item.events.max_1,
                    min1 : item.events.min_1,
                    mid1 : item.events.mid_1,
                    max2 : item.events.max_2, 
                    min2 : item.events.min_2, 
                    mid2 : item.events.mid_2,
                    x1 : item.coordinates.x1, 
                    y1 : item.coordinates.y1, 
                    x2 : item.coordinates.x2, 
                    y2 : item.coordinates.y2, 
                    id : item.id,
                    direction : false,
               }
            });
            state.pointMap = inAreaData.points.map( item=>{
                return { 
                    count : item.events, 
                    x : item.coordinates.x, 
                    y : item.coordinates.y, 
                    r : item.coordinates.r, 
                    id : item.id 
                }
            });
            state.gateMap = Object.values(inAreaData.gates).map(item=>{
                return { 
                    countLeft : item.events.left_count, 
                    countRight : item.events.right_count, 
                    x1 : item.coordinates.x1, 
                    y1 : item.coordinates.y1, 
                    x2 : item.coordinates.x2, 
                    y2 : item.coordinates.y2, 
                    id : item.id 
                }
            });
        }
    },
    setRelativeCoordinates( state ) {
        const { minLonMap, minLatMap, maxLonMap, maxLatMap, xMin, xMax, yMin, yMax } = state;
        const dLon = maxLonMap - minLonMap;
        const dLat = maxLatMap - minLatMap;
        const dX = xMax - xMin;
        const dY = yMax - yMin;
        const lonXInterval = dLon/dX;
        const latYInterval = dLat/dY;

        state.centerX = (xMax+xMin)/2;
        state.centerY = (yMax+yMin)/2;
        state.centerLon = (maxLonMap + minLonMap)/2;
        state.centerLat = (maxLatMap + minLatMap)/2;

        state.lonXInterval = lonXInterval;
        state.latYInterval = latYInterval;
        state.relCenterLon = state.centerLon - state.centerX*state.lonXInterval;
        state.relCenterLat = state.centerLat - state.centerY*state.latYInterval;
    },
    setUpAreaCorrd( state ) {
        this.commit('setRelativeCoordinates');
        const localtrackMap = state.trackMap;
        let { relCenterLon, relCenterLat, lonXInterval, latYInterval } = state;
        let [ xShift, yShift ] = [ 0, 0 ];

        //Динамические объекты не сдвигаем
        [ xShift, yShift ] = [-0.1, 0.1];
        relCenterLon = state.centerLon - ( state.centerX + xShift ) * state.lonXInterval;
        relCenterLat = state.centerLat - ( state.centerY + yShift ) * state.latYInterval;
        
        state.pointMap = extension.getModifyCoordInArr( state.pointMap, { relCenterLon, relCenterLat, lonXInterval, latYInterval }, null );
        state.gateMap = extension.getModifyCoordInArr( state.gateMap, { relCenterLon, relCenterLat, lonXInterval, latYInterval }, null );
        state.adsMap = extension.getModifyCoordInArr( state.adsMap, { relCenterLon, relCenterLat, lonXInterval, latYInterval }, null );

        //Для статических объектов используем небольшой сдвиг
        [ xShift, yShift ] = [ -2, -1.5 ];
        relCenterLon = state.centerLon - ( state.centerX + xShift ) * state.lonXInterval;
        relCenterLat = state.centerLat - ( state.centerY + yShift ) * state.latYInterval;
        
        state.heatMap = extension.getModifyCoordInArr( state.heatMap, { relCenterLon, relCenterLat, lonXInterval, latYInterval }, null );

        let [ numOfMen, index ] = [0, 0];
        state.trackMap = [];
        for( let item of localtrackMap ) {
            numOfMen = state.tracksKeysMap[index];
            let trackInsideArr = [];
            if(item.length > 0) {
                trackInsideArr = extension.getModifyCoordInArr( item, { relCenterLon, relCenterLat, lonXInterval, latYInterval }, numOfMen );
                state.trackMap.push(trackInsideArr);
            }
            index++;
        }
    },
    setDefaultShowingModes(state) {
        state.geoPlanMapShow = true;
        state.heatMapShow = false;
        state.trackMapShow = false;
        state.pointMapShow = false;
        state.gateMapShow = false;
        state.adsMapShow = false;
    }
}

export default mutations;