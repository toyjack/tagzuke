<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>工作表：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="sheetNames" v-if="ifShowSelectSheet" v-model="selectedSheetName" v-on:input="onSheetChange" label="選択"
              single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>ID列：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="filedNames" v-if="ifShowSelectField" v-model="selectedIDFiledName" label="選択" single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>字頭列：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="filedNames" v-if="ifShowSelectField" v-model="selectedEntryFiledName" label="選択" single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>釋文列：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="filedNames" v-if="ifShowSelectField" v-model="selectedDefFieldName" label="選択" single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>釋文要素間隔符號：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field name="separator" label="默認設定為“。”" id="separator" v-model="separator"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-checkbox label="`跳過第一行`" v-model="skipFirstLine"></v-checkbox>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-if="tags">
          <v-flex xs12>
            <span v-for="item in tags" :key="item">
              {{item}}
            </span>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            檢測到標籤：
          </v-flex>
          <v-flex xs8>
            <div class="text-xs-center">
              <v-btn round color="primary" dark @click.stop="renderTable">打開</v-btn>
            </div>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
  import XLSX from "xlsx"
  import XRegExp from 'xregexp'
  XRegExp.install('astral')
  export default {
    name: "Settings",
    data: function () {
      return {
        sheet: null,
        filedNames: [],
        selectedSheetName: null,
        selectedIDFiledName: null,
        selectedEntryFiledName: null,
        selectedDefFieldName: null,
        ifShowSelectSheet: true,
        ifShowSelectField: false,
        canRender: false,
        skipFirstLine: true,
        separator: "。", // defualt
        tags: []
      };
    },
    computed: {
      workbookData: function () {
        return this.$store.getters.workbookData
      },
      sheetNames: function () {
        return this.$store.getters.sheetNames
      }
    },
    watch: {},
    mounted() {},
    methods: {
      onSheetChange: function () {
        this.ifShowSelectField = true
        const worksheet = this.$store.state.workbookData.Sheets[this.selectedSheetName];
        this.$store.commit("updateWorkingSheet", this.selectedSheetName)
        this.sheet = XLSX.utils.sheet_to_json(worksheet, {
          header: 1
        });
        this.filedNames = this.sheet[0]
      },
      checkDef: function (def) {
        if (XRegExp("<").test(def)) {
          return def
        }
        let rules = [
          // 在下面添加規則，例如：
          // {
          //   tag: '<ziyin>',
          //   regex: '(亦音.+)|(音.+)|(.+音)|(.+切)'
          // },
          {
            tag: '<ziyin>',
            regex: '([亦又]音.+)|(音.+)|(.+音)|(.+切)'
          },
          {
            tag: '<ziti>',
            regex: '([亦或本原正今]作.+)|([籀文篆文本亦]作.+)|(古文)|(籀文)'
          },
          {
            tag:'<shiyi>',
            regex:'(也$)|(^《)'
          }
        ]
        for (let i =0;i<rules.length;i++) {
          if (XRegExp(rules[i].regex).test(def)) {
            let endTag = rules[i].tag.replace(/</, '</')
              // console.log(rules[i].tag + def + endTag)

            return rules[i].tag + def + endTag
          }

        }
        return def

      },
      renderTable: function () {
        const indexID = this.filedNames.indexOf(this.selectedIDFiledName)
        this.$store.commit("updateIndexID", indexID)
        const indexEntry = this.filedNames.indexOf(this.selectedEntryFiledName)
        this.$store.commit("updateIndexEntry", indexEntry)
        const indexDef = this.filedNames.indexOf(this.selectedDefFieldName)
        this.$store.commit("updateIndexDef", indexDef)
        let renderResult = []
        let tempTags = []
        for (let i = 0; i < this.sheet.length; i++) {
          let element = this.sheet[i]
          let id = element[indexID];
          let entry = element[indexEntry];
          let def = (element[indexDef] || null)
          if (def) { //注文は空きじゃないだけを
            let parsedDef = []
            def = def.split(this.separator)
            if(isNaN(def[def.length])) def.pop(); //排出最後一個空元素
            for (let j = 0; j < def.length; j++) {
              let ele = def[j]
              ele = this.checkDef(ele)
              let regex = /(<([^>]+)>)/gi
              let type = ele.match(regex)
              let text = ele.replace(regex, "")
              if (type) {
                parsedDef.push({
                  type: type[0],
                  text: text
                })
              } else {
                console.log(text.charCodeAt(0))
                parsedDef.push({
                  type: "",
                  text: text
                })
              }
            }

            renderResult.push({
              id: id,
              entry: entry,
              def: parsedDef
            }); // TODO: 前処理と注文の構造化
          }
        }

        //最初の行を無視
        if (this.skipFirstLine) {
          renderResult.shift()
        }

        //データを保存
        this.$store.commit('updateSeparator', this.separator)
        this.$store.commit('updateWorkData', renderResult)

        //表示ページへの移動
        this.$router.push('/display')
      }
    }
  };

</script>
