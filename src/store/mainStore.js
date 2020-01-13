import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions'

Vue.use(Vuex);

//Для простоты работы, на бою не используем
window.state = ( process.env.NODE_ENV === 'development' ) ? state : null;

export default new Vuex.Store({
    strict : false,
    modules : {
        store : {
            state,
            mutations,
            getters,
            actions
        }
    }
});