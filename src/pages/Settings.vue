<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <h2 v-show="!workbook">Settings</h2>
      <table v-if="workbook">
        <tr v-for="(row, index) in workbook" :key="index">
          <td v-for="(cell, indexCell) in row" :key="indexCell">
            {{cell}}
          </td>
        </tr>
      </table>
    </v-layout>
  </v-container>
</template>
<script>
import XLSX from "xlsx";

export default {
  name: "Settings",
  data: function() {
    return {
      //
    };
  },
  computed: {
    workbook: {
      get: function() {
        const first_worksheet = this.$store.state.workbook.Sheets[
          this.$store.state.workbook.SheetNames[0]
        ];
        return XLSX.utils.sheet_to_json(first_worksheet, {
          header: 1
        });
      },
      set: function() {
        //
      }
    }
  },
  watch: {
    // console.log(this.workbook)
  }
};
</script>
