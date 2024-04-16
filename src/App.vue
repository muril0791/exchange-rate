<template>
  <v-app class="app">
    <navbar-component
      @open-history="toggleHistoryModal"
      @open-cart="showCart = true"
      @open-exchange="showCart = false"
    />
    <v-main>
      <v-container>
        <exchange-rate-display
          v-if="!showCart"
          :fromCurrency="fromCurrency"
          :toCurrency="toCurrency"
          :rate="currentRate"
          @conversion="updateHistory"
          @rate-updated="currentRate = $event"
        />
        <shopping-cart
          v-if="showCart"
          :currencyX="fromCurrency"
          :currencyY="toCurrency"
          :exchangeRateXtoY="currentRate"
          @close-cart="showCart = false"
        />
      </v-container>
    </v-main>
    <v-dialog v-model="showHistory" max-width="600px">
      <v-card class="ma-10">
        <v-card-title
          ><span>Historial de Conversões</span
          ><span style="margin: 6px;"
            ><img width="20px" height="20px" src="./assets/change.png"
          /></span>
        </v-card-title>
        <v-card-text>
          <exchange-history :history="exchangeHistory"></exchange-history>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showHistory = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
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
      currentRate: 201, // Exemplo fixo
      exchangeHistory: [],
    };
  },
  methods: {
    toggleHistoryModal() {
      this.showHistory = !this.showHistory;
    },
    updateHistory(conversionDetails) {
      this.exchangeHistory.unshift(conversionDetails);
      if (this.exchangeHistory.length > 10) {
        this.exchangeHistory.pop(); // Mantenha apenas as últimas 10 cotações
      }
    },
  },
};
</script>

<style scoped>
.app {
  width: auto;
  background: #252525;
  color: white;
  height: auto;
}
</style>
