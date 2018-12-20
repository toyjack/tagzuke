<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="e1 > 1">第一步</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="e1 > 2">第二步</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">第三步</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card color="gray lighten-3" class="mb-5" height="200px">
                <v-card-title>
                  <div class="headline">選擇保存檔案類型</div>
                </v-card-title>
                <v-card-text>
                  <v-radio-group v-model="fileType" :mandatory="false">
                    <v-radio label="Excel" value="excel"></v-radio>
                    <v-radio label="JSON" value="json"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click.native="e1 = 2">下一步</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card color="gray lighten-2" class="mb-5" height="200px">
                <v-card-title>
                  <div class="headline">選擇輸出資料內容</div>
                </v-card-title>
                <v-card-text>
                  <v-radio-group v-model="content" :mandatory="false">
                    <v-radio label="全部" value="all"></v-radio>
                    <v-radio v-for="tag in tags" :key="tag" :label="tag" :value="tag"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click.native="dataFilter(content)">下一步</v-btn>
              <v-btn flat @click="e1-=1">返回</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card color="gray lighten-1" class="mb-5" height="200px">
                <v-card-title>
                  <div class="headline">確認</div>
                </v-card-title>
                <v-card-text>
                  <div class="subheading">
                    檔案格式：{{fileType}}
                  </div>
                  <div class="subheading">
                    下載內容：{{content}}
                  </div>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click.native="download">下載</v-btn>
              <v-btn flat @click="e1-=1">返回</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        e1: 0,
        fileType: 'excel',
        content: 'all',
        downloadData: []
      }
    },
    computed: {
      separator: function () {
        return this.$store.getters.separator
      },
      workData: function () {
        return this.$store.getters.workData
      },
      tags: function () {
        return this.$store.getters.tags
      },
      ifJSON: function () {
        return !this.ifExcel
      }
    },
    methods: {
      download: function () {
        if (this.fileType == 'excel') {
          this.save_excel()
        } else {
          this.save_json()
        }
      },
      dataFilter: function (tag) {
        this.e1 = 3
        if (tag != 'all') {
          let newWorkData = []
          for (let line of this.workData) {
            let defs = line.def
            for (let ele in defs) {
              if (defs[ele].type == tag) {
                newWorkData.push({
                  id: line.id,
                  entry: line.entry,
                  def: [defs[ele]]
                })
              }
            }
          }
          this.downloadData = newWorkData
        }else{
          this.downloadData=this.workData
        }
      },
      save_excel: function () {
        let result = []
        for (let i = 0; i < this.downloadData.length; i++) {
          let line = this.downloadData[i]
          let newDef = ""
          if (Array.isArray(line.def)) {
            for (let j = 0; j < line.def.length; j++) {
              let ele = line.def[j]
              let startTag = ele.type
              let text = ele.text
              let endTag = ele.type.replace(/</, '</')
              if (newDef === "") {
                newDef = startTag + text + endTag
              } else {
                newDef = newDef + this.separator + startTag + text + endTag
              }
            }
          }
          result.push({
            id: line.id,
            entry: line.entry,
            def: newDef
          })
        }

        let app = this
        let ws = XLSX.utils.json_to_sheet(result, {
          header: ["id", "entry", "def"]
        })

        let wb = {
          SheetNames: [],
          Sheets: {}
        };
        wb.Props = {
          Title: "tagzuke!",
          Author: "Guanwei Liu"
        };
        var ws_name = "表1";
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, 'out.xlsx');
      },
      save_json: function () {
        // https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file
        const data = JSON.stringify(this.downloadData)
        const blob = new Blob([data], {
          type: 'text/plain'
        })
        const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
        a.download = "download.json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      }
    },
  }

</script>
