<template>
  <v-layout row wrap>
    <v-dialog v-model="editDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">修改釋文</v-card-title>
        <v-card-text>
          <v-text-field name="fixedDef" label="注文を入力してください" multi-line v-model="fixedDef"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="editDialog = false">取消</v-btn>
          <v-btn color="green darken-1" flat @click.native="editDialog = false">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs12>
      <v-layout row v-for="(item,index) in workData" :key="index">
        <v-flex xs2>{{workData[index].id}}</v-flex>
        <v-flex xs2>{{item.entry}}</v-flex>
        <v-flex xs7>
          <v-chip label v-for="(tag,index) in item.def" :key="index" :class="tagStyle[tag.type]">
            {{tag.text}}
          </v-chip>
        </v-flex>
        <v-flex xs1>
          <v-btn @click.stop="editDef(index)">修改</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'conform',
    data: function () {
      return {
        editDialog: false,
        fixedDef: '',
        fixedDefIndex: ''
      }
    },
    computed: {
      separator: function () {
        return this.$store.getters.separator
      },
      workData: function () {
        return this.$store.getters.workData
      },
      tagStyle: function () {
        return this.$store.getters.tagStyle
      },
    },
    methods: {
      editDef: function (index) {
        this.editDialog = true
        this.fixedDefIndex = index
        this.fixedDef = this.workData[index].def
      },
    }
  }

</script>
