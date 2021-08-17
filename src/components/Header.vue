<template>
  <div class="container">
    <div class="header-logo">Local food service</div>
    <div class="header-account" v-if="user">
      <div class="header-account-text">Hello, {{ this.user.email }}</div>
      <img
        class="header-exit-btn"
        @click="logoutFn"
        src="../../public/exit.svg"
        alt="#"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'Header',
  methods: {
    ...mapMutations(['logout', 'refreshProducts']),
    logoutFn: function () {
      this.logout();
      this.refreshProducts();
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

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
  .header-account {
    padding-right: 15px;
    &-text {
      font-size: 0.85em;
    }
  }
}

@media all and (max-width: 768px) {
  .header-logo {
    margin-left: 15px;
    font-size: 1.1em;
  }
  .header-account {
    padding-right: 15px;
    &-text {
      font-size: 0.75em;
    }
  }
}

@media all and (max-width: 500px) {
  .header-logo {
    margin-left: 10px;
    font-size: 0.9em;
    text-align: center;
    min-width: 160px;
  }
  .header-account {
    padding-right: 10px;
    &-text {
      font-size: 0.65em;
    }
  }
}
</style>
