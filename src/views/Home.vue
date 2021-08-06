<template>
  <div class="home">
    <h1>Home page</h1>
    <pre>{{ this.user }}</pre>
    <button @click="logoutFn">logout</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'Home',
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
}
</style>
