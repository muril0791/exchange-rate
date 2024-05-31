<template>
  <nav class="bg-green-700 p-4 flex items-center justify-between">
    <span class="text-2xl font-bold cursor-pointer flex items-center" @click="$emit('open-exchange')">
      ExchangeRate.io
    </span>
    <div class="flex items-center space-x-4">
      <ping />
      <button @click="$emit('open-exchange')" class="focus:outline-none">
        <v-icon class="text-white">mdi-cash</v-icon>
      </button>
      <button @click="$emit('open-history')" class="focus:outline-none">
        <v-icon class="text-white">mdi-history</v-icon>
      </button>
      <button @click="$emit('open-cart')" class="focus:outline-none">
        <v-icon class="text-white">mdi-cart</v-icon>
      </button>
    </div>
  </nav>
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
