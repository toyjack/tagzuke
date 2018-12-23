<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center v-if="!readed">
      <v-flex xs12>
        <h2 class="text-xs-center display-2">中日古辭書自動文本標注顯示工具tagzuke</h2>
        <p></p>

        <p class="text-xs-center">
          <a>
            <h2 @click="$refs.fileInput.click()">打開檔案
              <v-btn icon @click="$refs.fileInput.click()">
                <v-icon>insert_drive_file</v-icon>
              </v-btn>
            </h2>
          </a>
          <input type="file" style="display:none" @change="onFileChange" ref="fileInput">
        </p>
        <p class="text-xs-center">
          <a href="https://github.com/toyjack/tagzuke/raw/master/syp_test.tsv">測試用宋本玉篇檔案</a>
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
          });//調用js-xlsx來處理表格檔案
          app.sheetNames = app.wb.SheetNames;
          app.$store.commit('updateWorkbookData', app.wb) //存入store
          app.readed = true;
          app.$router.push('/settings') //跳轉到settings頁面
        };
        if (rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
      }
    }
  };

</script>
