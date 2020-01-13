<template>
    <div class='absolute optionsMapStyle optionsMapPos' >
        <a-menu mode='inline' theme='light' >
            <!-- Панель опций лдя проставления временного и пространственного сдвига -->
            <a-sub-menu >
                <span slot="title">
                    <a-icon type="clock-circle" class='' /> 
                    <span class='optionSpan' >{{$lang.messages.updateObjects}}</span>
                </span>
                <a-menu-item>
                    <table class='fullSize' >
                        <tr>
                            <td width='20%' >
                                <a-icon type='pic-left' />
                            </td>
                            <td align='left' >
                                <span>{{$lang.messages.territoryName}}</span>
                            </td>
                            <td align='right' >
                                <a-button class='buttSettings' icon="plus-square" @click="setNewDrawElem('draw_square', 4)" />
                            </td>
                        </tr>
                    </table>
                </a-menu-item>
                <a-sub-menu class='subMenuUp'  mode='vertical' :title='$lang.messages.selectDateTimeText' >
                    <a-menu-item>
                        {{$lang.messages.selectDateText}} : 
                        <a-date-picker class='antdDatePicker' v-model='datePicker' @change='setChangeDatePicker' />
                    </a-menu-item>
                    <a-menu-item>
                        <table class='fullSize' >
                            <tr>
                                <td width='15%' > 
                                    {{$lang.messages.selectTimeText}} : 
                                </td>
                                <td align='left' > 
                                    <a-slider range :step='1' :max='24' v-model='timePicker' @afterChange='setAfterChangeSlider' /> 
                                </td>
                            </tr>
                        </table>
                    </a-menu-item>
                    <a-menu-item>
                        <table class='fullSize' >
                            <tr>
                                <td width='15%' > 
                                    {{$lang.messages.allTerritory}} : 
                                </td>
                                <td align='right' class='switchAllTerritory' > 
                                    <a-switch :checked='isAllTerritory' @change='setAllTerritory'
                                    /> 
                                </td>
                            </tr>
                        </table>
                    </a-menu-item>
                    <a-menu-item class='buttonsOfDate' >
                        <a-button @click='setClearFormUpdate' >{{$lang.messages.clearText}}</a-button>
                        <a-button @click='setUpdateObjects' >{{$lang.messages.updateText}}</a-button>
                    </a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
            <!-- Создание новых объектов -->
            <a-sub-menu mode='' >
                <span slot="title">
                    <a-icon type="setting" /> 
                    <span class='optionSpan' >{{$lang.messages.addObjects}}</span>
                </span>
                <a-menu-item v-for='(item, index) in getOptionsModeMap.optAddingArr' :key='index' >
                    <table class='fullSize' >
                        <tr>
                            <td width='20%' >
                                <a-icon :type='item.type' />
                            </td>
                            <td align='left' >
                                <span>{{$lang.messages[item.label]}}</span>
                            </td>
                            <td align='right' >
                                <a-button class='buttSettings' icon="plus-square" @click="setNewDrawElem(item.drawObj, index+1)" />
                            </td>
                        </tr>
                    </table>
                </a-menu-item>
            </a-sub-menu>
            <!-- Отображение объектов -->
            <a-sub-menu mode='vertical' >
                <span slot="title">
                    <a-icon type="picture" class="vericalMenuIcon" /> 
                    <span class='optionSpan' >{{$lang.messages.showingObjects}}</span>
                </span>
                <a-menu-item v-for='(item, index) in getOptionsModeMap.optShowingArr' :key='index' >
                    <table class='fullSize' style='text-align:left' border='0' >
                        <tr>
                            <td width='20%' >
                                <a-icon :type='item.type' />
                            </td>
                            <td align='left' >
                                <span >{{$lang.messages[`${item.objectName}Name`]}}</span>
                            </td>
                            <td align='right' >
                                <a-switch
                                    :checked='getShowModel(`${item.objectName}Show`)'
                                    @change='setChangeModeDrawing({nameOfObject : item.objectName, сhangedValue : null })'
                                /> 
                            </td>
                        </tr>
                    </table>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script >
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import setDateMoment from 'moment'
    import extension from '../../utils/Extension'
    import uuid from 'uuid'

    export default {
        data :()=>({
            timePicker : [0,24],
            datePicker : null,
            isAllTerritory : false,
            dateFormat : 'YYYY-MM-DD',
        }),
        computed : {
            ...mapGetters(['getMapBox', 'getIsLoading', 'getCenterInterval', 'getShowOptions', 'getOptionsModeMap', 'getMaxMinLatLon' ]),
        },
        created() {
            //Проверяем, есть ли данные и грузим их из сервера, если нет
            this.setUpdateAreaData({
                inTimeTerritoryData : null, 
                callBack : ()=>this.setConstrucOptionForm()
            });
        },
        methods: {
            ...mapActions( [ 'setUpdateAreaData', 'setAddObjToMap', 'setDeleteFromMap', 'setResetMbDraw', 'setChangeModeDrawing', 'setChangeMapCursor' ] ),
            ...mapMutations(['setCurrentMapValue']),
            setDateMoment,
            setConstrucOptionForm(){
                this.setResetMbDraw();
                //Рисуем те объекты, у которых проставлен положительно коэффициент отображения
                this.getOptionsModeMap.optShowingArr.forEach( item=> {
                    const shortName = item.objectName;
                    const showingName = `${shortName}Show`;
                    this.setDeleteFromMap(shortName);
                    if( this.getShowOptions[showingName] ){
                        this.setAddObjToMap(shortName);
                    }
                });
            },
            //Ползунок видимости
            getShowModel(showObjName){
                return this.getShowOptions[showObjName];
            },
            //Добавление нового объекта
            setNewDrawElem( drawName, indexOfCurrentObject ) {
                this.setChangeMapCursor(true);
                this.setResetMbDraw();
                const drawOptions = drawName === 'draw_circle' ? { initialRadiusInKm : 0.005 } : {};
                this.getMapBox.mapObjDraw.changeMode(drawName, drawOptions);
                this.setCurrentMapValue( { field : 'currentGeoObject', value : indexOfCurrentObject });
            }, 
            //Выделяем или скрываем всю территорию
            setAllTerritory(){
                const coordByAllTerr = extension.getAllMaxMinCoordForDraw( this.getMaxMinLatLon, true );
                this.isAllTerritory = !this.isAllTerritory;
                this.setResetMbDraw();
                if( this.isAllTerritory ) {
                    const obj = {
                        geometry : {
                            coordinates : [coordByAllTerr],
                            type: 'Polygon'
                        },
                        id : uuid.v1(),
                        properties : {},
                        type : 'Feature'
                    }
                    const objArr = [obj];
                    this.getMapBox.mapObjDraw.add({
                        type : 'FeatureCollection',
                        features : objArr
                    });
                }
            },
            //Обновление базы объектов
            setUpdateObjects(){
                const global = this;
                this.$confirm(
                    {
                    zIndex : 1100,
                    title : this.$lang.messages.isSureUpdate,
                    onOk() {
                        let errorTerritory = false;
                        const drawElem = extension.getSelectDraw(global.getMapBox.mapObjDraw);
                        const timeIntervalArr = global.timePicker.map(item=> +`${item}00` );
                        const [startTime, endTime] = timeIntervalArr;

                        if( !drawElem ) {
                            errorTerritory = true;
                        } else if ( drawElem.properties.isCircle ) {
                            errorTerritory = true;
                        }
                        
                        if(errorTerritory) {
                            global.$message.error(global.$lang.messages.territoryError);
                            return;
                        }

                        const coordinates = drawElem.geometry.coordinates[0];
                        const xyCoord = coordinates.map(item=>extension.getModifyCoordToXy(item, global.getCenterInterval));
                        const extrCoord = extension.getMaxMinFromCoord(xyCoord);

                        const upData = {
                            inTimeTerritoryData : {
                                area : {
                                    x1 : extrCoord.xMin,
                                    y1 : extrCoord.yMin,
                                    x2 : extrCoord.xMax,
                                    y2 : extrCoord.yMax
                                },
                                time : {
                                    from : startTime,
                                    to : endTime
                                }   
                            },
                            callBack : ()=>global.setConstrucOptionForm()
                        };

                        global.setUpdateAreaData(upData);
                    },
                    cancelText : this.$lang.messages.cancel,
                });
            },
            //Чистим форму обновления 
            setClearFormUpdate(){
                this.isAllTerritory = false;
                this.setAfterChangeSlider([0,24]);
                this.datePicker = undefined;
            },
            //Обновляем слайдер
            setAfterChangeSlider(value){
                this.timePicker = value;
            },  
            //Обновляем календарь
            setChangeDatePicker(date, dateString) {
                this.datePicker = dateString ? setDateMoment(dateString, this.dateFormat) : undefined;
            },
        },
    };
</script>
<style lang='scss' >
    @import "../../content/style/mainStyle.scss";
    .optionsMapPos {
        top : 10.5vh;
        left : 8.3vh;
    }
    .optionSpan {
        padding : 0 15px 0 0;
    }
    .optionsMapStyle .ant-menu-item:hover, .ant-menu-sub:hover, .ant-menu-item-active:hover {
        @include shadow();
    }
    .optionsMapStyle {
        text-align : left;
    }
    .optionsMapStyle .ant-btn {
        height : 32px;
        --padding : 0 32px;
    }
    .optionsMapStyle .ant-menu {
        padding : 0;
    }
    .vericalMenuIcon {
        padding: 0 0 0 8px;
    }
    .buttonsOfDate>button {
        padding : 0 40px;
    }
    .antdDatePicker {
        width : 65%;
    }
    .subMenuUp {
        padding : 0 0 0 71px;
    }
    .switchAllTerritory {
        padding : 0 5px 0 0;
    }
</style>