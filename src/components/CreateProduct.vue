<template>
  <div class="container">
    <button class="container-create-btn" @click="switchCreateProduct">CREATE PRODUCT</button>
    <div v-if="isCreateProductVisible" @click="switchCreateProduct" class="overlay">
      <form
        @click.stop
        class="overlay-background"
        enctype="multipart/form-data"
        @submit.prevent="createProduct"
        action="/product-create"
        method="post"
      >
        <h1>Create product:</h1>
        <div class="overlay-alert">
          <div class="overlay-alert-text">{{ this.warnMessage }}</div>
        </div>
        <input v-bind:class="[warnMessage && name === '' ? 'input-warning' : '', 'input']" type="text" v-model="name" placeholder="Product name" />
        <input v-bind:class="[warnMessage && price === '' ? 'input-warning' : '', 'input']" type="text" v-model="price" placeholder="Product price" />
        <div class="input-background">
          <input
            v-bind:class="[warnMessage && location === '' ? 'input-warning' : '', 'input']"
            type="text"
            v-model="location"
            placeholder="location"
            @change="defineLocationByCity"
          />
        </div>
        <textarea
          v-bind:class="[warnMessage && description === '' ? 'input-warning' : '', 'input input-textarea']"
          type="text"
          v-model="description"
          placeholder="Type description"
        />
        <div>
          <img class="image" v-if="imageUrl" :src="imageUrl" />
        </div>
        <div v-bind:class="[warnMessage && imageUrl === '' ? 'input-file-background-warning' : '', 'input-file-background']">
          <input class="input-file" type="file" name="file" id="file" ref="file" accept="image/*" @change="pickImage" />
          <label class="input-file-label" for="file"> PICK IMAGE </label>
        </div>

        <button class="button" :disabled="isLocationUpdating" type="submit">CREATE PRODUCT</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
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
      imageUrl: '',
      isLocationUpdating: false,
      warnMessage: '',
    };
  },
  methods: {
    ...mapActions(['postProduct']),
    ...mapMutations(['updateCurrentCoordinates']),
    collectProductData: function () {
      if (this.name && this.price && this.description && this.location && this.currentCoordinates.lat && this.currentCoordinates.lng && this.image) {
        const imageData = new FormData();
        imageData.append('file', this.image);
        imageData.append(
          'product',
          JSON.stringify({
            ownerId: this.user._id,
            name: this.name,
            price: this.price,
            phoneNumber: this.user.phoneNumber,
            description: this.description,
            location: Object.assign({ name: this.location }, this.currentCoordinates),
          }),
        );
        return imageData;
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
      try {
        if (this.location === '') return;
        this.isLocationUpdating = true;
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`,
        );
        if (data?.status === 'ZERO_RESULTS') {
          this.updateCurrentCoordinates({ lat: null, lng: null });
          this.warnMessage = 'Incorrect location';
        }
        if (data?.status === 'OK') {
          this.updateCurrentCoordinates({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          });
        }
        this.isLocationUpdating = false;
      } catch (error) {
        console.error('CreateProduct.js defineLocationByCity() | Error: ', error);
      }
    },
    defineLocationByCoords: async function (lat, lng) {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=${process.env.VUE_APP_GOOGLE_API_KEY}`,
        );
        if (data?.status === 'OK') {
          this.location = data?.plus_code?.compound_code?.includes(' ')
            ? data?.plus_code?.compound_code?.split(' ').slice(1).join(' ')
            : data?.results[0].formatted_address;
        }
      } catch (error) {
        console.error('CreateProduct.js defineLocationByCoords() | Error: ', error);
      }
    },
    switchCreateProduct: function () {
      this.name = '';
      this.price = '';
      this.description = '';
      this.warnMessage = '';
      this.image = null;
      this.imageUrl = '';
      this.isCreateProductVisible = !this.isCreateProductVisible;
    },
    pickImage() {
      const image = this.$refs.file.files[0];
      this.image = image;
      this.imageUrl = URL.createObjectURL(image);
    },
  },
  computed: {
    ...mapGetters(['user', 'currentCoordinates']),
  },
  watch: {
    user: {
      immediate: true,
      handler(value) {
        this.location = value.city + ', ' + value.country;
        this.defineLocationByCity();
      },
    },
    isCreateProductVisible: {
      immediate: true,
      handler(value) {
        if (value) this.defineLocationByCoords(this.currentCoordinates.lat, this.currentCoordinates.lng);
      },
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
  margin: 25px 0px 0px 0px;
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

.input-file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  &-background {
    width: 80%;
    height: 55px;
    box-sizing: border-box;
    border: none;
    outline: none;
    transition: 0.5s;
    background-color: $greenColor;
    border: 1px solid $greenColor;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $whiteColor;
    cursor: pointer;
    &:hover {
      border: 1px solid $greenColor;
      color: $greenColor;
      background-color: $whiteColor;
    }
    &-warning {
      border-bottom: 1px solid $orangeColor;
    }
  }
  &-label {
    cursor: pointer;
    color: inherit;
    &:hover {
      color: inherit;
    }
  }
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
}

@media all and (max-width: 1024px) {
  .container-create-btn {
    font-size: 0.9em;
  }
  .overlay {
    &-background {
      width: 360px;
    }
  }
}

@media all and (max-width: 768px) {
  .container {
    margin: 10px;
    width: 100%;
  }
  .container-create-btn {
    font-size: 0.8em;
  }
}
</style>
