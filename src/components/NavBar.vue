<template>
  <v-navigation-drawer fixed app v-model="ifShowNavBar">
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
  computed: {
    ifShowNavBar: {
      get: function() {
        return this.$store.state.ifShowNavBar;
      },
      set: function() {
        //
      }
    }
  },
  data() {
    return {
      // ifShowNavBar:this.ifShow,
      items: [
        {
          title: "Home",
          icon: "dashboard",
          path: "/"
        },
        {
          title: "Settings",
          icon: "settings",
          path: "/settings"
        },
        {
          title: 'Display',
          icon:'picture_in_picture',
          path: '/display'
        },
        {
          title: "About",
          icon: "info",
          path: "/about"
        }
      ]
    };
  },
  mounted() {
    // if (this.$store.state.ifShowNavBar) {
    //   this.$store.commit("toggleNavBar");
    // }
  },
  methods: {
    
  }
};
</script>
