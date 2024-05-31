<template>
  <div class="p-4 bg-gray-800 rounded-lg shadow-lg">
    <h2 class="text-center text-lg font-bold mb-4">Cotação do Dia <img class="inline-block w-5 h-5"
        src="../assets/coin.gif" alt="Coin" /></h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="col-span-1">
        <v-select v-model="currencyX" :items="currencies" label="Moeda X" outlined dense class="w-full"></v-select>
      </div>
      <div class="col-span-1 flex justify-center">
        <v-btn icon color="green" @click="swapCurrencies" class="focus:outline-none">
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
      </div>
      <div class="col-span-1">
        <v-select v-model="currencyY" :items="currencies" label="Moeda Y" outlined dense class="w-full"></v-select>
      </div>
    </div>
    <v-divider class="border-opacity-75 mb-5"></v-divider>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <v-text-field v-model="exchangeRateXtoY" @input="updateRate(), saveExchange()"
          :label="`Taxa de 1 ${currencyX} para ${currencyY}`" type="number" outlined dense
          class="w-full"></v-text-field>
      </div>
      <div>
        <v-text-field v-model="amountX" @input="convertXtoY" :label="`Quantidade em ${currencyX}`" type="number"
          outlined dense class="w-full"></v-text-field>
        <v-text-field v-model="convertedAmountY" readonly :label="`Valor em ${currencyY}`" outlined dense
          class="w-full mt-2"></v-text-field>
      </div>
      <div>
        <v-text-field v-model="amountY" @input="convertYtoX" :label="`Quantidade em ${currencyY}`" type="number"
          outlined dense class="w-full"></v-text-field>
        <v-text-field v-model="convertedAmountX" readonly :label="`Valor em ${currencyX}`" outlined dense
          class="w-full mt-2"></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currencyX: "BRL",
      currencyY: "ARG",
      exchangeRateXtoY: Number(localStorage.getItem("exchangeRateXtoY")) || 1,
      amountX: null,
      convertedAmountY: "",
      amountY: null,
      convertedAmountX: "",
      currencies: ["USD", "EUR", "BRL", "JPY", "GBP", "ARG"],
    };
  },
  methods: {
    updateHistory(conversionDetails) {
      this.exchangeHistory.unshift({
        date: conversionDetails.date,
        amountX: conversionDetails.amount,
        currencyX: conversionDetails.currencyX,
        convertedAmountY: conversionDetails.convertedAmount,
        currencyY: conversionDetails.currencyY,
      });

      if (this.exchangeHistory.length > 10) {
        this.exchangeHistory.pop();
      }
      this.showHistory = false;
    },
    convertXtoY() {
      if (this.exchangeRateXtoY && this.amountX) {
        this.convertedAmountY = (this.amountX * this.exchangeRateXtoY).toFixed(2);
        this.emitHistoryUpdate("XtoY");
      }
    },
    convertYtoX() {
      if (this.exchangeRateXtoY && this.amountY) {
        this.convertedAmountX = (this.amountY / this.exchangeRateXtoY).toFixed(2);
        this.emitHistoryUpdate("YtoX");
      }
    },
    updateRate() {
      this.$emit("rate-updated", this.exchangeRateXtoY);
    },
    saveExchange() {
      localStorage.setItem("exchangeRateXtoY", this.exchangeRateXtoY.toString());
    },
    swapCurrencies() {
      [this.currencyX, this.currencyY] = [this.currencyY, this.currencyX];
      this.exchangeRateXtoY = 0;
      this.amountX = null;
      this.amountY = null;
      this.convertedAmountX = "";
      this.convertedAmountY = "";
      this.$emit('currency-changed', this.currencyX, this.currencyY);
    },
    emitHistoryUpdate(direction) {
      const detail = {
        currencyX: this.currencyX,
        currencyY: this.currencyY,
        rate: this.exchangeRateXtoY,
        amount: direction === "XtoY" ? this.amountX : this.amountY,
        convertedAmount: direction === "XtoY" ? this.convertedAmountY : this.convertedAmountX,
        date: new Date().toLocaleString(),
        direction,
      };
      this.$emit("conversion", detail);
    },
  },
};
</script>
