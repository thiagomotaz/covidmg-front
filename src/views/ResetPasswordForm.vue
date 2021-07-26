<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center" v-if="token">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Recuperação de senha</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <VTextFieldWithValidation
                  rules="required"
                  vid="confirmation"
                  v-model="password"
                  label="Senha"
                  name="password"
                  prepend-icon="mdi-account"
                  type="text"
                />
                <VTextFieldWithValidation
                  rules="required|confirmed:confirmation"
                  v-model="password_confirmation"
                  label="Confirmação de senha"
                  name="password_confirmation"
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
                @click="handleSubmit(handleChangePassword)"
                :disabled="invalid || !validated"
                :loading="loading > 0"
                >Alterar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" v-else>
        Pagina nao encontrada.
      </v-row>
    </v-container>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'ResetPasswordForm',
  components: {
    ValidationObserver,
  },
  data() {
    return {
      password: null,
      password_confirmation: null,
      validToken: false,
      token: '',
      loading: 0,
    };
  },
  created() {
    this.fetchToken();
  },
  methods: {
    fetchToken() {
      this.$http.get(`reset-password/${this.$route.params.token}`).then((response) => {
        this.validToken = response.data.status ?? false;
        this.token = response.data.token ?? null;
      });
    },
    handleChangePassword() {
      this.loading += 1;
      this.$http
        .post('change-password', {
          token: this.token,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(() => {
          this.$router.push({ name: 'Login' });
          this.$notify({ type: 'success', text: 'Senha alterada com sucesso.' });
        })
        .catch(() => {
          this.$notify({ type: 'error', text: 'Erro ao alterar senha.' });
        })
        .then(() => {
          this.loading -= 1;
        });
    },
  },
};
</script>
