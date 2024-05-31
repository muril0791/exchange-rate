<template>
  <div class="app min-h-screen bg-gray-900 text-white">
    <SpeedInsights />
    <navbar-component @open-history="toggleHistoryModal" @open-cart="showCart = true"
      @open-exchange="showCart = false" />
    <main class="container mx-auto p-4">
      <div v-if="!showCart">
        <exchange-rate-display :fromCurrency="fromCurrency" :toCurrency="toCurrency" :rate="currentRate"
          @conversion="updateHistory" @rate-updated="currentRate = $event" @currency-changed="updateCurrencies" />
      </div>
      <div v-if="showCart">
        <shopping-cart :currencyX="fromCurrency" :currencyY="toCurrency" :exchangeRateXtoY="currentRate"
          @close-cart="showCart = false" />
      </div>
    </main>
    <div v-if="showHistory" class="fixed inset-0  bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white text-black p-4 rounded-lg w-full max-w-md mx-auto">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold">Historial de Conversões</h2>
          <img width="20px" height="20px" src="./assets/change.png" alt="Historial" />
        </div>
        <exchange-history :history="exchangeHistory"></exchange-history>
        <div class="flex justify-end mt-4">
          <button class="bg-green-700 text-white px-4 py-2 rounded" @click="showHistory = false">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import ExchangeRateDisplay from "./components/ExchangeRateDisplay.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import ExchangeHistory from "./components/ExchangeHistory.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    ExchangeRateDisplay,
    ShoppingCart,
    ExchangeHistory,

  },
  data() {
    return {
      showCart: false,
      showHistory: false,
      fromCurrency: "BRL",
      toCurrency: "ARG",
      currentRate: 210,
      exchangeHistory: [],
    };
  },
  created() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      const savedHistory = localStorage.getItem('history');
      if (savedHistory) {
        this.exchangeHistory = JSON.parse(savedHistory);
      }
    },
    updateHistory(conversionDetails) {
      this.exchangeHistory.unshift(conversionDetails);
      if (this.exchangeHistory.length > 10) {
        this.exchangeHistory.pop();
      }
      this.saveHistory();
    },
    saveHistory() {
      localStorage.setItem('history', JSON.stringify(this.exchangeHistory));
    },
    toggleHistoryModal() {
      this.showHistory = !this.showHistory;
    },
    updateCurrencies(from, to) {
      this.fromCurrency = from;
      this.toCurrency = to;
    },
  },
};
</script>

<style scoped>
.app {
  background: #252525;
  color: white;
}
</style>
