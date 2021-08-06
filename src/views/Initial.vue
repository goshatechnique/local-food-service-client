<template>
  <div class="initial">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'Initial',
  components: {
    LoginForm,
  },
  methods: {},
  mounted() {},
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
