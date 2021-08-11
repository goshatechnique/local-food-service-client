<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from './components/Header';
import { getWithExpiry } from './helpers/helpers';

export default {
  name: 'App',
  components: {
    Header,
  },
  methods: {
    ...mapActions(['fetchCurrentUser']),
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    if (getWithExpiry('token')) this.fetchCurrentUser();
  },
  watch: {
    user: function (value) {
      if (value?.id !== undefined) {
        this.$route.name === 'Home' ? null : this.$router.push('/home');
      }
    },
  },
};
</script>

<style lang="scss">
$textColor: #314252;
$greenColor: #3fba83;

* {
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  color: $textColor;
}
body {
  padding: 0;
  margin: 0;
  background-color: $greenColor;
}

.app {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'header'
    'main';
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
}
</style>
