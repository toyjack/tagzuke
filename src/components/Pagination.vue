<template>
  <div class="text-xs-center">
      <v-pagination :length="6" v-model="page"></v-pagination>
  </div>
</template>

<script>
export default {
  name:'pagination',
  props:['pageNum']
}
</script>
