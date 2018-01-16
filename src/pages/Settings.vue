<template>
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>Sheet:</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-bind:items="sheetNames"
                v-if="ifShowSelectSheet"
                v-model="selectedSheetName"
                v-on:input="onSheetChange"
                label="Select"
                single-line
                bottom
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>ID Filed:</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-bind:items="filedNames"
                v-if="ifShowSelectField"
                v-model="selectedIDFiledName"
                label="Select"
                single-line
                bottom
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>Entry Filed:</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-bind:items="filedNames"
                v-if="ifShowSelectField"
                v-model="selectedEntryFiledName"
                label="Select"
                single-line
                bottom
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>Defination Filed:</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-bind:items="filedNames"
                v-if="ifShowSelectField"
                v-model="selectedDefFieldName"
                label="Select"
                single-line
                bottom
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12>
               <div class="text-xs-center">
              <v-btn round color="primary" dark @click.stop="renderTable">Rounded Button</v-btn>
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
  data: function() {
    return {
      //
      sheet: null,
      filedNames:[],
      selectedSheetName: null,
      selectedIDFiledName: null,
      selectedEntryFiledName: null,
      selectedDefFieldName:null,
      ifShowSelectSheet: true,
      ifShowSelectField: false,
      canRender:false,
    };
  },
  computed: {
    workbook:function(){
      if(this.$store.state.workbook){
        return this.$store.state.workbook;
      }else{
        return false;
      }
      
    },
    fisrtSheet: {
      get: function() {
        const first_worksheet = this.$store.state.workbook.Sheets[
          this.$store.state.workbook.SheetNames[0]
        ];
        return XLSX.utils.sheet_to_json(first_worksheet, {
          header: 1
        });
      },
      set: function() {
      }
    },
    sheetNames: function(){
      if(this.workbook){
        return this.$store.state.workbook.SheetNames
      }else{
        return []
      }
    }
  },
  watch: {
    // console.log(this.workbook)
  },
  mounted () {
  },
  methods:{
    onSheetChange: function(){
      this.ifShowSelectField = true

      const worksheet = this.$store.state.workbook.Sheets[this.selectedSheetName];
      this.sheet = XLSX.utils.sheet_to_json(worksheet, {
          header: 1
        });
      this.filedNames=this.sheet[0]
    },
    renderTable: function(){
      const indexID =this.filedNames.indexOf(this.selectedIDFiledName)
      const indexEntry = this.filedNames.indexOf(this.selectedEntryFiledName)
      const indexDef = this.filedNames.indexOf(this.selectedDefFieldName)

      // console.log(indexID,indexEntry,indexDef)

      let renderResult=[]
      this.sheet.forEach(function(element){
        let id=element[indexID]
        let entry=element[indexEntry]
        let def=element[indexDef]
        renderResult.push({
          "id":id,
          "entry":entry,
          "def":def
        })
        
      })
      this.$store.commit('updateWorkData',renderResult)
      // console.log(this.$store.state.workData)
      this.$router.push('/display')
    }
  }
};
</script>
