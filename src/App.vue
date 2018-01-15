<template>
  <v-app>
    <nav-bar title="test"></nav-bar>

    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="toggleNavBar"></v-toolbar-side-icon>
      <v-toolbar-title>{{$route.name}}</v-toolbar-title>
    </v-toolbar>

    <v-content>
        <router-view>
        </router-view>
    </v-content>

    <v-footer app></v-footer>
 </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ifShowNavBar: {
      get: function() {
        return this.$store.state.ifShowNavBar;
      },
      set: function() {
        return;
      }
    }
  },
  mounted() {
    // console.log(this.$store.state.ifShowNavBar);
  },
  methods: {
    toggleNavBar: function() {
      this.$store.commit("toggleNavBar");
    }
  }
};
</script>

<style>

</style>
