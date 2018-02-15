import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        ifShowNavBar:false,
        workbookData:null,
        workData: null,
        workbookState:{
            sheet:"",
            indexID:"",
            indexEntry:"",
            indexDef:""
        },
        tags:[],
        tagStyle:{
            "<jion>":"red",
            "<jitai>":"blue",
            "<kanbun>":"green",
            "<wakun>":"orange"
        }
    },
    mutations:{
        toggleNavBar(state){
            state.ifShowNavBar=!state.ifShowNavBar
        },
        updateWorkbookData(state, data){
            state.workbookData = data
        },
        updateWorkData(state, data){
            state.workData = data
        },
        updateTags(state, data){
            state.tags=data
        },
        updateTagStyle(state,data){
            state.tagStyle=data
        },
        updateWorkingSheet(state, data){
            state.workbookState["sheet"] = data
        },
        updateIndexID(state,data){
            state.workbookState["indexID"]=data
        },
        updateIndexEntry(state,data){
            state.workbookState["indexEntry"]=data
        },
        updateIndexDef(state,data){
            state.workbookState["indexDef"]=data
        }
    }
})