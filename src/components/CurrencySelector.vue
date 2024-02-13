<template>
    <v-card class="mb-4">
      <v-card-title>Escolha sua Moeda</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedCurrencyFrom"
                :items="currencies"
                label="De"
                @change="emitCurrencyChange"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedCurrencyTo"
                :items="currencies"
                label="Para"
                @change="emitCurrencyChange"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'CurrencySelector',
    data() {
      return {
        selectedCurrencyFrom: 'USD',
        selectedCurrencyTo: 'BRL',
        currencies: ['USD', 'BRL', 'EUR', 'ARG'],
      };
    },
    methods: {
      emitCurrencyChange() {
        this.$emit('currency-change', {
          from: this.selectedCurrencyFrom,
          to: this.selectedCurrencyTo
        });
      }
    },
    watch: {
    selectedCurrencyFrom(newVal) {
      this.emitCurrencyChange();
    },
    selectedCurrencyTo(newVal) {
      this.emitCurrencyChange();
    }
  },
  };
  </script>
  