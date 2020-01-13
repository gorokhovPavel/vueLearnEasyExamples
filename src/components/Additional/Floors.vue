<template>
    <a-select class='fullSize' :defaultValue='$lang.messages.allFloors' >
        <a-select-option v-for='(item, index) in floorArrTextData' :key='index'>
            {{item}}
        </a-select-option>
    </a-select>
</template>
<script>
    export default {
        data :()=>({
            floorArrData : null,
            floorArrTextData : null
        }),
        created(){
            this.floorArrData = [
                {
                    text : this.$lang.messages.allFloors
                }, {
                    text : this.$lang.messages.floor
                }
            ];
            this.floorArrTextData = this.floorArrData.map( (item, index)=> index === 0 ? item.text : `${item.text} ${index}`);
        }, 
    }
</script>