<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Recuperar senha</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <VTextFieldWithValidation
                  rules="required|email"
                  v-model="login"
                  label="E-mail"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn class="text-caption grey--text ml-3" :to="{ name: 'Login' }" plain
                >Login</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="handleSubmit(handleResetPassword)"
                :disabled="invalid || !validated"
                :loading="loading > 0"
                >Recuperar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'ResetPassword',
  components: {
    ValidationObserver,
  },
  data() {
    return {
      login: '',
      loading: 0,
    };
  },
  methods: {
    handleResetPassword() {
      this.loading += 1;

      this.$http
        .post('reset-password', { email: this.login })
        .then(() => {
          this.$notify({
            type: 'success',
            text: 'Senha recuperada com sucesso. Verifique seu e-mail.',
          });
        })
        .catch((err) => {
          console.log(err);
          this.$notify({ type: 'error', text: 'Erro ao recuperar senha.' });
        })
        .then(() => {
          this.loading -= 1;
        });
    },
  },
};
</script>
