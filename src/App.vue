<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <Header/>
      </a-layout-header>
      <a-layout-content>
        <div class='contentAll boxShadow' >
          <a-spin class='absolute spinPos' size='large' v-if='getIsLoading' />
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <Footer/>
      </a-layout-footer>
    </a-layout>
  </div>
</template>;

<script>
  import Header from './components/Main/Header'
  import Footer from './components/Main/Footer'
  import { mapGetters } from 'vuex'
  export default {
    components : {
      Header, Footer
    },
    computed : {
      ...mapGetters(['getIsLoading'])
    }
  }
</script>

<style lang="scss">
  @import "./content/style/mainStyle.scss";
  #app {
    text-align : center;
  }
  #app .ant-layout-header {
    background : $kpmgColor;
    line-height : 55px;
    height: 58px;
    color : #fff;
  }
  #app .ant-layout-footer, #app .ant-layout-content {
    background : $backgroundColor;
  }
  .contentAll {
    background : #fff;
    margin : 10px 50px 0;
    border-radius : .25rem;
    border: 1px solid #c8ced3;
  }
  #app .ant-layout-content {
    min-height : $contentHeight;
    line-height : 100px;
  }
  .spinPos {
    z-index : 99;
    top : 13vh;
    left : 47%;
  }
  .ant-spin-lg .ant-spin-dot {
    font-size: 52px;
    width: 52px;
    height: 52px;
  }
</style>