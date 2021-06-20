<template>
  <v-data-table :headers="headers" :items="users" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuários</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Novo usuário
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <span class="subtitle-1">Informações básicas</span>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      :disabled="editedIndex > -1"
                      label="Email"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6" v-if="editedIndex === -1">
                    <v-text-field v-model="editedItem.password" label="Senha"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" v-if="editedIndex === -1">
                    <v-text-field
                      v-model="editedItem.password_confirmation"
                      label="Confirmação de senha"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-checkbox
                      v-model="editedItem.is_active"
                      label="Ativo"
                      hide-details
                      :true-value="1"
                      :false-value="0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-checkbox
                      v-model="editedItem.is_admin"
                      label="Admin"
                      hide-details
                      :true-value="1"
                      :false-value="0"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-divider class="mt-10 mb-10"></v-divider>
                <Permissions
                @newPermissions="actualSelectedRoles"
                :actualPermissions="editedItem.roles || []" />
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="550px">
          <v-card>
            <v-card-title class="text-h5"
              >Tem certeza que deseja excluir este usuário?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete()">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchUsers">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Permissions from '../core/Permissions.vue';

export default {
  name: 'UsersTable',
  components: {
    Permissions,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
    users: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      last_login: '',
      is_active: 1,
      is_admin: 0,
      password: '',
      password_confirmation: '',
      roles: null,
    },
    defaultItem: {
      name: '',
      email: '',
      last_login: '',
      is_active: 1,
      is_admin: 0,
      password: '',
      password_confirmation: '',
      roles: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo usuário' : 'Editar usuário';
    },
  },

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete();
    },

    editedItem(to) {
      console.log(to);
    },
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      this.$http.get('users').then((response) => {
        this.users = response.data;
      });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$http.delete(`users/${this.editedItem.id}`).then((response) => {
        if (response) {
          this.users.splice(this.editedIndex, 1);
          this.closeDelete();
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$http.put(`users/${this.editedItem.id}`, this.editedItem).then((response) => {
          if (response) {
            Object.assign(this.users[this.editedIndex], this.editedItem);
            this.close();
          }
        });
      } else {
        this.$http.post('users', this.editedItem).then((response) => {
          if (response) {
            console.log(this.editedItem);
            this.users.push(this.editedItem);
            this.close();
          }
        });
      }
    },
    actualSelectedRoles($event) {
      this.editedItem.newRoles = $event;
      console.log(this.editedItem);
    },
  },
};
</script>
