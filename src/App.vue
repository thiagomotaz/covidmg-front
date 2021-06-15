<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container class="px-4 py-0 fill-height" fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>

    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/dashboard/core/Header.vue';
import Footer from './components/dashboard/core/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
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
