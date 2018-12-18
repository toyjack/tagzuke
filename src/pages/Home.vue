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
          <a href="https://raw.githubusercontent.com/toyjack/tagzuke/master/syp_test.tsv" download>下載測試用檔案</a>
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
