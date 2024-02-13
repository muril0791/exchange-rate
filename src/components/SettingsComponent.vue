<!-- SettingsComponent.vue -->
<template>
    <v-dialog v-model="showSettings" persistent max-width="25%">
      <v-card>
        <v-card-title>Configurações de Cotação</v-card-title>
        <v-card-text>
          <v-select
            :items="['Minha Cotação', 'Western Union']"
            label="Escolha a fonte da cotação"
            v-model="selectedRateSource"
          ></v-select>
          <!-- Adicione mais configurações aqui -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveSettings">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showSettings: false,
        selectedRateSource: ''
      };
    },
    methods: {
      saveSettings() {
        // Salvar as configurações selecionadas
      }
    }
  };
  </script>
  