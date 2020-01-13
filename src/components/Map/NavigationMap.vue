<template>
    <div>
        <div class='absolute navigationPos navigationStyle'>
            <a-button shape="circle" value="large" @click='setZoomUp' icon="plus-circle"></a-button>
            <a-button shape="circle" value="large" @click='setZoomDown' icon="minus-circle"></a-button>
            <a-button shape="circle" value="large" @click='setGoToStart' icon="compass"></a-button>
        </div>
        <div class='geoScaleStyle'>
            <span class='absolute scaleXyPos whiteTextShadow' > {{coordNavigation.xy}} </span>
            <span class='absolute scaleLonLatPos whiteTextShadow' >  {{coordNavigation.lonLat}} </span>
        </div>
    </div>
</template>
<script >
    import { mapMutations, mapGetters } from 'vuex'
    export default {
        props : [ 'coordNavigation' ],
        data : ()=>({
            zoom : null,
        }),
        created() {
            this.zoom = this.getMapData.zoomMap;
        },
        computed : {
            ...mapGetters(['getMapBox', 'getMapData', 'getGeoPoints', 'getCenterInterval'])
        },
        methods : {
            setZoomUp() {
                this.zoom += 1;
                this.getMapBox.mainMap.zoomTo(this.zoom);
            },
            setZoomDown() {
                this.zoom -= 1;
                this.getMapBox.mainMap.zoomTo(this.zoom);
            },
            setGoToStart() {
                this.zoom = this.getMapData.zoomMap;
                this.getMapBox.mainMap.fitBounds([ 
                    this.getMapData.сenterMap, this.getMapData.сenterMap
                ], { maxZoom : this.zoom } );
                const global = this;
                setTimeout(()=>{
                    global.getMapBox.mainMap.setBearing(this.getCenterInterval.bearingDegree);
                }, 1000);
            }
        }
    }
</script>

<style lang='scss' >
    @import "../../content/style/mainStyle.scss";
    .navigationPos {
        right : 8vh;
        top : 9.5vh;
    }
    .navigationStyle button {
        display : block;
        margin : 10px 0px;
    }
    .navigationStyle button:hover {
        @include shadow();
    }
    .scaleLonLatPos {
        top : 82vh;
        left : 42%;
    }
    .scaleXyPos {
        top : 78vh;
        left : 45.5%;
    }
    .geoScaleStyle span {
        color : #fff;
    }
</style>