<template>
  <div class="container">
    <CreateProduct v-if="user !== null && user.accountType === 'Seller'" />
    <div class="filters-header">Filters:</div>
    <input class="filters-input" v-debounce:500ms="fetchProducts" type="text" placeholder="Product name..." />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CreateProduct from './CreateProduct';
export default {
  name: 'Filters',
  components: {
    CreateProduct,
  },
  data() {
    return {
      localSearchString: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapMutations(['updateSearchString', 'updatePageNumber']),
    fetchProducts: function (value) {
      this.updatePageNumber(1);
      this.updateSearchString(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.container {
  grid-area: filters;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: $greenColorLight3;
  border-right: 1px solid $greenColor;
}

.form-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0 20px 0;
}

.filters-header {
  padding: 20px;
  font-weight: bolder;
}

.filters-input {
  height: 35px;
  width: 90%;
  box-sizing: border-box;
  border: 1px solid $greenColor;
  outline: none;
  transition: 0.5s;
  color: $textColor;
}

@media all and (max-width: 1024px) {
  .filters-input {
    font-size: 0.9em;
  }
  .filters-header {
    padding: 12px;
  }
}

@media all and (max-width: 768px) {
  .filters-input {
    font-size: 0.8em;
    margin: 10px;
  }
  .filters-header {
    padding: 6px;
  }
}
</style>
