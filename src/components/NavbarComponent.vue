<template>
  <v-app-bar app color="green-accent-3" dark>
    <v-toolbar-title>Cotação de Moedas</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn disabled text @click="$emit('open-login')"><v-icon class=" mdi mdi-account-outline"></v-icon></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComponent',
};
</script>
