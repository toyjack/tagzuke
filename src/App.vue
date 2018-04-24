<template>
  <v-app>
    <v-navigation-drawer fixed app v-model="showNavBar">
      <v-toolbar flat dark class="light-green darken-3">
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              メニュー
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in navMenus" :key="item.title" @click="$router.push(item.path);">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense class="pt-0">

      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed dark app class="light-green darken-1">
      <v-toolbar-side-icon @click.stop="showNavBar=!showNavBar"></v-toolbar-side-icon>
      <v-toolbar-title>{{$route.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon href="https://github.com/toyjack/tagzuke" target="_blank">
        <v-icon large>fa-github</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view>
      </router-view>
    </v-content>

    <v-footer app>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <p class="text-xs-center">Copyright&copy;2018
                <a href="mailto:toyjack@gmail.com">Liu Guanwei</a>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        showNavBar: null,
        navMenus: [{
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
            icon: 'picture_in_picture',
            path: '/display'
          },
          {
            title: '確認＆保存',
            icon: 'save',
            path: '/conform'
          },
          {
            title: "アバウト",
            icon: "info",
            path: "/about"
          }
        ]

      };
    },
    methods: {

    }
  };

</script>

<style>


</style>
