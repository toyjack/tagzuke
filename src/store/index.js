import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        ifShowNavBar:false,
        workbook:null,
        workData: null
    },
    mutations:{
        toggleNavBar(state){
            state.ifShowNavBar=!state.ifShowNavBar
        },
        updateWorkbook(state, data){
            state.workbook = data
        },
        updateWorkData(state, data){
            state.workData = data
        }
    }
})