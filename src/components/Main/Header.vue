<template>
    <div>
        <table class='fullSize' border='0' >
            <tr>
                <td width='95%' align='left' >
                    <router-link :to='"/"' class='logo shadowDivHover pointer' style='text-decoration:none;' >
                        <span >{{logoText}}</span>
                    </router-link>
                </td>
                <td align='right' >
                    <img class='langImg pointer' v-if='!getRuLang' @click="setChangeLang"
                        :src="require(`../../content/images/en.png`)" >
                    <img class='langImg pointer' v-if='getRuLang' 
                        :src="require(`../../content/images/ru.png`)" @click="setChangeLang" >
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        data :()=> ({
            logoText : 'KPMG OWL OBSERVER',
        }),
        created(){            
            this.$lang.setLang( this.language );
        },
        computed : {
            ...mapGetters(['getRuLang']),
            language : function(){
                return this.getRuLang ? 'ru' : 'en';
            }
        },
        methods : {
            ...mapMutations(['setCurrentMapValue']),
            setChangeLang() {
                this.setCurrentMapValue({
                    field : 'isRuLang',
                    value : !this.getRuLang
                });
                this.$lang.setLang( this.language );
            },
        }
    }
</script>

<style lang='scss' >
    @import "../../content/style/mainStyle.scss";
    .logo {
        color : #fff;
        font-size: 18px;
        margin: 5px;
    }
    .langImg {
        width : 25px;
        height : 18px;
    }
</style>