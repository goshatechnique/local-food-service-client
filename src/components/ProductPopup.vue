<template>
  <div class="overlay" @click="switchProductPopup">
    <div @click.stop class="overlay-background">
      <img :src="noImage" alt="#" class="background-image" />
      <h1>{{ selectedProduct.name }}, {{ selectedProduct.price }}</h1>
      <h4>{{ selectedProduct.location.name }}</h4>
      <textarea
        class="background-description"
        disabled
        :value="selectedProduct.description"
      />
      <div class="background-button" @click="switchProductPopup">&times;</div>
    </div>
  </div>
</template>

<script>
import NoImageImg from '../assets/svg/no-image.png';
export default {
  name: 'ProductPopup',
  data: function () {
    return {
      noImage: NoImageImg,
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
  &-background {
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

.background-image {
  padding-top: 20px;
  width: 200px;
  height: 200px;
}

.background-description {
  resize: none;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  outline: none;
  background-color: $greenColor;
}

.background-button {
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
  // height: 55px;
  // width: 80%;
  // box-sizing: border-box;
  // border: none;
  // outline: none;
  // transition: 0.5s;
  // border: 1px solid $greenColor;
  // color: $greenColor;
  // background-color: $whiteColor;
  // padding-left: 10px;
  // cursor: pointer;
  // margin: 25px 0 25px 0;
  // &:hover {
  //   background-color: $greenColor;
  //   border: 1px solid $whiteColor;
  //   color: $whiteColor;
  //   box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  // }
}

h1 {
  font-size: 1.2em;
}

h4 {
  font-size: 0.9em;
}

p {
  font-size: 0.8em;
}
</style>
