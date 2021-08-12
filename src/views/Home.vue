<template>
  <div class="home">
    <Filters></Filters>
    <Marketplace></Marketplace>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Filters from '../components/Filters.vue';
import Marketplace from '../components/Marketplace.vue';
export default {
  name: 'Home',
  components: {
    Filters,
    Marketplace,
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user: {
      immediate: true,
      handler(value) {
        if (!value) this.$router.push({ path: '/' });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  grid-area: main;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-auto-rows: 1fr;
  grid-template-areas:
    'filters marketplace'
    'filters marketplace';
  overflow: hidden;
}

@media all and (max-width: 1024px) {
  .home {
    grid-template-columns: 200px 1fr;
  }
}

@media all and (max-width: 768px) {
  .home {
    grid-template-columns: minmax(360px, 1fr);
    grid-auto-rows: 140px 1fr;
    grid-template-areas:
      'filters'
      'marketplace';
  }
}
</style>
