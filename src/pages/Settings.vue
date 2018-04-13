<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>シート：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="sheetNames" v-if="ifShowSelectSheet" v-model="selectedSheetName" v-on:input="onSheetChange" label="選択"
              single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>IDフィールド：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="filedNames" v-if="ifShowSelectField" v-model="selectedIDFiledName" label="選択" single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>掲出字フィールド：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="filedNames" v-if="ifShowSelectField" v-model="selectedEntryFiledName" label="選択" single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>注文フィールド：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select v-bind:items="filedNames" v-if="ifShowSelectField" v-model="selectedDefFieldName" label="選択" single-line bottom></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>注文要素の区切り文字：</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field name="separator" label="デフォルトは全角スペースです" id="separator" v-model="separator"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-checkbox label="`最初の行をスキップ`" v-model="skipFirstLine"></v-checkbox>
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
            検出したタグ：
          </v-flex>
          <v-flex xs8>
            <div class="text-xs-center">
              <v-btn round color="primary" dark @click.stop="renderTable">開く</v-btn>
            </div>
          </v-flex>
        </v-layout>



      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
  import XLSX from "xlsx";
  export default {
    name: "Settings",
    data: function () {
      return {
        //
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
        separator: "　", // defualt is zen-kaku space!
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
          let def = (element[indexDef] || '')
          if (def != "") { //注文は空きじゃないだけを
            let parsedDef = []
            def = def.split(this.separator)
            console.log(this.separator)
            for (let j = 0; j < def.length; j++) {
              let ele = def[j]
              let regex = /(<([^>]+)>)/gi
              let type = ele.match(regex)
              let text = ele.replace(regex, "")
              if (type) {
                parsedDef.push({
                  "type": type[0],
                  "text": text
                })
              } else {
                parsedDef.push({
                  "type": "",
                  "text": text
                })
              }
            }

            renderResult.push({
              "id": id,
              "entry": entry,
              "def": parsedDef
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

        // console.log(this.$store.state.workData)

        //表示ページへの移動
        this.$router.push('/display')
      }
    }
  };

</script>
