<template>
  <v-card class="mb-4 exchange-rate-card">
    <v-card-title class="headline">Cotação do Dia</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="fromCurrency" :items="currencies" label="De" outlined dense></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="toCurrency" :items="currencies" label="Para" outlined dense></v-select>
          </v-col>
        </v-row>
        <v-row class="pt-4">
          <v-col cols="12" md="6">
            <v-text-field v-model="amount" :label="`De: ${fromCurrency} (Quantidade)`" type="number" outlined dense @input="convertAmount"></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="display-converted-amount">
            {{ displayConversionResult }}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fromCurrency: 'BRL',
      toCurrency: 'ARG',
      amount: 1,
      convertedAmount: '',
      currencies: ['USD', 'BRL', 'EUR', 'ARG', 'PESO'],
      exchangeRates: {
        'BRLtoARG': 250,
        'ARGtoBRL': 0.004,
        // Adicione outras taxas fixas aqui conforme necessário
      },
    };
  },
  computed: {
    displayConversionResult() {
      return `Para: ${this.toCurrency} (Valor convertido): ${this.convertedAmount}`;
    }
  },
  methods: {
    convertAmount() {
      const rateKey = `${this.fromCurrency}to${this.toCurrency}`;
      const exchangeRate = this.exchangeRates[rateKey];

      if (exchangeRate && this.amount) {
        this.convertedAmount = (this.amount * exchangeRate).toFixed(2);
      } else {
        this.convertedAmount = "Taxa de câmbio não disponível";
      }
    },
  },
  mounted() {
    this.convertAmount(); // Realiza uma conversão inicial com valores padrão
  },
};
</script>

<style>
.exchange-rate-card {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.display-converted-amount {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-weight: 500;
}

.v-select, .v-text-field {
  background-color: white;
}

.headline {
  color: #1976D2;
  font-weight: normal;
}
</style>
