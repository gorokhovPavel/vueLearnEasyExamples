<template>
    <div class='main'>
		<router-link v-for='(item, index) in menuList[0]' :key='"0"+index' :to='item.roterTo' >
			<a-card :title="$lang.messages[item.langTitle]" class='cardMenu shadowDivHover' ></a-card>
		</router-link>
		<div class='fullSize' >
			<router-link v-for='(item, index) in menuList[1]' :key='"1"+index' :to='item.roterTo' >
				<a-card :title="$lang.messages[item.langTitle]" class='cardMenu shadowDivHover' ></a-card>
			</router-link>
		</div>
		<router-link v-for='(item, index) in menuList[2]' :key='"2"+index' :to='item.roterTo' >
			<a-card :title="$lang.messages[item.langTitle]" class='cardMenu shadowDivHover' ></a-card>
		</router-link>
    </div>
</template>

<script>
    export default {
        data :()=>({
			menuList : [],
		}),
		created(){
			this.setInitMenu();
		},
		methods : {
			setInitMenu(){
				this.menuList = [
					[
						{
							roterTo : '/AnaliticsMain',
							langTitle : 'analitics'
						}, {
							roterTo : '/MapFilters',
							langTitle : 'map'
						}, {
							roterTo : '/AnaliticsObjects',
							langTitle : 'objects'
						}, {
							roterTo : '/AnaliticsReports',
							langTitle : 'reports'
						}
					],[
						{
							roterTo : '/CamerasAll',
							langTitle : 'allCameraView'
						}, {
							roterTo : '/CamerasList/0',
							langTitle : 'cameraList'
						}, {
							roterTo : '/CamerasReid',
							langTitle : 'personReId'
						}
					], [
						{
							roterTo : '/SettingsFloor',
							langTitle : 'floorsSettings'
						}, {
							roterTo : '/CamerasList/1',
							langTitle : 'cameraSettings'
						}, {
							roterTo : '/SettingsAttenLeft',
							langTitle : 'gatesSettings'
						}
					]
				]
			} 
		}
    }
</script>

<style lang="scss" scoped>
	.cardMenu {
		line-height : 100px;
		display: inline-block;
		min-width: 20%;
		margin: 10px;
	}
</style>