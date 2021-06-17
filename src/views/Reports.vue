<template>
  <Page title="Relatorios">
    <CasesTable />
  </Page>
</template>

<script>
import CasesTable from '../components/dashboard/cases/CasesTable.vue';
import Page from '../components/dashboard/core/Page.vue';

export default {
  name: 'Reports',
  components: {
    CasesTable,
    Page,
  },
};
</script>
