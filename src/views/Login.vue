<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
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

                <VTextFieldWithValidation
                  rules="required"
                  v-model="password"
                  id="password"
                  label="Senha"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn class="text-caption grey--text ml-3" :to="{ name: 'ResetPassword' }" plain
                >Esqueceu a senha?</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="handleSubmit(handleLogin)"
                :disabled="invalid || !validated"
                :loading="loading > 0"
                >Login</v-btn
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
  name: 'Login',
  components: {
    ValidationObserver,
  },
  data() {
    return {
      login: '',
      password: '',
      loading: 0,
    };
  },
  methods: {
    handleLogin() {
      const { login, password } = this;
      this.loading += 1;
      this.$store
        .dispatch('login', { login, password })
        .then(() => {
          this.$router.push({ name: 'Home' });
          this.$notify({ type: 'success', text: 'Login realizado com sucesso.' });
        })
        .catch(() => {
          this.$notify({ type: 'error', text: 'Erro ao realizar login.' });
        })
        .then(() => {
          this.loading -= 1;
        });
    },
  },
};
</script>
