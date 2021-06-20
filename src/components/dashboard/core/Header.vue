<template>
  <div>
    <v-app-bar app
      ><!--color="grey darken-4" dark-->
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Painel Covid MG</v-toolbar-title>
      <search></search>

      <v-icon @click="toggleTheme">{{
        $vuetify.theme.dark ? "mdi-brightness-5" : "mdi-brightness-2"
      }}</v-icon>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-icon class="ma-5" v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
        </template>

        <v-list>
          <v-list-item link :to="{ name: 'Profile' }" exact>
            <v-list-item-title>Meu perfil</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ name: 'Qea' }" exact>
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item link @click="logout()">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="sidebarMenu"
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
    >
      <!---->
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
      <v-list-item class="px-2" @click.stop="toggleMini = !toggleMini">
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
      <v-list v-if="permissions">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.href }"
          v-show="checkPermission(item.permissions)"
          exact
        >
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
import Search from './Search.vue';

export default {
  name: 'Header',
  components: {
    Search,
  },
  computed: {
    mini: {
      get() {
        return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
      },
      set(value) {
        this.toggleMini = value;
      },
    },
  },
  created() {
    this.name = JSON.parse(this.$store.getters.user).name;
    this.fetchPermisions();
  },
  data: () => ({
    name: null,
    sidebarMenu: true,
    toggleMini: false,
    permissions: null,
    items: [
      {
        title: 'Home',
        href: 'Home',
        icon: 'mdi-home-outline',
        permissions: [],
      },
      {
        title: 'Relatórios',
        href: 'Reports',
        icon: 'mdi-file-chart-outline',
        permissions: ['permissao1'],
      },
      {
        title: 'Usuários',
        href: 'Users',
        icon: 'mdi-account-group',
        permissions: ['permissao1'],
      },
    ],
    select: null,
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
    checkPermission(requiredPermissions) {
      if (this.permissions) {
        // If there is no permission needed
        if (!requiredPermissions.length) {
          return true;
        }
        // If permission needed is owned or is admin
        return (
          this.permissions.permissions.every((i) => requiredPermissions.includes(i))
          || this.permissions.is_admin
        );
      }
      return false;
    },
    fetchPermisions() {
      this.$http.get('permissions').then((response) => {
        this.permissions = response.data;
      });
      return [];
    },
  },
};
</script>

<style lang="sass">
$list-padding: 100px</style
>>
