<template>
  <div class="container">
    <ProductPopup
      v-if="isProductPopupVisible"
      :switchProductPopup="switchProductPopup"
      :selectedProduct="selectedProduct"
    />
    <GmapMap
      v-if="productsList.length > 0"
      :center="{
        lat: this.currentCoordinates.lat,
        lng: this.currentCoordinates.lng,
      }"
      :zoom="9"
      style="width: 100%"
    >
      <GmapMarker
        v-for="(product, index) in productsList"
        :key="index"
        :position="product.location"
        @click="switchProductPopup(product)"
      />
    </GmapMap>
    <div class="products-list">
      <Product
        v-for="(product, index) in productsList"
        :key="index"
        :name="product.name"
        :price="product.price"
        :location="product.location"
        :description="product.description"
        :id="product._id"
        :ownerId="product.ownerId"
        :highlightedItemId="highlightedItemId"
        :switchProductPopup="switchProductPopup"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Product from './Product.vue';
import ProductPopup from './ProductPopup.vue';
export default {
  name: 'Marketplace',
  components: {
    Product,
    ProductPopup,
  },
  data: function () {
    return {
      highlightedItemId: '',
      isProductPopupVisible: false,
      selectedProduct: {},
    };
  },
  methods: {
    ...mapActions(['fetchProducts']),
    ...mapMutations(['updateCurrentCoordinates']),
    getCurrentLocation: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.updateCurrentCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    },
    switchProductPopup: function (product) {
      this.selectedProduct = product;
      this.isProductPopupVisible = !this.isProductPopupVisible;
      if (product) {
        this.highlightedItemId = product._id;
      } else {
        this.highlightedItemId = '';
      }
    },
  },
  computed: {
    ...mapGetters(['productsList', 'currentCoordinates']),
  },
  mounted() {
    this.getCurrentLocation();
  },
  watch: {
    currentCoordinates: function (value) {
      this.fetchProducts({
        lat: value.lat,
        lng: value.lng,
        name: '',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  grid-area: marketplace;
  display: grid;
  grid-template-rows: minmax(250px, 1fr) minmax(250px, 1fr);
}
.products-list {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
</style>
