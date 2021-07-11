<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-dialog :value="showModal" @click:outside="$emit('close')" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <span class="subtitle-1">Informações básicas</span>
            <v-form>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <VTextFieldWithValidation
                    rules="required"
                    v-model="editedItem.name"
                    label="Nome"
                    :editedIndex="editedIndex"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <VTextFieldWithValidation
                    rules="required|email"
                    v-model="editedItem.email"
                    label="Email"
                    :editedIndex="editedIndex"
                  />
                </v-col>

                <v-col cols="12" sm="6" md="6" v-if="editedIndex === -1">
                  <VTextFieldWithValidation
                    rules="required"
                    vid="confirmation"
                    v-model="editedItem.password"
                    label="Senha"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6" v-if="editedIndex === -1">
                  <VTextFieldWithValidation
                    rules="required|confirmed:confirmation"
                    v-model="editedItem.password_confirmation"
                    label="Confirmação de senha"
                  />
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
            </v-form>

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
          <v-btn
            color="blue darken-1"
            text
            @click="handleSubmit(submit)"
            :disabled="invalid || !validated"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate';
import Permissions from '../core/Permissions.vue';

export default {
  name: 'UserManageModal',
  components: {
    Permissions,
    ValidationObserver,
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
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo usuário' : 'Editar usuário';
    },
  },
  methods: {
    submit() {
      requestAnimationFrame(() => {
        this.$refs.obs.reset();
      });
      this.$emit('save', this.editedItem);
    },
    actualSelectedRoles($event) {
      this.editedItem.diffRoles = $event;
    },
  },
  watch: {
    editedIndex(to) {
      if (to === -1) {
        this.$refs.obs.reset();
      }
    },
  },
};
</script>
