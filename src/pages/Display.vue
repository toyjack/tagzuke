<template>
  <v-layout row wrap>
    <v-flex xs8>
      <v-data-iterator content-tag="v-layout" row wrap :items="items">
        <v-flex slot="item" slot-scope="props" xs12>
          <v-card>
            <v-card-title>
              <h2>{{props.item.entry}}</h2>
            </v-card-title>
            <span v-for="(ele,index) in props.item.def" :key="index" :class="tagStyle[ele.type]" @click="changeType">
              {{ele.text}}
            </span>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-flex>
    <v-flex xs4>
      <h2>タグ：</h2>
      <span v-for="tag in tags" :key="tag">
        {{tag}}:{{tagStyle[tag]}}
        <br>
      </span>
      <v-flex row>
        <v-btn @click.stop="save">Save</v-btn>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
  import XLSX from 'xlsx'

  export default {
    data() {
      return {
        //
      };
    },
    mounted: function () {
      //render
    },
    computed: {
      separator: function () {
        return this.$store.state.separator
      },
      items: function () {
        let sheet = this.$store.state.workData
        let tempTags = []
        let result = []
        for (let i = 0; i < sheet.length; i++) {
          let line = sheet[i]
          let def = (line.def || '').split(this.separator);
          let parsedDef = []
          for (let j = 0; j < def.length; j++) {
            let ele = def[j]
            let regex = /(<([^>]+)>)/gi
            let type = ele.match(regex)
            let text = ele.replace(regex, "")
            if (type) {
              tempTags.push(type[0])
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
          let newLine = {
            id: line.id,
            entry: line.entry,
            def: parsedDef
          }
          result.push(newLine)

        }
        //unique array
        tempTags=Array.from(new Set(tempTags))
        this.$store.commit('updateTags', tempTags)

        return result
      },
      tagStyle: function () {
        return this.$store.state.tagStyle
      },
      tags: function () {
        return this.$store.state.tags
      }
    },
    methods: {
      save: function () {
        //
        let result=[]
        for(let i=0;i<this.items.length;i++){
          let line=this.items[i]
          let newDef=""
          if(Array.isArray(line.def)){
            for(let j=0;j<line.def.length;j++){
              let ele=line.def[j]
              let startTag=ele.type
              let text=ele.text
              let endTag=ele.type.replace(/</,'</')
              if(newDef===""){
                newDef=startTag+text+endTag
              }else{
                newDef=newDef+"　"+startTag+text+endTag
              }
            }
            line.def=newDef
          }
          result.push({
            id:line.id,
            entry:line.entry,
            def:newDef
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
        var ws_name = "シート１";
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, 'out.xlsb');
      },
    }
  };

</script>
