<template>
  <v-layout row>
    <v-flex xs2>{{item.id}}</v-flex>
    <v-flex xs2>{{item.entry}}</v-flex>
    <v-flex xs7>
      <template v-for="(def,index1) in item">
        <span :class="tagStyle[def.type]" :key="index1">
          {{def.text}}
        </span>
        <span v-if="index1<def.length">,</span>
      </template>
    </v-flex>
    <v-flex xs1>
      <v-btn @click.stop="editDef">修正</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "record",
    props: ['item'],
    data: function () {
      return {
        defs: [],
      };
    },
    computed: {
      separator: function () {
        return this.$store.state.separator
      },
      tagStyle: function () {
        return this.$store.state.tagStyle
      },
    },
    created: function () {
      // let defs = this.item.def.split(this.separator)
      // for (let j = 0; j < defs.length; j++) {
      //   let ele = defs[j]
      //   let regex = /(<([^>]+)>)/gi
      //   let type = ele.match(regex)
      //   let text = ele.replace(regex, "")
      //   if (type) {
      //     this.defs.push({
      //       "type": type[0],
      //       "text": text
      //     })
      //   } else {
      //     this.defs.push({
      //       "type": "",
      //       "text": text
      //     })
      //   }
      // }
    },
    methods: {
      editDef: function () {
        this.$emit('editDef', '')
      }
    }
  };

</script>
