<template>
    <v-breadcrumbs divider="/" :items="breadCrumbs" class="pb-0 pt pl-1"></v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    /**
     */
    breadCrumbs() {
      const pathArray = this.$route.path.split('/');
      pathArray.shift();
      const breadCrumbs = [];
      // needed to handle the intermediary entries for nested vue routes
      let breadcrumb = '';
      let lastIndexFound = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < pathArray.length; ++i) {
        breadcrumb = `${breadcrumb}${'/'}${pathArray[i]}`;
        if (
          this.$route.matched[i]
          && Object.hasOwnProperty.call(this.$route.matched[i], 'meta')
          && Object.hasOwnProperty.call(this.$route.matched[i].meta, 'breadCrumb')
        ) {
          breadCrumbs.push({
            href:
              i !== 0 && pathArray[i - (i - lastIndexFound)]
                ? `/${pathArray[i - (i - lastIndexFound)]}${breadcrumb}`
                : breadcrumb,
            disabled: i + 1 === pathArray.length,
            text: this.$route.matched[i].meta.breadCrumb || pathArray[i],
          });
          lastIndexFound = i;
          breadcrumb = '';
        }
      }
      return breadCrumbs;
    },
  },
};
</script>
