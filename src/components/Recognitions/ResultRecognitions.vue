<template>
    <div>
        <div v-for='(item, index) in getRecogResult.faceRecogResult' :key='index' 
            :class='{ colorBackOk : item.isRecog, colorBackNo : !item.isRecog }'
            class='gridContainerResRecAdp radius margDown border simplePad' >
                <img class='imgOfRecAdp fullSize radius pointer'
                    :src='item.recImg' 
                />
                <span class='titleOfRecAdp upper' > 
                    Person {{index+1}} {{getPersonDesc(item.isRecog)}} 
                </span>
                <span v-for='(cItem, cIndex) in item.docImgArr' :key='cIndex' >
                    <img v-if='item.isRecog'
                        class='imgOfDocAdp radius pointer'
                        :src='cItem' 
                    />
                </span>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data :()=>({
        }),
        computed : {
            ...mapGetters(['getRecogResult'])
        },
        created() {
        },
        methods : {
            getPersonDesc(isRecog){
                return isRecog ? 'OK' : 'N/A';
            }
        }
    }
</script>
<style>
    .colorBackOk {
        background-color : #C5E0B4;
    }
    .colorBackNo {
        background-color : #F8CBAD;
    }
    .rezOfRecAdp img {
        float : left;
    }
</style>