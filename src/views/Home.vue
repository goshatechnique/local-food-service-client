<template>
  <div class="home">
    <Filters></Filters>
    <Marketplace></Marketplace>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
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
  methods: {
    ...mapMutations(['logout']),
    logoutFn: function () {
      this.logout();
      this.$router.push('/');
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
  overflow-y: scroll;
}
</style>
