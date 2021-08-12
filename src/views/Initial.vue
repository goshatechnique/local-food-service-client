<template>
  <div class="initial">
    <LoginForm />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginForm from '../components/LoginForm.vue';
export default {
  name: 'Initial',
  components: {
    LoginForm,
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user: {
      immediate: true,
      handler(value) {
        if (value) this.$router.push({ path: '/home' });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.initial {
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
