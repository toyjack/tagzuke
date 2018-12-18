<template>
  <v-layout row wrap>
    <v-dialog v-model="editDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">修改釋文</v-card-title>
        <v-card-text>
          <v-text-field name="fixedDef" label="注文を入力してください" multi-line v-model="fixedDef"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="editDialog = false">取消</v-btn>
          <v-btn color="green darken-1" flat @click.native="editDialog = false">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs12>
      <v-btn color="success" @click="save">XLSX</v-btn>
      <v-btn color="error" @click="save_json">JSON</v-btn>
    </v-flex>
    <v-flex xs12>
      <v-layout row v-for="(item,index) in workData" :key="index">
        <v-flex xs2>{{workData[index].id}}</v-flex>
        <v-flex xs2>{{item.entry}}</v-flex>
        <v-flex xs7>
          <v-chip label v-for="(tag,index) in item.def" :key="index" :class="tagStyle[tag.type]">
            {{tag.text}}
          </v-chip>
        </v-flex>
        <v-flex xs1>
          <v-btn @click.stop="editDef(index)">修改</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-btn @click="save">保存</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: 'conform',
    data: function () {
      return {
        editDialog: false,
        fixedDef: '',
        fixedDefIndex: ''
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
    },
    methods: {
      editDef: function (index) {
        this.editDialog = true
        this.fixedDefIndex = index
        this.fixedDef = this.workData[index].def
      },
      save: function () {
        let result = []
        for (let i = 0; i < this.workData.length; i++) {
          let line = this.workData[i]
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
            // line.def = newDef
          }
          result.push({
            id: line.id,
            entry: line.entry,
            def: newDef
          })
        }

        let app = this
        let ws = XLSX.utils.json_to_sheet(result, {
          header: ["id", "def", "entry"]
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
        const data = JSON.stringify(this.workData)
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
    }
  }

</script>
