<template>
  <div class="loading" v-if="active"></div>
</template>

<script>
export default {
  props: ["active"]
};
</script>

<style>
.app-loader {
  width: 100%;
  z-index: 9999;
  position: absolute;
  height: 100%;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
