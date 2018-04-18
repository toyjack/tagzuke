import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ifShowNavBar: false,
    workbookData: null,
    workData: null,
    workbookState: {
      sheet: "",
      indexID: "",
      indexEntry: "",
      indexDef: "",
      separator: "　"
    },
    tags: [
      "<jion>",
      "<jitai>",
      "<kanbun>",
      "<wakun>"
    ],
    tagStyle: {
      "<jion>": "red",
      "<jitai>": "blue",
      "<kanbun>": "green",
      "<wakun>": "orange"
    },
    new_tags:[
      {
        name:'字音注',
        tag:'<jion>',
        color:'red'
      },
      {
        name:'和訓注',
        tag:'<wakun>',
        color:'orange'
      },
      {
        name:'字体注',
        tag:'<jitai>',
        color:'blue'
      },
      {
        name:'意義注',
        tag:'<kanbun>',
        color:'green'
      }
    ],
  },
  getters: {
    workbookData: function (state) {
      if (state.workbookData) {
        return state.workbookData;
      } else {
        return false;
      }

    },
    sheetNames: function (state, getters) {
      if (getters.workbookData) {
        return state.workbookData.SheetNames
      } else {
        return []
      }
    },
    separator: function (state) {
      return state.workbookState.separator
    },
    workData: function (state) {
      if (state.workData) {
        return state.workData
      } else {
        return false
      }
    },
    tagStyle: function (state) {
      return state.tagStyle
    },
    tags:function (state) {
        return state.tags
    }
  },
  mutations: {
    toggleNavBar(state) {
      state.ifShowNavBar = !state.ifShowNavBar
    },
    updateWorkbookData(state, data) {
      state.workbookData = data
    },
    updateWorkData(state, data) {
      state.workData = data
    },
    updateWorkDataWithID(state, data) {
      for (let i = 0; i < state.workData.length; i++) {
        if (state.workData[i].id == data.id) {
          state.workData[i].def = data.def
          break
        }
      }
    },
    updateDefTag(state,payload){
      let defIndex=payload.defIndex
      let tagIndex=payload.tagIndex
      let newTag=payload.newTag
      state.workData[defIndex].def[tagIndex].type=newTag
    },
    updateTags(state, data) {
      state.tags = data
    },
    updateTagStyle(state, data) {
      state.tagStyle = data
    },
    updateWorkingSheet(state, data) {
      state.workbookState["sheet"] = data
    },
    updateIndexID(state, data) {
      state.workbookState["indexID"] = data
    },
    updateIndexEntry(state, data) {
      state.workbookState["indexEntry"] = data
    },
    updateIndexDef(state, data) {
      state.workbookState["indexDef"] = data
    },
    updateSeparator(state, data) {
      state.separator = data
    }
  }
})
