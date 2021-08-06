<template>
  <div class="container">
    <div class="header-logo">Local food service</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
$grayColor: #e1e1e1;

.container {
  grid-area: header;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid $grayColor;
}

.header-logo {
  padding-left: 25px;
  font-size: 1.5em;
  font-weight: bold;
  user-select: none;
}
</style>
