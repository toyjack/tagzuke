<template>
  <v-layout row wrap>
    <v-dialog v-model="showDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">注文修正</v-card-title>
        <v-card-text>
          <v-text-field name="fixedDef" label="注文を入力してください" multi-line v-model="fixedDef"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="showDialog = false">キャンセル</v-btn>
          <v-btn color="green darken-1" flat @click.native="saveChange">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex xs12>
      <v-card v-shortkey="{up: ['shift','tab'], down: ['tab'], next:['arrowright'],prev:['arrowleft'],changeNext:['arrowdown'],changePrev:['arrowup']}" @shortkey="theAction">
        <v-toolbar color="white" absolute dense prominent extended fixed>
          <v-toolbar-title>
            {{workData[tagActivedIndex].entry}}：
          </v-toolbar-title>
          <template v-for="(def,index1) in parsedDef">
            <span :class="tagStyle[def.type]" :key="index1">
              {{def.text}}
            </span>
          </template>
        </v-toolbar>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-layout row v-for="(item,index) in workData" :key="index">
        <v-flex xs1>
          <!--  -->
        </v-flex>
        <v-flex xs2>{{item.id}}</v-flex>
        <v-flex xs2>{{item.entry}}</v-flex>
        <v-flex xs6>
          {{item.def}}
        </v-flex>
        <v-flex xs1>
          <v-btn @click.stop="editDef(index, item.id)">修正</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>
  import Vue from 'vue'
  Vue.use(require('vue-shortkey'))
  export default {
    name: 'display',
    data: function () {
      return {
        showDialog: false,
        fixedDef: '',
        fixedDefIndex: '',
        fixedID: '',
        tagActivedIndex: 0,
        parsedDef: []
      }
    },
    mounted: function () {
      this.parseDef(this.workData[0].def)
    },
    computed: {
      separator: function () {
        return this.$store.state.separator
      },
      workData: function () {
        return this.$store.state.workData
      },
      tagStyle: function () {
        return this.$store.state.tagStyle
      },
    },
    watch: {
      tagActivedIndex: function (newIndex, oldIndex) {
        console.log(newIndex)
        //TODO: save state with oldIndex -> id
      }
    },
    methods: {
      editDef: function (index, id) {
        this.showDialog = true
        this.fixedDefIndex = index
        this.fixedID = id
        this.fixedDef = this.workData[index].def
      },
      saveChange: function () {
        this.showDialog = false
        // Vue.set(this.$store.state.workData,this.fixedDefIndex,this.fixedDef)
        this.$store.commit('updateWorkDataWithID', {
          id: this.fixedID,
          def: this.fixedDef
        })
      },
      parseDef: function (defs) {
        this.parsedDef = []
        defs = defs.split(this.separator)
        for (let j = 0; j < defs.length; j++) {
          let ele = defs[j]
          let regex = /(<([^>]+)>)/gi
          let type = ele.match(regex)
          let text = ele.replace(regex, "")
          if (type) {
            this.parsedDef.push({
              "type": type[0],
              "text": text
            })
          } else {
            this.parsedDef.push({
              "type": "",
              "text": text
            })
          }
        }
      },
      theAction(event) {
        switch (event.srcKey) {
          case 'up':
            console.log("up")
            if (this.tagActivedIndex > 0) {
              this.tagActivedIndex -= 1
            }
            break
          case 'down':
            console.log("down")
            if (this.tagActivedIndex < (this.workData.length - 1)) {
              this.tagActivedIndex += 1
            }
            break
          case 'next':
            console.log("next")
            break
          case 'prev':
            console.log("prev")
          break
          case 'changeNext':
            console.log("change next")
          break
          case 'changePrev':
            console.log("change prev")
          break
        }
      }
    }
  }

</script>
