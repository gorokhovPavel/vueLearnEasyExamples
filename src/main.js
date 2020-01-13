import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import Router from './route/routeWays'
import PromisePol from 'promise-polyfill'
import Antd from 'ant-design-vue'
import Store from './store/mainStore'

import 'ant-design-vue/dist/antd.css'
import './content/style/mainStyle.scss'
import './content/style/staticStyle.scss'

import Lang from 'vuejs-localization'
Lang.requireAll(require.context('./language', true, /\.js$/));

Vue.use(Lang);
Vue.config.productionTip = false;
Vue.use(Vuex, PromisePol);
Vue.use(Antd);

new Vue({
  render : h => h(App),
  router : Router,
  store : Store
}).$mount('#app')