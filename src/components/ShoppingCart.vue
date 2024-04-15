<template>
  <div style="border-radius: 20px; border: 1px solid whitesmoke">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="productName" label="Nome do Produto" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="productPriceY" :label="`Preço em ${currencyY}`" type="number" outlined
            dense></v-text-field>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-btn color="blue" @click="addToCart"><v-icon>mdi-cart-arrow-down</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-list class="mt-2 pa-2" style="border-radius: 20px; background-color: #E0E0E0; max-height: 200px; ">
        <v-list-item-group>
          <v-list-item v-for="(item, index) in cart" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}: {{ item.priceY }} {{ currencyY }} ({{ item.priceX }} {{ currencyX
                }})</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider class="border-opacity-75 mt-5 mb-5"></v-divider>
      <div>Total em {{ currencyY }}: {{ totalY }}</div>
      <div>Total em {{ currencyX }}: {{ totalX }}</div>
    </v-container>
  </div>
</template>
  
  <script>
  export default {
    props: ['currencyX', 'currencyY', 'exchangeRateXtoY'],
    data() {
      return {
        productName: '',
        productPriceY: 0,
        cart: [],
      };
    },
    computed: {
      totalY() {
        return this.cart.reduce((acc, item) => acc + parseFloat(item.priceY), 0).toFixed(2);
      },
      totalX() {
        return this.cart.reduce((acc, item) => acc + (parseFloat(item.priceY) / this.exchangeRateXtoY), 0).toFixed(2);
      }
    },
    methods: {
      addToCart() {
        if (this.productName && this.productPriceY) {
          const priceX = (this.productPriceY / this.exchangeRateXtoY).toFixed(2);
          this.cart.push({
            name: this.productName,
            priceY: parseFloat(this.productPriceY),
            priceX: priceX
          });
          this.productName = '';
          this.productPriceY = 0;
        }
      }
    }
  };
  </script>
  <style>
.v-list-item {
  border-radius: 20px;
  background-color: #E0E0E0;
  max-height: 150px;
  overflow:  auto;
}

</style>