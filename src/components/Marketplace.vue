<template>
  <div class="container">
    <GmapMap
      :center="{
        lat: this.currentCoordinates.lat,
        lng: this.currentCoordinates.lng,
      }"
      :zoom="9"
      style="width: 100%; height: 450px"
    >
      <GmapMarker
        v-for="(product, index) in productsList"
        :key="index"
        :position="product.location"
        @click="logMarker(product)"
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
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Product from './Product.vue';
export default {
  name: 'Marketplace',
  components: {
    Product,
  },
  methods: {
    ...mapActions(['fetchProducts']),
    ...mapMutations(['updateCurrentCoordinates']),
    logMarker: function (product) {
      console.log('product info: ', product);
    },
    getCurrentLocation: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.updateCurrentCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
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
}
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 350px;
  gap: 1em;
  padding: 1em;
}
</style>
