<template>
  <div class="initial">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Initial',
  components: {
    LoginForm,
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {},
  created() {
    if (this.user !== null) this.$router.push('/home');
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
