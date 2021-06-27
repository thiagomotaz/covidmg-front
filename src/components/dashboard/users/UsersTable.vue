<template>
  <v-data-table :headers="headers" :items="users" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuários</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="$emit('selected', { index: -1, item: {}, manage: true })"
        >
          Novo usuário
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchUsers()">
        Recarregar
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'UsersTable',
  components: {},
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Último login', value: 'last_login' },
      { text: 'Ativo', value: 'is_active' },
      { text: 'Admin', value: 'is_admin' },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
  }),

  methods: {
    editItem(item) {
      this.$emit('selected', { index: this.users.indexOf(item), item: { ...item }, manage: true });
    },

    deleteItem(item) {
      this.$emit('selected', { index: this.users.indexOf(item), item: { ...item }, delete: true });
    },
  },
};
</script>
