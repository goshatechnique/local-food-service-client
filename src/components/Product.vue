<template>
  <div
    @click="switchProductPopup(product)"
    v-bind:class="{
      'product-container-highlighted': product._id === highlightedItemId,
      'product-container': true,
    }"
  >
    <div class="name">{{ product.name }}, {{ product.price }}</div>
    <div class="photo">
      <img
        :src="decodedImage ? 'data:image/png;base64,' + decodedImage : noImage"
        alt="#"
        class="photo-image"
      />
    </div>
    <div class="location">
      {{ product.location.name }}
    </div>
    <div class="description">{{ product.description }}</div>
    <div
      v-if="product.ownerId === user._id"
      @click.stop="deleteProductFn"
      class="delete"
    >
      &times;
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { arrayBufferToBase64 } from '../helpers/helpers';
import NoImagePng from '../../public/no-image.png';
export default {
  name: 'product',
  data() {
    return {
      noImage: NoImagePng,
      decodedImage: null,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['deleteProduct']),
    deleteProductFn: function () {
      this.deleteProduct(this.product._id);
    },
  },
  props: {
    product: {
      type: Object,
    },
    highlightedItemId: {
      type: String,
    },
    switchProductPopup: {
      type: Function,
    },
  },
  mounted() {
    try {
      this.decodedImage =
        typeof this.product.image?.data === 'string'
          ? this.product.image.data
          : arrayBufferToBase64(this.product.image.data.data);
    } catch (error) {
      this.decodedImage = null;
      console.error('Product.js mounted() | Error: ', error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.product-container {
  position: relative;
  margin: 10px 10px 0 10px;
  height: 100px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-auto-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'photo name'
    'photo location'
    'photo description';
  border: 1px solid $grayColorLight;
  border-radius: 15px;
  transition: 0.5s;
  &:hover {
    background-color: rgba($grayColor, 0.9);
    cursor: pointer;
  }
}

.product-container-highlighted {
  background-color: rgba($greenColorLight, 0.5);
}

.name {
  grid-area: name;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.photo {
  grid-area: photo;
  display: flex;
  justify-content: center;
  align-items: center;
  &-image {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
}

.location {
  grid-area: location;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  grid-area: description;
  padding-left: 20px;
  display: flex;
  align-items: center;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delete {
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 1.5em;
  transition: 0.5s;
  opacity: 0.8;
  padding: 5px 10px;
  user-select: none;
  &:hover {
    opacity: 1;
  }
}
</style>
