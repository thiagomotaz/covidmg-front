<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {

  created() {
    // Checks if auth token is valid or has expired
    this.$http.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error);
        if (error.response.status === 401) {
          if (this.$store.getters.isLoggedIn) {
            this.$store.dispatch('refreshToken');
          } else {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
        return null;
      },
    );
  },
};
</script>
