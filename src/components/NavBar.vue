<template>
  <v-navigation-drawer fixed app v-model="ifShow">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.path);">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  props: ["ifShow"],
  data() {
    return {
      // ifShowNavBar:this.ifShow,
      items: [
        {
          title: "ファイルを開く",
          icon: "dashboard",
          path: "/"
        },
        {
          title: "設定",
          icon: "settings",
          path: "/settings"
        },
        {
          title: '表示',
          icon:'picture_in_picture',
          path: '/display'
        },
        {
          title: "アバウト",
          icon: "info",
          path: "/about"
        }
      ]
    };
  },
  // watch:{
  //   ifShow:function(val){
  //     this.$emit('showNavBar',{showNavBar : val})
  //   }
  // }
};
</script>
