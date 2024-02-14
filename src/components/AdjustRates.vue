<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="newRate" label="Nova Taxa de Câmbio" type="number"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn @click="updateExchangeRate">Atualizar Taxa de Câmbio</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '../firebaseConfig'; // Ajuste conforme sua estrutura de projeto

export default {
  data() {
    return {
      newRate: '',
      fromCurrency: 'BRL',
      toCurrency: 'ARG',
    };
  },
  methods: {
    async updateExchangeRate() {
      const rateKey = `${this.fromCurrency}to${this.toCurrency}`;
      try {
        await db.collection('config').doc('exchangeRates').set({
          [rateKey]: parseFloat(this.newRate)
        }, { merge: true });
        alert("Taxa de câmbio atualizada com sucesso.");
      } catch (error) {
        console.error("Erro ao atualizar taxa de câmbio:", error);
        alert("Erro ao atualizar taxa de câmbio.");
      }
    }
  }
};
</script>
