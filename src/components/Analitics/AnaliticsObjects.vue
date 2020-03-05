<template>
    <div class='flexContainerAdp ordinarContainerAdp' >
		<floors class='flexItemAdp' />
		<a-collapse class='fullSize flexItemAdp ordinarItemMarAdp' v-if='pointMapData' >
			<a-collapse-panel v-for='(elem, index) in objectArr' :key='index' :header='$lang.messages[`${elem}Name`]' >
				<div v-for='(item, index) in getArrDataForName(elem)' :key='index' >
					<span> {{index+1}} : {{item}} </span>
					<br>
				</div>
			</a-collapse-panel>
		</a-collapse>
	</div>
</template>
<script>
	import {mapGetters, mapActions, mapMutations} from 'vuex'
	import extension from '../../utils/Extension'
	import floors from '../Additional/Floors'
	export default {
		components : { floors },
		data : ()=>({
			objectArr : ['pointMap', 'gateMap', 'adsMap'],
			pointMapData : null,
			gateMapData : null,
			adsMapData : null,
		}),
		computed : {
			...mapGetters(['getAreaInfo']),
		},
		created(){
			this.setUpdateAreaData( { 
				inTimeTerritoryData : null, 
				callBack :()=> {
					this.objectArr.forEach(elem=>{
						this[`${elem}Data`] = this.getAreaInfo[elem].map(item=>extension.getInfoByObject(item, elem));
					});
				}					
			});
		},
		methods : {
			...mapActions(['setUpdateAreaData']),
			getArrDataForName( inSimpleName ){
				return this[`${inSimpleName}Data`];
			}
		}
	}
</script>