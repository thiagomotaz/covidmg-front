<template>
  <div>
    <v-progress-linear indeterminate color="primary" v-if="requests > 0"></v-progress-linear>
    <Header />
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col>
          <transition name="fade">
            <router-view ></router-view>
          </transition>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
// eslint-disable-next-line import/named
import { EventBus } from '@/event-bus';
import Header from './core/Header.vue';
import Footer from './core/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  created() {
    EventBus.$on('requests', (payload) => {
      this.requests = payload;
    });
  },
  data() {
    return {
      requests: 0,
    };
  },
};
</script>
