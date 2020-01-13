import api from '../api/apiConfig'
import layer from '../utils/Layer'
import lang from '../language/Translate'
import extension from '../utils/Extension'

const actions = {
    //Обертка над лоадером
    setAxiosWrapper( {commit}, {letUrlAction, goodCallBack, isSuccessNotify, badCallBack} ){
        commit( 'setCurrentMapValue', { field : 'isLoading',  value : true } );
        const global = this;
        letUrlAction.then(
            response => {
                goodCallBack(response);
                if( isSuccessNotify ) {
                    global._vm.$message.success(lang.getMessages('successUpdate'));
                } else {
                    commit( 'setCurrentMapValue', { field : 'isLoading',  value : false } );
                }
            },
            reject => {
                if( badCallBack ) {
                    badCallBack( reject );
                } else {
                    console.log( reject );
                }
                global._vm.$notification.error({
                    message : lang.getMessages('simpleError'),
                    description : reject.message
                });
                commit( 'setCurrentMapValue', { field : 'isLoading',  value : false } );
            }
        );
    },
    //Получаем данные с камеры
    setUpdateAreaData( {commit, dispatch}, inObjForUpArea ) {
        const { inTimeTerritoryData, callBack } = inObjForUpArea || { inTimeTerritoryData : null, callBack : null };
        let areaTimeData = null;
        if( !inTimeTerritoryData ) {
            areaTimeData = {
                area : {
                    x1 : -100,
                    y1 : -100,
                    x2 : 100,
                    y2 : 100
                },
                time : {
                    from : 0,
                    to : 2400
                }
            };
        } else {
            areaTimeData = inTimeTerritoryData
        }
        dispatch( 'setAxiosWrapper', {
            letUrlAction : api.postAreaData(areaTimeData),
            isSuccessNotify : false,
            goodCallBack : response=> {
                commit( 'setInitAreaData', response.data );
                commit( 'setUpAreaCorrd' );
                if( callBack ) callBack();
            }
        });
    },
    //Добавляем новый объект на сервер 
    setAddNewObj( { commit, dispatch }, inNewPointObj ){
        if( !inNewPointObj ) return;
        dispatch( 'setAxiosWrapper', {
            letUrlAction : api.postAddObjToMap( inNewPointObj.objectType, inNewPointObj ),
            isSuccessNotify : true,
            goodCallBack : ()=> {
                const objForUpArea = { 
                    inTimeTerritoryData : null, 
                    callBack :()=> {
                        const {objectType} = inNewPointObj;
                        const newObjName = `${objectType}Map`;
                        dispatch('setChangeModeDrawing', { nameOfObject : newObjName, сhangedValue : true });
                        dispatch('setDeleteFromMap', newObjName );
                        dispatch('setAddObjToMap', newObjName );
                    }
                }
                dispatch('setUpdateAreaData', objForUpArea);
            }    
        });
    },
    //Удаляем объект с сервера
    setDelCurrentObj( { commit, dispatch }, inCurrentObject ) {
        if(!inCurrentObject) return;
        dispatch( 'setAxiosWrapper', {
            letUrlAction : api.deleteObjFromMap(`${inCurrentObject.objectType}_edit`, inCurrentObject),
            isSuccessNotify : false,
            goodCallBack : ()=> {
                dispatch('setUpdateAreaData');
                const [typeObj, idObj] = [inCurrentObject.objectType, inCurrentObject.id];
                let nameObjArr = [`${typeObj}Map_${idObj}`];
                if( typeObj === 'ads' ){
                    nameObjArr = [ ...nameObjArr, `${typeObj}Map_${idObj}_${idObj}` ]; 
                }
                nameObjArr.forEach(item=> dispatch('setDeleteFromMap', item) );
            }
        });
    },
    //Выгружаем отчеты
    getPointReport({state, dispatch}, nameObj){
        const get_xls = {};
        const nameForTypeApi = `${nameObj}s`; 
        const nameForQuery = `${nameObj}_ids`;
        const nameForArr = `${nameObj}Map`;
        const idArrForReport = state[nameForArr] ? state[nameForArr].map(item=>item.id) : [];        
        
        get_xls[nameForQuery] = idArrForReport;
        const bodyPointReport = {
            get_xls,
            time : {
                from : '0',
                to : '2400'
            } 
        };

        dispatch( 'setAxiosWrapper', {
            letUrlAction : api.postCreateReport(nameForTypeApi, bodyPointReport),
            isSuccessNotify : false,
            goodCallBack : response=> {
                api.getResultReport(nameForTypeApi);
            }
        });
    },
    //Смена видимости объектов
    setChangeModeDrawing( {state, commit, dispatch}, { nameOfObject, сhangedValue } ) {
        const nameOfIsShowingMode = `${nameOfObject}Show`;
        const newShowingValue = typeof(сhangedValue) !== 'boolean' ? !state[nameOfIsShowingMode] : сhangedValue;

        commit('setCurrentMapValue', { field : nameOfIsShowingMode, value : newShowingValue } );
        
        if ( newShowingValue ){
            dispatch('setAddObjToMap', nameOfObject );
        } else {
            dispatch('setDeleteFromMap', nameOfObject );
        } 
    },
    //Рисование объектов на карте
    setAddObjToMap( {state}, inNameObjMap ) {

        const { name, id } = extension.getIdAndName(inNameObjMap);
        const [ nameObjMap, idObjOfMap ] = [ name, id ];

        if ( nameObjMap === 'trackMap' ) {
            for( let item of state.trackMap ) {
                if( item.length > 0 ) {
                    layer.setAddPointsOfHeatMap( state.mainMap, item, nameObjMap + item[0].man );
                }
            }
        } else if ( nameObjMap === 'gateMap' || nameObjMap === 'adsMap' ) {
            let objArr = ( nameObjMap === 'gateMap' ) ? state.gateMap : state.adsMap;
            objArr = idObjOfMap ? objArr.filter(item=>item.id === idObjOfMap) : objArr;
            layer.setAddLinesOfgateMap( state.mainMap, objArr, nameObjMap );
        } else if ( nameObjMap === 'heatMap' || nameObjMap === 'trackMap' || nameObjMap === 'pointMap' ) {
            const pointsDataArr = ( nameObjMap === 'heatMap' ) ? state.heatMap : state.pointMap; 
            layer.setAddPointsOfHeatMap( state.mainMap, pointsDataArr, nameObjMap );
        } else {
            const { minLonMap, minLatMap, maxLonMap, maxLatMap } = state;
            const addressFile = state.addressGeoplanFile;
            layer.setAddImageObj( state.mainMap, { minLonMap, minLatMap, maxLonMap, maxLatMap }, addressFile, inNameObjMap );
        }
    },
    //Стираем объекты с карты
    setDeleteFromMap( {state, dispatch}, objMapName ) {
        const {name, id} = extension.getIdAndName(objMapName);
        if(id){
            if( name === 'pointMap' ){
                layer.setEditObjOfMap(state.mainMap, name, id);
            } else {
                layer.setDeleteObjOfMap(state.mainMap, objMapName);
            }
        } else {
            layer.setDeleteObjOfMap(state.mainMap, objMapName);
        }
    },
    //Перезагрузка моудля добавления геометрических объектов
    setResetMbDraw({state}){
        try{
           state.mainMap.removeControl(state.mapObjDraw);
        } catch(error) {
           console.log(error);
        }
        state.mainMap.addControl(state.mapObjDraw);
        state.mapObjDraw.changeMode('simple_select');
        //костыль, но иначе не получается полностью закрыть поповер :\
        document.querySelectorAll('.mapboxgl-popup').forEach(item=>item.style.display='none');
    },
    setChangeMapCursor( {state}, isCross ){
        state.mainMap.getCanvas().style.cursor = isCross ? 'crosshair' : '';
    }
}

export default actions;