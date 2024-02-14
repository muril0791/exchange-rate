<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Cotação de Moedas</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="$emit('open-login')">Perfil</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>
