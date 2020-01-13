<template>
   <div class='main'>
		<a-card v-for='(item, index) in reIdList' :key='index' :title='item.title' class='reIdCard pointer shadowDivHover' >
			<p>{{$lang.messages[item.descLang]}}</p>
		</a-card>
	</div>
</template>
<script>
	export default {
		data : ()=>({
			reIdList : []
		}),
		created(){
			this.setReIdListInit();
		},
		methods : {
			setReIdListInit(){
				this.reIdList = [
					{
						title : '183 345',
						descLang : 'totalPerson'
					},{
						title : '2 342',
						descLang : 'newPersons'
					}
				]
			}
		}
	}
</script>
<style lang="scss">
	.reIdCard {
		min-width : 30%;
		display: inline-block;
	}
</style>