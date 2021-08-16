<template>
  <div class="overlay" @click="switchProductPopup">
    <div @click.stop class="overlay-product">
      <img
        :src="decodedImage ? 'data:image/png;base64,' + decodedImage : noImage"
        :alt="'#'"
        class="product-image"
      />
      <div class="product-name-price">
        {{ selectedProduct.name }}, {{ selectedProduct.price }}
      </div>
      <div class="product-location">{{ selectedProduct.location.name }}</div>
      <div class="product-phone">{{ this.formattedPhoneNumber }}</div>
      <div class="product-description">
        {{ selectedProduct.description }}
      </div>
      <div class="product-button" @click="switchProductPopup">&times;</div>
    </div>
  </div>
</template>

<script>
import {
  arrayBufferToBase64,
  formatStringToPhoneNumber,
} from '../helpers/helpers';
import NoImagePng from '../../public/no-image.png';
export default {
  name: 'ProductPopup',
  data: function () {
    return {
      noImage: NoImagePng,
      decodedImage: null,
    };
  },
  props: {
    selectedProduct: {
      type: Object,
    },
    switchProductPopup: {
      type: Function,
    },
  },
  computed: {
    formattedPhoneNumber: function () {
      return formatStringToPhoneNumber(this.selectedProduct.phoneNumber);
    },
  },
  mounted() {
    try {
      this.decodedImage =
        typeof this.selectedProduct?.image?.data === 'string'
          ? this.selectedProduct.image.data
          : arrayBufferToBase64(this.selectedProduct.image.data.data);
    } catch (error) {
      this.decodedImage = null;
      console.error('ProductPopup.js mounted() | Error: ', error);
    }
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
$greenColorDark: #2e6d51;
$orangeColor: #dba614;
$redColor: #c42e1a;

.overlay {
  z-index: 2;
  transition: 0.5s;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &-product {
    width: 360px;
    background-color: $greenColor;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
}

.product-image {
  padding-top: 20px;
  width: 200px;
  height: 200px;
}

.product-name-price {
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
  padding: 10px;
}

.product-location {
  text-align: center;
  font-size: 0.9em;
}

.product-phone {
  font-size: 0.9em;
}

.product-description {
  font-size: 0.82em;
  padding: 10px;
  resize: none;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
  border: none;
  outline: none;
  background-color: $greenColor;
  display: inline;
  max-height: 100px;
  word-wrap: break-word;
}

.product-button {
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 2em;
  transition: 0.5s;
  opacity: 1;
  padding: 5px 10px;
  user-select: none;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
}
</style>
