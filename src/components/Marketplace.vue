<template>
  <div class="container">
    <ProductPopup
      v-if="isProductPopupVisible"
      :selectedProduct="selectedProduct"
      @switchProductPopup="switchProductPopup"
    />
    <GmapMap
      v-if="this.defaultMapCoordinates.lat && this.defaultMapCoordinates.lng"
      :center="{
        lat: this.defaultMapCoordinates.lat,
        lng: this.defaultMapCoordinates.lng,
      }"
      :zoom="6"
      style="width: 100%"
      @click="handleClick"
    >
      <GmapMarker
        :position="{
          lat: isLocationChanged ? this.currentCoordinates.lat : this.defaultMapCoordinates.lat,
          lng: isLocationChanged ? this.currentCoordinates.lng : this.defaultMapCoordinates.lng,
        }"
        :icon="yourLocation"
      />
      <GmapMarker
        v-for="(product, index) in productsList"
        :key="index"
        :position="product.location"
        @click="switchProductPopup(product)"
      />
    </GmapMap>
    <div class="products-list" @scroll="handleScroll">
      <Loader v-if="isLoading && productsList.length === 0" />
      <Product
        v-for="product in productsList"
        :key="product._id"
        :product="product"
        :highlightedItemId="highlightedItemId"
        :switchProductPopup="switchProductPopup"
      />
      <div class="products-list-message" v-if="!isLoading && productsList.length === 0">
        <h1 class="products-list-message-text">We can't find any proposal in this area and near</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import Product from './Product.vue';
import ProductPopup from './ProductPopup.vue';
import Loader from './Loader.vue';
import YourLocationImg from '../../public/your-location.svg';

export default {
  name: 'Marketplace',
  components: {
    Loader,
    Product,
    ProductPopup,
  },
  data: function () {
    return {
      highlightedItemId: '',
      isProductPopupVisible: false,
      selectedProduct: {},
      yourLocation: YourLocationImg,
      defaultMapCoordinates: {
        lat: 53.7169,
        lng: 27.9775,
      },
      isLocationChanged: false,
    };
  },
  methods: {
    ...mapActions(['fetchProducts']),
    ...mapMutations(['updatePageNumber', 'updateCurrentCoordinates']),
    switchProductPopup: function (product) {
      this.selectedProduct = product;
      this.isProductPopupVisible = !this.isProductPopupVisible;
      if (product) {
        this.highlightedItemId = product._id;
      } else {
        this.highlightedItemId = '';
      }
    },
    handleScroll: function (el) {
      if (el.srcElement.offsetHeight + el.srcElement.scrollTop >= el.srcElement.scrollHeight) {
        this.updatePageNumber(this.pageNumber + 1);
      }
    },
    handleClick: function (data) {
      this.isLocationChanged = true;
      this.updatePageNumber(1);
      this.updateCurrentCoordinates({
        lat: data.latLng.lat(),
        lng: data.latLng.lng(),
      });
    },
    defineLocationByCity: async function () {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${this.user.country},${this.user.city}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`,
        );
        if (data.status === 'OK') {
          const value = data.results[0].geometry.location;
          this.defaultMapCoordinates.lat = value.lat;
          this.defaultMapCoordinates.lng = value.lng;
        }
      } catch (error) {
        console.error('Marketplace.js defineLocationByCity() | Error: ', error);
      }
    },
  },
  computed: {
    ...mapGetters(['productsList', 'isLoading', 'currentCoordinates', 'searchString', 'pageNumber', 'user']),
  },
  watch: {
    pageNumber: function (value) {
      this.fetchProducts({
        lat: this.currentCoordinates.lat,
        lng: this.currentCoordinates.lng,
        name: this.searchString,
        pageNumber: value,
      });
    },
    currentCoordinates: {
      immediate: true,
      handler(value) {
        if (value.lat === null && value.lng === null) {
          return;
        }
        this.fetchProducts({
          lat: value.lat,
          lng: value.lng,
          name: this.searchString,
          pageNumber: this.pageNumber,
        });
      },
    },
    searchString: function (value) {
      this.fetchProducts({
        lat: this.currentCoordinates.lat,
        lng: this.currentCoordinates.lng,
        name: value,
        pageNumber: this.pageNumber,
      });
    },
    user: {
      immediate: true,
      handler(value) {
        if (value) this.defineLocationByCity();
      },
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
  &-message {
    display: flex;
    justify-content: center;
    align-items: center;
    &-text {
      padding: 10px;
    }
  }
}

@media all and (max-width: 768px) {
  .container {
    grid-template-rows: 1fr 350px;
  }
}
</style>
