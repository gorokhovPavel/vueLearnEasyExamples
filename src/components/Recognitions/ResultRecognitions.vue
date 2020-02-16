<template>
    <div>
        <div v-for='(item, index) in resultObjArr' :key='index' 
            :class='{ colorBackOk : item.isRecog, colorBackNo : !item.isRecog }'
            class='flexContainerResRec radius fullSize margVert border ordinarContainerAdp' >
                <img class='flexItemAdp imgOfRec radius pointer'
                    :src='require(`../../content/images/${item.recImg}`)' 
                />
                <span class='flexItemAdp titleOfRec simplePad upper' > 
                    Person {{index+1}} <br/> {{getPersonDesc(item.isRecog)}} 
                </span>
                <div class='flexItemAdp' v-if='item.isRecog' >
                    <img v-for='(cItem, cIndex) in item.docImgArr' :key='cIndex' 
                        class='imgOfDoc minMarg radius pointer'
                        :src='require(`../../content/images/${cItem}`)' />
                </div>
        </div>
    </div>
</template>
<script>
    export default {
        data :()=>({
            resultObjArr : [],
        }),
        created(){
            this.resultObjArr = [
                {
                    recImg : '0.jpg',
                    docImgArr : [
                        'doc_0.jpg'
                    ],
                    isRecog : true,
                },
                {
                    recImg : '1.jpg',
                    docImgArr : [
                        'doc_1.jpg', 'doc_1_1.jpg', 'doc_1_1_1.jpg',
                    ],
                    isRecog : true,
                },
                {
                    recImg : '2.jpg',
                    docImgArr : [
                        'doc_2.jpg', 'doc_2_2.jpg', 'doc_2_2_2.jpg',
                    ],
                    isRecog : false,
                },
                {
                    recImg : '3.jpg',
                    docImgArr : [
                        'doc_3.jpg', 'doc_3_3.jpg'
                    ],
                    isRecog : true,
                },
                {
                    recImg : '4.jpg',
                    docImgArr : [ 

                    ],
                    isRecog : false,
                },
                {
                    recImg : '5.jpg',
                    docImgArr : [
                        'doc_5.jpg', 'doc_5_5.jpg'
                    ],
                    isRecog : true,
                },
            ];
            //this.resultObjArr = this.resultObjArr.filter( item=> item.recImg === '5.jpg' );
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
    .flexContainerResRec {
        display : flex;
        flex-flow : row wrap;
        justify-content : space-between;
    }
    .titleOfRec {
        line-height : 45px; 
        width : 55%;
    }
    .imgOfRec {
        width : 45%    
    }
    .imgOfDoc {
        width  : 20vw;
        height : 10vh;
    }
</style>