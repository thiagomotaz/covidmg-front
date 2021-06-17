<template>
    <div>
        <v-app-bar app color="grey darken-4" dark>
        <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
        <v-toolbar-title>Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="logout">mdi-account</v-icon>
      </v-app-bar>
      <v-navigation-drawer
        v-model="sidebarMenu"
        app
        floating
        :permanent="sidebarMenu"
        :mini-variant.sync="mini"
        color="grey darken-4"
      >
        <v-list dense>
          <v-list-item>
            <v-list-item-action>
              <v-icon @click.stop="sidebarMenu = !sidebarMenu">mdi-chevron-left</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list-item class="px-2" @click="toggleMini = !toggleMini">
          <v-list-item-avatar>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="text-truncate">
            {{ name }}
          </v-list-item-content>
          <v-btn icon small>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
            <v-list-item-icon>
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
    },
  },
  created() {
    this.name = JSON.parse(this.$store.getters.user).name;
  },
  data: () => ({
    name: null,
    sidebarMenu: true,
    toggleMini: false,
    items: [
      { title: 'Home', href: '/home', icon: 'mdi-home-outline' },
      { title: 'Relatórios', href: '/reports', icon: 'mdi-file-chart-outline' },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style lang="sass">
  $list-padding: 100px
</style>>
