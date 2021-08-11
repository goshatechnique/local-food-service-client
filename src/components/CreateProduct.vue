<template>
  <div class="container">
    <button class="container-create-btn" @click="switchCreateProduct">
      CREATE PRODUCT
    </button>
    <div
      v-if="isCreateProductVisible"
      @click="switchCreateProduct"
      class="overlay"
    >
      <div @click.stop class="overlay-background">
        <h1>Create product:</h1>
        <div class="overlay-alert">
          <div class="overlay-alert-text">{{ this.warnMessage }}</div>
        </div>
        <input
          v-bind:class="[
            warnMessage && name === '' ? 'input-warning' : '',
            'input',
          ]"
          type="text"
          v-model="name"
          placeholder="Product name"
        />
        <input
          v-bind:class="[
            warnMessage && price === '' ? 'input-warning' : '',
            'input',
          ]"
          type="text"
          v-model="price"
          placeholder="Product price"
        />
        <div class="input-background">
          <input
            v-bind:class="[
              warnMessage && location === '' ? 'input-warning' : '',
              'input',
            ]"
            type="text"
            v-model="location"
            placeholder="location"
            @change="defineLocationByCity"
          />
          <img
            :src="LocationImg"
            alt="#"
            class="location"
            title="Get current location"
            @click="refreshLocation"
          />
        </div>
        <textarea
          v-bind:class="[
            warnMessage && description === '' ? 'input-warning' : '',
            'input input-textarea',
          ]"
          type="text"
          v-model="description"
          placeholder="Type description"
        />
        <!-- <div class="image-container">
          <img class="image" v-if="imageUrl" :src="imageUrl" />
        </div>
        <input
          class="input-file"
          type="file"
          name="image"
          ref="file"
          accept="image/*"
          @change="pickImage"
        /> -->
        <button
          @click="createProduct"
          :disabled="isLocationUpdating"
          class="button"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import LocationSvg from '../assets/svg/location.svg';
export default {
  name: 'CreateProduct',
  data() {
    return {
      isCreateProductVisible: false,
      name: '',
      price: '',
      description: '',
      location: '',
      image: null,
      imageUrl: null,
      currentCoordinates: {
        lat: 0,
        lng: 0,
      },
      LocationImg: LocationSvg,
      isLocationUpdating: false,
      warnMessage: '',
    };
  },
  methods: {
    ...mapActions(['postProduct']),
    collectProductData: function () {
      if (
        this.name &&
        this.price &&
        this.description &&
        this.location &&
        this.currentCoordinates.lat &&
        this.currentCoordinates.lng
      ) {
        return {
          ownerId: this.user.id,
          name: this.name,
          price: this.price,
          description: this.description,
          location: Object.assign(
            { name: this.location },
            this.currentCoordinates,
          ),
        };
      } else {
        this.warnMessage = 'Fill all fields!';
      }
    },
    createProduct: async function () {
      this.warnMessage = '';
      const newProduct = this.collectProductData();
      if (newProduct) {
        this.postProduct(newProduct);
        this.switchCreateProduct();
      }
    },
    defineLocationByCity: async function () {
      if (this.location === '') return;
      this.isLocationUpdating = true;
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`,
      );
      if (data.status === 'ZERO_RESULTS') {
        this.currentCoordinates.lat = null;
        this.currentCoordinates.lng = null;
        this.warnMessage = 'Incorrect location';
      }
      if (data.status === 'OK') {
        this.currentCoordinates.lat = data.results[0].geometry.location.lat;
        this.currentCoordinates.lng = data.results[0].geometry.location.lng;
      }
      this.isLocationUpdating = false;
    },
    defineLocationByCoords: async function (lat, lng) {
      const { data } = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          lat +
          ',' +
          lng +
          '&sensor=false&key=' +
          process.env.VUE_APP_GOOGLE_API_KEY,
      );
      if (data.status === 'OK') {
        this.location = data.plus_code.compound_code
          .split(' ')
          .slice(1)
          .join(' ');
      }
    },
    getCurrentLocation: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentCoordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.defineLocationByCoords(
          position.coords.latitude,
          position.coords.longitude,
        );
      });
    },
    switchCreateProduct: function () {
      this.name = '';
      this.price = '';
      this.description = '';
      this.warnMessage = '';
      this.isCreateProductVisible = !this.isCreateProductVisible;
    },
    refreshLocation: function () {
      this.getCurrentLocation();
    },
    pickImage() {
      const image = this.$refs.file.files[0];
      this.image = image;
      this.imageUrl = URL.createObjectURL(image);
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user: function (value) {
      this.location = value.city + ', ' + value.country;
      this.defineLocationByCity();
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
$greenColorDark: #2e6d51;
$orangeColor: #dba614;
$redColor: #c42e1a;

.container {
  margin: 25px 0 25px 0;
  width: 100%;
}

.container-create-btn {
  border: 1px solid $greenColor;
  color: $greenColor;
  background-color: $whiteColor;
  outline: none;
  transition: 0.5s;
  height: 35px;
  width: 90%;
  box-sizing: border-box;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: $greenColor;
    border: 1px solid $whiteColor;
    color: $whiteColor;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
}

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
  &-background {
    width: 400px;
    background-color: $whiteColor;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  &-alert {
    height: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-text {
      color: $orangeColor;
    }
  }
}

.input {
  height: 35px;
  width: 80%;
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: 0.5s;
  padding-left: 10px;
  cursor: pointer;
  margin: 10px 0 10px 0;
  border: 1px solid $greenColor;
  background-color: $whiteColor;
  &-textarea {
    font-size: 0.7em;
    resize: none;
    height: 120px;
    padding: 5px;
  }
  &-background {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  &-warning {
    border-bottom: 1px solid $orangeColor;
  }
}

.location {
  width: 30px;
  cursor: pointer;
  position: absolute;
  right: 5px;
}

.button {
  height: 55px;
  width: 80%;
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: 0.5s;
  background-color: $greenColor;
  border: 1px solid $greenColor;
  padding-left: 10px;
  cursor: pointer;
  color: $whiteColor;
  margin: 25px 0 25px 0;
  &:hover {
    border: 1px solid $greenColor;
    color: $greenColor;
    background-color: $whiteColor;
  }
}

.image {
  width: 200px;
  height: 200px;
  &-container {
  }
}

.input-file {
}
</style>
