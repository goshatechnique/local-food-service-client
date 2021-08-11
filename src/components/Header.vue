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
$textColor: #314252;
$whiteColor: #ffffff;
$linkColor: #28349b;
$grayColorLight: #eeeeee;
$grayColor: #e1e1e1;
$grayColorDark: #757575;
$greenColor: #47d1af;
$greenColorLight: #bae6d5;
$greenColorLight2: #c7ebdf;
$greenColorLight3: #e3f9f5;
$orangeColor: #dba614;
$redColor: #c42e1a;

.container {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid $greenColor;
  background-color: $greenColorLight3;
}

.header-logo {
  margin-left: 25px;
  padding: 5px 10px;
  font-size: 1.5em;
  font-weight: bold;
  user-select: none;
  background-color: $greenColor;
  color: $whiteColor;
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
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
}

@media all and (max-width: 1024px) {
  .header-logo {
    margin-left: 20px;
    font-size: 1.3em;
  }
}

@media all and (max-width: 768px) {
  .header-logo {
    margin-left: 15px;
    font-size: 1.1em;
  }
}

@media all and (max-width: 500px) {
  .header-logo {
    margin-left: 10px;
    font-size: 0.9em;
  }
}
</style>
