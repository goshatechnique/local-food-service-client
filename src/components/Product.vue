<template>
  <div
    @click="
      switchProductPopup({
        name,
        price,
        location,
        description,
        ownerId,
        _id: id,
      })
    "
    v-bind:class="[
      id === highlightedItemId ? 'product-container-highlighted' : '',
      'product-container',
    ]"
  >
    <div class="name">{{ name }}, {{ price }}</div>
    <div class="photo">
      <img :src="noImage" alt="#" class="photo-image" />
    </div>
    <div class="location">
      {{ location.name }}
    </div>
    <div class="description">{{ description }}</div>
  </div>
</template>

<script>
import NoImageImg from '../assets/svg/no-image.png';
export default {
  name: 'product',
  data() {
    return {
      photo: 'Photo',
      noImage: NoImageImg,
    };
  },
  props: {
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    location: {
      type: Object,
    },
    description: {
      type: String,
    },
    id: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    highlightedItemId: {
      type: String,
    },
    switchProductPopup: {
      type: Function,
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
$orangeColor: #dba614;
$redColor: #c42e1a;

.product-container {
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
</style>
