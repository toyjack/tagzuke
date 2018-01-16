<template>
  <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>{{name}} </v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-bind:items="items"
                v-model="selectedItemName"
                v-on:input="onChange"
                label="Select"
                single-line
                bottom
              ></v-select>
            </v-flex>
          </v-layout>
</template>

<script>
export default {
    props: ['name','items',],
  data () {
      return {
        selectedItemName: null,
      }
  },
  methods: {
      onChange:function(){
          this.$emit('send-data', this.selectedItemName)
      }
  }
}
</script>
