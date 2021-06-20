<template>
  <div>
    <span class="subtitle-1">Permissões</span>
    <v-row>
      <v-col v-for="permission in items" :key="permission">
        <v-checkbox
          v-model="selection"
          :label="permission"
          :value="permission"
        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import _differenceBy from 'lodash/differenceBy';

export default {
  name: 'Permissions',
  props: {
    actualPermissions: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.fetchPermissions();
  },
  data: () => ({
    selection: [],
    items: [],
  }),
  watch: {
    actualPermissions: {
      immediate: true,
      handler(to) {
        this.selection = to.map((item) => item.name);
      },
    },
    selection(to) {
      // Filter new one selecteds permissions for v-model
      this.$emit('newPermissions', _differenceBy(to, this.actualPermissions.map((item) => item.name)));
    },
  },
  methods: {
    fetchPermissions() {
      this.$http.get('roles').then((response) => {
        this.items = response.data.map((item) => item.name);
      });
    },
  },
};
</script>
