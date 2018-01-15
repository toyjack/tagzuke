<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center v-if="!readed">
      <h2 @click="$refs.fileInput.click()">Open File</h2>
      <input type="file" style="display:none" @change="onFileChange" ref="fileInput">
      <v-btn icon @click="$refs.fileInput.click()">
        <v-icon>insert_drive_file</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import XLSX from 'xlsx'

export default {
  name: "Home",
  data: function() {
    return {
      //
      wb: null,
      sheetNames:[],
      readed:false,

    };
  },
  methods: {
    onFileChange: function(e) {
      let rABS = true; //read as binary
      let f = e.target.files[0];
      let reader = new FileReader();
      let app = this;
      reader.onload = function(e) {
        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        app.wb = XLSX.read(data, {
          type: rABS ? "binary" : "array"
        });
        app.sheetNames = app.wb.SheetNames;
        app.$store.commit('updateWorkbook', app.wb)
        app.readed=true;
        app.$router.push('/settings')
        // console.log(app.sheetNames)
      };
      if (rABS) reader.readAsBinaryString(f);
      else reader.readAsArrayBuffer(f);
    }
  }
};
</script>
