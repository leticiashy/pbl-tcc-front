<template>
  <v-footer :fixed="fixed" class="pa-3  elevation-1 black--text" color="white ">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      fixed: false
    };
  }
};
</script>
