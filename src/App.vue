<template>
  <v-app class="app">
    <navbar-component @open-login="showLogin = true" @open-settings="toggleSettings = !toggleSettings" />
    <v-dialog v-model="showLogin" width="500px">
      <login-component v-if="!isSignup" @toggle-form="isSignup = !isSignup" @close-dialog="showLogin = false" />
      <signup-component v-else @toggle-form="isSignup = !isSignup" @close-dialog="showLogin = false" />
    </v-dialog>
    <!-- SettingsComponent pode ser reintegrado conforme a necessidade do projeto -->
    <v-main>
      <v-container>
        <exchange-rate-display
          :fromCurrency="fromCurrency"
          :toCurrency="toCurrency"
          :rate="currentRate"
          @conversion-completed="updateHistory"
        />
        <exchange-history :history="exchangeHistory" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import SignupComponent from './components/SignupComponent.vue'; // Assegure-se de ter este componente
// Importe SettingsComponent se estiver sendo usado
import ExchangeRateDisplay from './components/ExchangeRateDisplay.vue';
import ExchangeHistory from './components/ExchangeHistory.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    LoginComponent,
    SignupComponent, // Incluído para cadastro
    ExchangeRateDisplay,
    ExchangeHistory,
    // Inclua SettingsComponent aqui, se necessário
  },
  data() {
    return {
      showLogin: false,
      showSettings: false,
      isSignup: false, // Estado para alternar entre login e cadastro
      fromCurrency: 'USD',
      toCurrency: 'BRL',
      amount: 100,
      currentRate: 5.42, // Este valor deve ser dinâmico conforme suas necessidades
      exchangeHistory: [],
      rateSource: 'Western Union', // ou 'Minha Cotação'
    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    fetchExchangeRate() {
      // Implemente a lógica de busca da taxa de câmbio aqui
    },
    updateHistory(conversionDetails) {
      this.exchangeHistory.push({
        from: conversionDetails.from,
        to: conversionDetails.to,
        rate: conversionDetails.rate,
        amount: `${conversionDetails.amount} ${conversionDetails.from} = ${conversionDetails.convertedAmount} ${conversionDetails.to}`,
        date: new Date().toLocaleDateString(),
      });
    },
  }
};
</script>

<style scoped>
.app {
  width: auto;
  background: grey;
  color: white;
  height: auto;
}
</style>
