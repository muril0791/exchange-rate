<template>
  <v-app>
    <navbar-component @open-login="showLogin = true" @open-settings="showSettings = true"/>
    <login-component v-model="showLogin"/>
    <settings-component v-model="showSettings" :rate-source="rateSource" @update-rate-source="rateSource = $event"/>
    <v-main>
      <v-container>
        <currency-selector @currency-change="handleCurrencyChange"/>
        <exchange-rate-display
          :fromCurrency="fromCurrency"
          :toCurrency="toCurrency"
          :rate="currentRate"
          :amount="amount"
          @update-amount="amount = $event"
          @convert-amount="convertAmount"
        />
        <exchange-history :history="exchangeHistory" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import SettingsComponent from './components/SettingsComponent.vue';
import CurrencySelector from './components/CurrencySelector.vue';
import ExchangeRateDisplay from './components/ExchangeRateDisplay.vue';
import ExchangeHistory from './components/ExchangeHistory.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    LoginComponent,
    SettingsComponent,
    CurrencySelector,
    ExchangeRateDisplay,
    ExchangeHistory
  },
  data() {
    return {
      showLogin: false,
      showSettings: false,
      fromCurrency: 'USD',
      toCurrency: 'BRL',
      amount: 100,
      currentRate: 250, // Este valor deve vir de uma API ou ser definido nas configurações
      exchangeHistory: [],
      rateSource: 'Western Union' // ou 'Minha Cotação'
    };
  },
  methods: {
    handleCurrencyChange(currencyPair) {
      this.fromCurrency = currencyPair.from;
      this.toCurrency = currencyPair.to;
      this.fetchExchangeRate();
    },
    fetchExchangeRate() {
      // Aqui você faria a chamada para a API de cotação de moedas
      // Para simulação, vamos manter o valor fixo
      // Supondo que a 'rateSource' possa alterar a taxa
      if (this.rateSource === 'Minha Cotação') {
        this.currentRate = 250; // Suponha que seja sua cotação personalizada
      } else {
        this.currentRate = 248; // Suponha que seja a taxa da Western Union
      }
      this.updateHistory();
    },
    updateHistory() {
      this.exchangeHistory.push({
        from: this.fromCurrency,
        to: this.toCurrency,
        rate: this.currentRate,
        date: new Date().toLocaleDateString()
      });
    },
    convertAmount() {
      // A lógica de conversão será implementada no componente ExchangeRateDisplay
    }
  }
};
</script>

<style>
/* Estilos globais */
</style>
