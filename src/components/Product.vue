<template>
  <div class="product-container">
    <div class="name">{{ name }}</div>
    <div class="photo">{{ photo }}</div>
    <div class="price">{{ price }}</div>
    <div class="location">
      {{ location.name }}
    </div>
    <div class="description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'product',
  data() {
    return {
      photo: 'Photo',
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
  },
};
</script>

<style lang="scss" scoped>
.product-container {
  display: grid;
  width: 300px;
  height: 350px;
  grid-template-areas:
    'name name'
    'photo photo'
    'price geolocation'
    'description  description';
  grid-template-rows: 25px 1fr 25px 50px;
  grid-template-columns: 1fr 1fr;
  border: 1px solid black;
}

.name {
  grid-area: name;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
}

.photo {
  grid-area: photo;
}

.price {
  grid-area: price;
  font-size: 0.85em;
  padding-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.location {
  grid-area: geolocation;
  font-size: 0.6em;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  grid-area: description;
  font-size: 0.7em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 10px 0 10px;
}
</style>
