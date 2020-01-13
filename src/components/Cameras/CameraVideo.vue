<template>
    <div class='main' v-if='cameraId'>
		<a-button class='absolute goToBackPos' @click="$router.go(-1)" >{{$lang.messages.goToListCamera}}</a-button>
        <h2>{{$lang.messages.videoFrom}} {{cameraId}}</h2>
        <img class="camera_view_big boxShadow pointer" :src='getCameraGifFile(cameraId)' />
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        data :()=>({
            cameraId : null,
        }),
        computed : {
            ...mapGetters(['getCameraGifFile'])
        },
        created(){            
            this.cameraId = this.$route.params.Id;
        }
    }
</script>

<style lang="scss" scoped>
    .goToBackPos{
        top : 15%;
        left : 7%;
    }
    .camera_view_big {
        display: inline-block;
        width: 600px;
        height: 400px;
        background: #fff;
        margin: 0 10px;
    }
</style>