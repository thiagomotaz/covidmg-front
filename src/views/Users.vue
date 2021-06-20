<template>
  <Page title="Usuários" v-permissions="'admin'">
      <UsersTable/>
  </Page>
</template>

<script>
import UsersTable from '../components/dashboard/users/UsersTable.vue';
import Page from '../components/dashboard/core/Page.vue';

export default {
  name: 'Users',
  components: {
    Page,
    UsersTable,
  },
};
</script>
