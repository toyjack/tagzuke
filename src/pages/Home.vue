<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center v-if="!readed">
      <v-flex xs12>
        <h2 class="text-xs-center display-2">古辞書マークアップツールtagzuke</h2>
        <p></p>
        <p class="text-xs-center headline">
          部首分類体の日本古辞書の項目構造は、掲出字と注文からなるが、注文は大別して音注、意義注、字体注、和訓の4つの要素からなる。さらにこの4要素には多様な形式で注記が施され、それぞれの要素に数種のタイプが認められる。したがって、日本古辞書のデータベース化には、項目構造の多様性に対応したマークアップ・ツールの開発が求められる。tagzukeは、<a href="http://hdic.jp">HDICプロジェクト</a>が公開予定である観智院本『類聚名義抄』テキストデータベースを対象にして開発した日本古辞書マークアップ・ツールである。
        </p>
        <p class="text-xs-center">
          <a>
          <h2 @click="$refs.fileInput.click()">ファイルを開く</h2>
        </a>
        <input type="file" style="display:none" @change="onFileChange" ref="fileInput">
        <v-btn icon @click="$refs.fileInput.click()">
          <v-icon>insert_drive_file</v-icon>
        </v-btn>
        </p>
        <p class="text-xs-center">
          <a href="https://raw.githubusercontent.com/toyjack/tagzuke/master/data.xlsx" download>サンプルファイル</a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import XLSX from 'xlsx'

  export default {
    name: "Home",
    data: function () {
      return {
        //
        wb: null,
        sheetNames: [],
        readed: false,

      };
    },
    methods: {
      onFileChange: function (e) {
        let rABS = true; //read as binary
        let f = e.target.files[0];
        let reader = new FileReader();
        let app = this;
        reader.onload = function (e) {
          let data = e.target.result;
          if (!rABS) data = new Uint8Array(data);
          app.wb = XLSX.read(data, {
            type: rABS ? "binary" : "array"
          });
          app.sheetNames = app.wb.SheetNames;
          app.$store.commit('updateWorkbookData', app.wb)
          app.readed = true;
          app.$router.push('/settings')
          // console.log(app.sheetNames)
        };
        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
      }
    }
  };

</script>
