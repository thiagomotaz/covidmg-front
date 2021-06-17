<template>
  <div>
    <v-progress-linear indeterminate color="primary"></v-progress-linear>
    <Header />
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Header from './core/Header.vue';
import Footer from './core/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
