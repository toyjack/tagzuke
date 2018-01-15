<template>
  <v-app>
  <nav-bar title="test" v-if="ifNavBar"></nav-bar>
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
      ifNavBar: false
    };
  },
  mounted () {
      console.log(this.$router.options.routes)
  },
  methods: {
    toggleNavBar:function(){
      this.ifNavBar = !this.ifNavBar
    }
  }
};
</script>

<style>

</style>
