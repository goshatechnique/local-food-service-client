<template>
  <div class="container">
    <ProductPopup
      v-if="isProductPopupVisible"
      :switchProductPopup="switchProductPopup"
      :selectedProduct="selectedProduct"
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
          lat: this.currentCoordinates.lat,
          lng: this.currentCoordinates.lng,
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
      <div class="products-list-message" v-if="productsList.length === 0">
        <h1 class="products-list-message-text">
          We can't find any proposal in this area and near
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Product from './Product.vue';
import ProductPopup from './ProductPopup.vue';
import YourLocationImg from '../assets/svg/your-location.svg';
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
      yourLocation: YourLocationImg,
      defaultMapCoordinates: {
        lat: null,
        lng: null,
      },
      isDefaultGetted: false,
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
      if (
        el.srcElement.offsetHeight + el.srcElement.scrollTop >=
        el.srcElement.scrollHeight
      ) {
        this.updatePageNumber(this.pageNumber + 1);
      }
    },
    handleClick: function (data) {
      this.updatePageNumber(1);
      this.updateCurrentCoordinates({
        lat: data.latLng.lat(),
        lng: data.latLng.lng(),
      });
    },
  },
  computed: {
    ...mapGetters([
      'productsList',
      'currentCoordinates',
      'searchString',
      'pageNumber',
      'user',
    ]),
  },
  watch: {
    pageNumber: {
      immediate: true,
      handler(value) {
        this.fetchProducts({
          lat: this.currentCoordinates.lat,
          lng: this.currentCoordinates.lng,
          name: this.searchString,
          pageNumber: value,
        });
      },
    },
    currentCoordinates: {
      immediate: true,
      handler(value) {
        if (value.lat === null && value.lng === null) {
          return;
        }
        if (!this.isDefaultGetted) {
          this.defaultMapCoordinates.lat = value.lat;
          this.defaultMapCoordinates.lng = value.lng;
          this.isDefaultGetted = true;
        }
        this.fetchProducts({
          lat: value.lat,
          lng: value.lng,
          name: this.searchString,
          pageNumber: 1,
        });
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
