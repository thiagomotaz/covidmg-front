<template>
  <Page title="FAQ">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header>Item</v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
  </Page>
</template>

<script>
import Page from '../components/dashboard/core/Page.vue';

export default {
  name: 'Faq',
  components: {
    Page,
  },
};
</script>
