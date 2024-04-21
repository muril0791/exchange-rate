<template>
  <div class="body">
    <v-card-title class="headline text-center">Cotação do Dia <span><img width="20px" src="../assets/coin.gif" /></span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row align="center" justify="center">
          <!-- Seletores de moeda com botão de switch no meio -->
          <v-col cols="12" md="5">
            <v-select v-model="currencyX" :items="currencies" label="Moeda X" outlined dense></v-select>
          </v-col>
          <v-col cols="12" md="2" class="text-center">
            <v-btn icon color="green" @click="swapCurrencies">
              <v-icon>mdi-swap-horizontal</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="5">
            <v-select v-model="currencyY" :items="currencies" label="Moeda Y" outlined dense></v-select>
          </v-col>
        </v-row>
        <v-divider class="border-opacity-75 mb-5"></v-divider>
        <v-row align="center" justify="center">
          <!-- Entrada da taxa de câmbio de X para Y -->
          <v-col cols="12" md="6">
            <v-text-field v-model="exchangeRateXtoY" @input="updateRate(), saveExchange()"
              :label="`Taxa de 1 ${currencyX} para ${currencyY}`" type="number" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="border-opacity-75 mb-5"></v-divider>
        <v-card-title class="headline text-center h10">Cotação de {{ currencyX }} para {{ currencyY }}</v-card-title>
        <v-row align="center" justify="center">
          <!-- Entrada do valor em X para conversão em Y -->
          <v-col cols="12" md="6">
            <v-text-field v-model="amountX" :label="`Quantidade em ${currencyX}`" type="number" outlined dense
              @input="convertXtoY"></v-text-field>
          </v-col>
          <!-- Resultado da conversão em Y -->
          <v-col cols="12" md="6">
            <v-text-field v-model="convertedAmountY" :label="`Valor em ${currencyY}`" outlined dense
              readonly></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="border-opacity-75 mb-5"></v-divider>
        <v-card-title class="headline text-center h10">Cotação de {{ currencyY }} para {{ currencyX }}</v-card-title>
        <v-row align="center" justify="center">
          <!-- Entrada do valor em Y para conversão em X -->
          <v-col cols="12" md="6">
            <v-text-field v-model="amountY" :label="`Quantidade em ${currencyY}`" type="number" outlined dense
              @input="convertYtoX"></v-text-field>
          </v-col>
          <!-- Resultado da conversão em X -->
          <v-col cols="12" md="6">
            <v-text-field v-model="convertedAmountX" :label="`Valor em ${currencyX}`" outlined dense
              readonly></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
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
        this.convertedAmountY = (this.amountX * this.exchangeRateXtoY).toFixed(
          2
        );
        this.emitHistoryUpdate("XtoY");
      }
    },
    convertYtoX() {
      if (this.exchangeRateXtoY && this.amountY) {
        this.convertedAmountX = (this.amountY / this.exchangeRateXtoY).toFixed(
          2
        );
        this.emitHistoryUpdate("YtoX");
      }
    },
    updateRate() {
      this.$emit("rate-updated", this.exchangeRateXtoY);
    },
    saveExchange() {
      // Assegura que o valor da taxa de câmbio seja uma string
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
        convertedAmount:
          direction === "XtoY" ? this.convertedAmountY : this.convertedAmountX,
        date: new Date().toLocaleString(),
        direction,
      };
      this.$emit("conversion", detail);
    },
   
  },
};
</script>
