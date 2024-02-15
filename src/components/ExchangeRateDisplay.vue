<template>
  <v-card class="exchange-rate-card">
    <v-card-title class="headline text-center">Cotação do Dia</v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <v-select v-model="fromCurrency" :items="currencies" label="De" outlined dense @change="convertAmount"></v-select>
          </v-col>
          <v-col cols="12" md="2" class="text-center">
            <v-btn icon @click="swapCurrencies">
              <v-icon>mdi-swap-horizontal</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="5">
            <v-select v-model="toCurrency" :items="currencies" label="Para" outlined dense @change="convertAmount"></v-select>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <v-text-field v-model="amount" :label="`Quantidade (${fromCurrency})`" type="number" outlined dense @input="convertAmount"></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="text-center">
            <v-switch v-model="useCustomRate" label="Usar outra cotação"></v-switch>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              v-if="useCustomRate"
              v-model="customRates[currentRateKey]"
              :label="`Cotação customizada de 1 ${fromCurrency} para ${toCurrency}`"
              type="number"
              outlined
              dense
              @input="convertAmount"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="display-converted-amount text-center">
              {{ displayConversionResult }}
            </div>
          </v-col>
        </v-row>
        <!-- Campo de verificação de preço -->
        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model="priceInForeignCurrency"
              :label="`Valor em ${toCurrency}`"
              type="number"
              outlined
              dense
              @input="calculatePriceInLocalCurrency"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="priceInLocalCurrency"
              :label="`Valor em ${fromCurrency} (convertido)`"
              type="number"
              outlined
              dense
              readonly
            ></v-text-field>
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
      customRates: {},
      useCustomRate: false,
      convertedAmount: '',
      priceInForeignCurrency: null,
      priceInLocalCurrency: '',
      currencies: ['USD', 'BRL', 'EUR', 'ARG', 'PESO'],
      exchangeRates: {
        'BRLtoARG': 250,
        'ARGtoBRL': 0.004,
        // Adicione outras taxas predefinidas conforme necessário
      },
    };
  },
  computed: {
    currentRateKey() {
      return `${this.fromCurrency}to${this.toCurrency}`;
    },
    currentRate() {
      if (this.useCustomRate && this.customRates[this.currentRateKey]) {
        return this.customRates[this.currentRateKey];
      }
      return this.exchangeRates[this.currentRateKey] || null;
    },
    displayConversionResult() {
      if (this.currentRate !== null) {
        return `Valor convertido: ${this.convertedAmount} ${this.toCurrency}`;
      }
      return 'Taxa de câmbio não disponível.';
    }
  },
  methods: {
    swapCurrencies() {
      [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
      this.convertAmount();
    },
    convertAmount() {
      if (this.currentRate) {
        this.convertedAmount = (this.amount * this.currentRate).toFixed(2);
      } else {
        this.convertedAmount = '---';
      }
    },
    calculatePriceInLocalCurrency() {
      if (this.useCustomRate && this.customRates[this.currentRateKey]) {
        const reverseRate = 1 / this.customRates[this.currentRateKey];
        this.priceInLocalCurrency = (this.priceInForeignCurrency * reverseRate).toFixed(2);
      } else if (this.exchangeRates[this.currentRateKey]) {
        const reverseRate = 1 / this.exchangeRates[this.currentRateKey];
        this.priceInLocalCurrency = (this.priceInForeignCurrency * reverseRate).toFixed(2);
      } else {
        this.priceInLocalCurrency = 'Taxa de câmbio não disponível';
      }
    },
  },
  watch: {
    fromCurrency: "convertAmount",
    toCurrency: "convertAmount",
    amount: "convertAmount",
    customRates: {
      handler: "convertAmount",
      deep: true
    },
    useCustomRate: "convertAmount",
    priceInForeignCurrency: "calculatePriceInLocalCurrency",
  },
  mounted() {
    this.convertAmount();
  },
};

</script>