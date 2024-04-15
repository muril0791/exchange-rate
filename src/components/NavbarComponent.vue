<template>
  <v-app-bar app color="green" dark>
    <span class="title" @click="$emit('open-exchange')">Cotação de Moedas </span>
    <span><img class="img" src="../assets/money.gif" alt="Loading" /></span>
    <v-spacer></v-spacer>
    <!-- Ícones para Histórico e Carrinho de Compras -->
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
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.v-app-bar {
  display: flex;
}
.img {
  width: 50px;
  height: 50px;
  position: relative;
  left: 0.3em;
}
.title{
  font-size: 24px;
  margin: 6px;
}
</style>
