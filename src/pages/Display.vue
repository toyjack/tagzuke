<template>
  <v-layout row wrap>
    <v-flex xs8>
      <v-data-iterator content-tag="v-layout" row wrap :items="items">
        <v-flex slot="item" slot-scope="props" xs12>
          <v-card>
            <v-card-title>
              <h2>{{props.item.entry}}</h2>
            </v-card-title>
            {{props.item.def}}
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
      //
    },
    computed: {
      items: function () {
        return this.$store.state.workData

        // let def = (element[indexDef] || '').split(this.separator);

        //   let parsedDef=[]

        //   for(let i=0;i<def.length;i++){
        //     let ele=def[i]
        //     let regex = /(<([^>]+)>)/gi
        //     let type=ele.match(regex)
        //     let text=ele.replace(regex,"")
        //     if(type) {
        //       tempTags.push(type[0])
        //       parsedDef.push({
        //       "type":type[0],
        //       "text":text
        //     })
        //     }else{
        //       parsedDef.push({
        //       "type":null,
        //       "text":text
        //     })
        //     }
            
        //   }
      },
      tagStyle: function(){
        return this.$store.state.tagStyle
      },
      tags: function(){
        return this.$store.state.tags
      }
    },
    methods: {
      save: function(){
        //
        let app=this
        let ws=XSLX.utils.json_to_sheet(app.items,{header:[]})
      }
    }
  };

</script>
