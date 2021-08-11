<template>
  <div class="container">
    <CreateProduct v-if="user !== null && user.accountType === 'Seller'" />
    <div class="filters-header">Filters:</div>
    <input
      class="filters-input"
      v-model="searchString"
      placeholder="Product name..."
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CreateProduct from './CreateProduct';
export default {
  name: 'Filters',
  components: {
    CreateProduct,
  },
  data() {
    return {
      searchString: '',
    };
  },
  computed: {
    ...mapGetters(['user', 'currentCoordinates']),
  },
  methods: {
    ...mapActions(['fetchProducts']),
  },
  watch: {
    searchString: function (value) {
      this.fetchProducts({
        lat: this.currentCoordinates.lat,
        lng: this.currentCoordinates.lng,
        name: value,
      });
    },
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
$greenDark: #2e6d51;
$orangeColor: #dba614;
$redColor: #c42e1a;

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
</style>
