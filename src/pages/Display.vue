<template>
  <div>
      <v-data-table v-bind:headers="headers" v-bind:items="items">
          <template slot="items" slot-scope="props">
              <td>{{props.item.id}}</td>
              <td>{{props.item.entry}}</td>
              <td>{{props.item.def}}</td>
          </template>
      </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      headers:[
          {
              text:'ID',
              align:'left',
              value:'id',
              sortable:'true'
          },
          {
              text:'Entry',
              align:'left',
              value:'entry',
              sortable:'false'
          },
          {
              text:'Defination',
              align:'left',
              value:'def',
              sortable:'false'
          }
      ],
    //   items:[
    //       {
    //           id:"dsfsdfsdfsdf",
    //           entry:"fdfdfdf",
    //           def:"ffff"
    //       }
    //   ]
    };
  },
  computed: {
    items: function() {
        return this.$store.state.workData
    }
  }
};
</script>
