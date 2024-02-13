<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Cotação de Moedas</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">Perfil</v-btn>
      </template>
      <v-list>
        <v-list-item @click="openSettings">
          <v-list-item-title>Configurações</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComponent',
  methods: {
    openSettings() {
      this.$emit('open-settings');
    }
  }
};
</script>
