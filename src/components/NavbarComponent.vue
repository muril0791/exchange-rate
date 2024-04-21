<template>
  <v-app-bar app color="green" dark>
    <span class="title" @click="$emit('open-exchange')"
      >ExchangeRate.io
      <img class="img" src="../assets/money.gif" alt="Loading" />
    </span>
    <v-spacer></v-spacer>
    <ping />
    <v-spacer></v-spacer>
    <v-btn icon @click="$emit('open-exchange')">
      <v-icon>mdi-cash</v-icon>
    </v-btn>
    <v-btn icon @click="$emit('open-history')">
      <v-icon>mdi-history</v-icon>
    </v-btn>
    <v-btn icon @click="$emit('open-cart')">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Ping from "./Ping.vue";
export default {
  components: { Ping },
  name: "NavbarComponent",
};
</script>

<style scoped>
.v-app-bar {
  display: flex;
}
.img {
  width: 40px;
  height: 40px;
  position: relative;
  left: 0.3em;
}
.title {
  font-size: 24px;
  margin: 8px;
}
</style>
