<template>
  <div class="container">
    <div class="header-logo">Local food service</div>
    <div class="header-account" v-if="user">
      <div>Hello, {{ this.user.email }}</div>
      <img class="header-exit-btn" @click="logoutFn" :src="ExitImg" alt="#" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import ExitSvg from '../assets/svg/exit.svg';
export default {
  name: 'Header',
  data() {
    return {
      ExitImg: ExitSvg,
    };
  },
  methods: {
    ...mapMutations(['logout']),
    logoutFn: function () {
      this.logout();
      this.$router.push('/');
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>

<style lang="scss" scoped>
$grayColor: #e1e1e1;

.container {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid $grayColor;
}

.header-logo {
  padding-left: 25px;
  font-size: 1.5em;
  font-weight: bold;
  user-select: none;
}

.header-account {
  padding-right: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.header-exit-btn {
  padding-left: 15px;
  width: 30px;
  cursor: pointer;
}
</style>
