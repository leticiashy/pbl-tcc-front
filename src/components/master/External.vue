<template>
  <div class="application-wrapper">
    <router-view />
  </div>
</template>

<style scoped>
.application-wrapper {
  width: 100%;
  height: 100%;
  display: flex;

  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#fafafa+70,7db9e8+80 */
  background: rgb(250, 250, 250); /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    rgba(250, 250, 250, 1) 60%,
    rgba(26, 164, 191, 1) 98%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    rgba(250, 250, 250, 1) 60%,
    rgba(26, 164, 191, 1) 98%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    rgba(250, 250, 250, 1) 60%,
    rgba(26, 164, 191, 1) 98%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fafafa', endColorstr='#7db9e8',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
</style>
