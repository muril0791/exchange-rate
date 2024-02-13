<template>
    <v-card class="mb-4">
      <v-card-title>Cotação do Dia</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="fromCurrency"
                :items="currencies"
                label="De"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="toCurrency"
                :items="currencies"
                label="Para"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="amount"
                :label="`De: ${fromCurrency} (Quantidade)`"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <!-- <v-text-field
                :value="convertedAmount"
                :label="`Para: ${toCurrency} (Valor convertido)`"
                type="number"
                readonly
              ></v-text-field> -->
              <span
              class="v-text-field"
              :label="`Para: ${toCurrency} (Valor convertido)`"
              outlined
              readonly
            >{{ convertedAmount }}</span>
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
        amount: '',
        convertedAmount: '',
        currencies: ['USD', 'BRL', 'EUR', 'ARG'],
        conversionTimer: null
      };
    },
    watch: {
      amount(newVal) {
        clearTimeout(this.conversionTimer);
        this.conversionTimer = setTimeout(() => {
          this.convertAmount();
        }, 500); // Defina o tempo que deseja aguardar após o término de digitação
      },
      fromCurrency() {
        this.convertAmount();
      },
      toCurrency() {
        this.convertAmount();
      }
    },
    methods: {
      convertAmount() {
        if (this.amount && !isNaN(this.amount)) {
          // Simule a taxa de câmbio, você pode substituir essa lógica pela chamada à API
          const fakeExchangeRate = 250;
          this.convertedAmount = (this.amount * fakeExchangeRate).toFixed(2);
          // Atualize o histórico
          this.updateHistory();
        } else {
          this.convertedAmount = '';
        }
      },
      updateHistory() {
        const historyItem = {
          from: this.fromCurrency,
          to: this.toCurrency,
          amount: `${this.amount} ${this.fromCurrency}`,
          convertedAmount: `${this.convertedAmount} ${this.toCurrency}`,
          date: new Date().toLocaleDateString()
        };
        // Adicione lógica para atualizar o histórico
        console.log("Histórico atualizado:", historyItem);
      }
    }
  };
  </script>
  