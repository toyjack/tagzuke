<template>
  <v-layout row wrap>
    <v-dialog v-model="editDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">注文修正</v-card-title>
        <v-card-text>
            <v-text-field name="fixedDef" label="注文を入力してください" multi-line v-model="fixedDef"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="editDialog = false">キャンセル</v-btn>
          <v-btn color="green darken-1" flat @click.native="editDialog = false">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs8>
      <record v-for="(item,index) in workData" :item="item" :key="index" @editDef="editDef(index)"></record>
      <!-- <v-layout row v-for="(item,index) in workData" :key="index">
        <v-flex xs2>{{workData[index].id}}</v-flex>
        <v-flex xs2>{{item.entry}}</v-flex>
        <v-flex xs7>
          {{item.def}}
        </v-flex>
        <v-flex xs1>
          <v-btn @click.stop="editDef(index)">修正</v-btn>
        </v-flex>
      </v-layout> -->

    </v-flex>
    <v-flex xs4></v-flex>
  </v-layout>
</template>

<script>
  import Record from '../components/Record.vue'
  export default {
    name: 'display',
    components:{
      record: Record
    },
    data: function () {
      return {
        editDialog: false,
        fixedDef: '',
        fixedDefIndex:''
      }
    },
    computed: {
      separator: function () {
        return this.$store.state.separator
      },
      workData: function () {
        //くそ醜い///
        return this.$store.state.workData.map(function (item) {
          return item
        })
      }
    },
    methods: {
      editDef: function (index) {
        this.editDialog = true
        this.fixedDefIndex= index
        this.fixedDef = this.workData[index].def
      }
    }
  }

</script>