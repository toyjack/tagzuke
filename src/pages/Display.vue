<template>
  <div>
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

    <v-layout row>
      <v-flex xs12 v-if="workData">
        <v-layout row v-for="(item,index) in workData" :key="index">
          <v-flex xs1>
            <!--  -->
          </v-flex>
          <v-flex xs2>{{item.id}}</v-flex>
          <v-flex xs2>{{item.entry}}</v-flex>
          <v-flex xs6 @click="defActivedIndex=index">
            {{item.def}}
          </v-flex>
          <v-flex xs1>
            <v-btn @click.stop="editDef(index, item.id)">修正</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-footer height="auto" fixed>
      <v-layout row>
        <v-flex xs12>
          <v-card flat tile>
            <v-card-text>
              <v-layout row>
                <v-flex xs12 v-if="workData">
                  <v-card v-shortkey="{up: ['shift','tab'], down: ['tab'], next:['arrowright'],prev:['arrowleft'],changeNext:['arrowdown'],changePrev:['arrowup']}"
                    @shortkey="theAction">
                    <v-card-title>
                      <span class="headline">{{workData[defActivedIndex].entry}}：</span>
                      <v-chip v-for="(def,index) in parsedDef" :class="tagStyle[def.type]" :outline="tagActived.index!=index" :key="index" label
                        @click.stop="tagActived.index=index">
                        {{def.text}}
                      </v-chip>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-card>
                    <v-card-text>
                      <p class="text-xs-center">
                        <v-chip label v-for="(color,tag,index) in tagStyle" :key="index" :class="color" :outline="tagChangedTo!=index">
                          {{tag}}
                        </v-chip>
                      </p>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-footer>
  </div>
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
        defActivedIndex: 0,
        parsedDef: [],
        tagActived:{
          index:0,
          type:''
        },
        tagChangedTo:''
      }
    },
    mounted: function () {
      if (this.workData) {
        this.parseDef(this.workData[0].def)
      }else{
        // TODO: 提醒route位置
      }
    },
    computed: {
      separator: function () {
        return this.$store.getters.separator
      },
      workData: function () {
        return this.$store.getters.workData
      },
      tagStyle: function () {
        return this.$store.getters.tagStyle
      },
      tags:function(){
        return this.$store.getters.tags
      }

    },
    watch: {
      defActivedIndex: function (newIndex, oldIndex) {
        this.parseDef(this.workData[newIndex].def)
        this.tagActived.index = 0
        this.renderTagSelection()
      },
      'tagActived.index':function(newIndex,oldIndex){
        this.renderTagSelection()
      },
      tagChangedTo:function(newIndex,oldIndex){
        this.tagActived.type=""
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
        console.log(this.separator)
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
      renderTagSelection:function(){
        //TODO: 应该简化一下
        this.tagActived.type=this.parsedDef[this.tagActived.index].type
        this.tagChangedTo=this.tags.indexOf(this.tagActived.type)
      },

      theAction(event) {
        switch (event.srcKey) {
          case 'up':
            if (this.defActivedIndex > 0) {
              this.defActivedIndex -= 1
            }
            break
          case 'down':
            if (this.defActivedIndex < (this.workData.length - 1)) {
              this.defActivedIndex += 1
            }
            break
          case 'next':
            if (this.tagActived.index < (this.parsedDef.length - 1)) {
              this.tagActived.index += 1
            } else {
              // 回到第一个元素
              this.tagActived.index = 0
            }
            break
          case 'prev':
            if (this.tagActived.index > 0) {
              this.tagActived.index -= 1
            } else {
              // 去到最后一个标签
              this.tagActived.index = this.parsedDef.length - 1
            }
            break
          case 'changeNext':
            if(this.tagChangedTo<(this.tags.length-1)){
              this.tagChangedTo+=1
            } else{
              this.tagChangedTo=0
            }
            break
          case 'changePrev':
            if(this.tagChangedTo>0){
              this.tagChangedTo-=1
            }else{
              this.tagChangedTo=this.tags.length-1
            }
            break
        }
      }
    }
  }

</script>
