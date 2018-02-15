<template>
  <v-dialog v-model="dialog2" max-width="500px">
    <v-card>
      <v-card-title>
        Dialog 2
      </v-card-title>
      <v-card-text>
                <v-text-field name="input-1" box v-model="text"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="dialog2=false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  export default {
    name: "record",
    props: ['message'],
    data: function () {
      return {
        dialog2:true,
        text: this.message,
      };
    },
    mounted: function () {
      console.log(this.message)
    },
    methods: {
      //
    }
  };

</script>
