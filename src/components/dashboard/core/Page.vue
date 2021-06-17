<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="12">
          <Breadcrumb/>
          <h1 class="font-weight-light py-3">{{ title }}</h1>
          <slot></slot>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue';

export default {
  name: 'Page',
  components: {
    Breadcrumb,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },

};
</script>
