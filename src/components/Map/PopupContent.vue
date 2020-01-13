<template>
  <table class='tblPopClass fullSize' >
    <tr>
      <td v-if='!isTrack'>
        <a-button theme='twoTone' icon='delete' :title='lang.messages.delete' @click='setDelete' />
      </td>
      <td class='popInfoClass' align='center' >
        {{popInfo}}
      </td>
      <td v-if='isAds && directionAds' >
        <a-button theme='twoTone' icon='caret-right' :title='lang.messages.save' @click='setChangeDirAds' />
      </td>
      <td v-if='isAds && !directionAds' >
        <a-button theme='twoTone' icon='caret-left' :title='lang.messages.save' @click='setChangeDirAds' />
      </td>
      <td v-if='typeDraw && !isTerr' >
        <a-button theme='twoTone' icon='save' :title='lang.messages.save' @click='setSave' />
      </td>
    </tr>
  </table>
</template>
<script>
  import extension from '../../utils/Extension'
  export default {
    name : 'PopupContent',
    props : [ 'feature', 'popInfo', 'lang', 'actions', 'getCenterInterval', 'typeDraw', 'getAreaInfo' ],
    data : ()=>({
      visible : true,
      currentObj : null,
      directionAds : null,
      isAds : false,
      isTrack : false,
      isTerr : false,
      adsMap : [],
    }),
    created(){
      this.currentObj = this.getTypeObjByFeature();
      this.adsMap = this.getAreaInfo.adsMap;
    },
    methods : {
      setConfirm( inTitleText, inActionFunc ){
        this.$confirm({
          title : inTitleText,
          onOk() {
            inActionFunc()
          },
          cancelText : this.lang.messages.cancel,
        });
      },
      setDelete(){
        const global = this;
        this.setConfirm(
          this.lang.messages.isSureDelete,
          ()=>{
            global.actions.setResetMbDraw();
            if( global.typeDraw ) 
              return;
            const typeName = global.getTypeObjByFeature();
            const objDel = { 
              objectType : typeName,
              action : 'delete',
              id : global.feature.properties.id
            };     
            global.actions.setDelCurrentObj(objDel)
          }
        )
      },
      setSave(){
        const global = this;
        this.setConfirm(
          this.lang.messages.isSureSave,
          ()=>{
            const objForSave = global.getObjForSaveByType();
            global.actions.setAddNewObj(objForSave);
            global.actions.setResetMbDraw();
          }
        )
      },
      setChangeDirAds(){

        this.directionAds = !this.directionAds;
        const idOfLayer = this.feature.properties.id;
        const nameOfLayers = `adsMap_${idOfLayer}`;

        const indexOfAds = this.adsMap.findIndex( item=> item.id === idOfLayer );
        const currentAds = this.adsMap[indexOfAds];

        if( currentAds ){
          currentAds.direction = this.directionAds;
          const newInfo = extension.getInfoByObject(currentAds, 'adsMap');
          this.popInfo = newInfo;

          this.adsMap[indexOfAds] = currentAds;
          currentAds.direction = this.directionAds;
          this.adsMap[indexOfAds] = currentAds;
          this.actions.setCurrentMapValue({
            field : 'adsMap',
            value : this.adsMap
          });
          this.actions.setDeleteFromMap(nameOfLayers);
          this.actions.setAddObjToMap(nameOfLayers);
        }
      },
      getTypeObjByFeature(){
        let typeObj = 'gate';
        if( typeof(this.feature.properties.radius) !== 'undefined' ){
          typeObj = 'point';
        } else if ( typeof(this.feature.properties.direction) !== 'undefined' ){
          typeObj = 'ads';
          this.directionAds = this.feature.properties.direction;
          this.isAds = true;
        } else if( typeof(this.feature.properties.id) === 'undefined' && typeof(this.feature.properties.info) !== 'undefined'  ){
          typeObj = 'track';
          this.isTrack = true;
        }
        this.isTerr = this.typeDraw ? (this.typeDraw==='terr') : false;
        return typeObj;
      },
      getObjForSaveByType(){
        if( !this.typeDraw ) return;
        const finalCoordinates = this.typeDraw === 'point' ? this.getPointCoord() : this.getGateAndAdsCoord();
        const finalObj = {
          objectType : this.typeDraw,
          coordinates : finalCoordinates
        }
        return finalObj;
      },
      getGateAndAdsCoord(){
        const { coordinates } = this.feature.geometry;
        const xyCoord = coordinates.map( item=>extension.getModifyCoordToXy(item, this.getCenterInterval));
        return {
          x1 : xyCoord[0][0],
          y1 : xyCoord[0][1],
          x2 : xyCoord[1][0],
          y2 : xyCoord[1][1],
        }
      },
      getPointCoord(){
        const { center, radiusInKm } = this.feature.properties;
        const centerXy = extension.getModifyCoordToXy(center, this.getCenterInterval)
        const radiusInM = radiusInKm*1000;
        return {
          x : centerXy[0],
          y : centerXy[1],
          r : radiusInM
        }
      } 
    }
  }
</script>
<style lang="scss">
  .mapboxgl-popup-content {
    position : relative;
    background : #fff;
    border-radius : 3px;
    box-shadow : 0 1px 2px rgba(0, 0, 0, 0.1);
    padding : 5px 10px;
    pointer-events : auto;
  }
  .tblPopClass {
    font-size: 11px;
  }
  .tblPopClass .ant-btn {
    padding : 0 8px;
    margin : 0 10px 0 0;
  }
  .popInfoClass{
    padding: 0 5px;
  }
</style>