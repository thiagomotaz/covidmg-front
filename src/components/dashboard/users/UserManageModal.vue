<template>
  <v-dialog :value="showModal" @click:outside="$emit('close')" max-width="600px">
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
            @diffPermissions="actualSelectedRoles"
            :actualPermissions="editedItem.roles || []"
          />
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" text @click="$emit('save', editedItem)">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Permissions from '../core/Permissions.vue';

export default {
  name: 'UserManageModal',
  components: {
    Permissions,
  },
  props: {
    showModal: {
      default: false,
      required: true,
    },
    editedIndex: {
      default: -1,
      required: true,
    },
    editedItem: {
      default: {},
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo usuário' : 'Editar usuário';
    },
  },
  methods: {
    actualSelectedRoles($event) {
      this.editedItem.diffRoles = $event;
    },
  },
};
</script>
