<template>
  <div class="p-4 bg-gray-800 rounded-lg shadow-lg">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-bold">Shopping Cart</h2>
      <span class="text-right">{{ exchangeRateXtoY }}</span>
    </div>
    <div class="mt-4">
      <v-text-field v-model="productName" label="Nome do Produto" outlined dense
        class="w-full bg-gray-700 text-white"></v-text-field>
      <v-text-field v-model="productPriceY" :label="`Preço em ${currencyY}`" type="number" outlined dense
        class="w-full bg-gray-700 text-white mt-2"></v-text-field>
      <div class="mt-2">
        <label class="block mb-1">Quantidade:</label>
        <stepper-button :initial-value="productQuantity" @update:value="(value) => (productQuantity = value)" />
      </div>
      <v-row class="mt-4">
        <v-btn color="blue" :disabled="productPriceY === 0 || productName === null" @click="addToCart"
          class="mt-2 ma-2 rounded-full">
          <v-icon>mdi-cart-arrow-down</v-icon> Adicionar Item
        </v-btn>
        <v-btn color="red" @click="deleteAllItem" class=" mt-2 ma-2 rounded-full">
          <v-icon>mdi-delete</v-icon> Deletar
        </v-btn>
      </v-row>

    </div>
    <div class="mt-4 divide-y">
      <h3 class="font-bold">Itens:</h3>
      <ul class="divide-y">
        <li v-for="(item, index) in cart" :key="index" class="flex justify-between items-center py-2">
          <span>{{ item.name }}: {{ item.priceY }} {{ currencyY }}</span>
          <div class="flex items-center space-x-2">
            <stepper-button :initial-value="item.quantity" @update:value="(value) => updateQuantity(index, value)" />
            <v-btn icon @click="openEditModal(item, index)" class="text-orange-600">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteItem(index)" class="text-red-600">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </li>
      </ul>
    </div>
    <div class="mt-4">
      <p>Total em {{ currencyY }}: {{ totalY }}</p>
      <p>Total em {{ currencyX }}: {{ totalX }}</p>
    </div>

    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title> Editar Produto </v-card-title>
        <v-card-text>
          <v-text-field v-model="editItemData.name" label="Nome do Produto" outlined dense></v-text-field>
          <v-text-field v-model="editItemData.priceY" :label="`Preço em ${currencyY}`" type="number" outlined
            dense></v-text-field>
          <v-text-field v-model="editItemData.quantity" label="Quantidade" type="number" outlined dense></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="updateItem">Salvar</v-btn>
          <v-btn color="red" text @click="closeEditModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import StepperButton from "./StepperButton.vue";

export default {
  components: { StepperButton },
  props: ["currencyX", "currencyY", "exchangeRateXtoY"],
  data() {
    return {
      productName: "",
      productPriceY: 0,
      productQuantity: 1,
      cart: [],
      selectedIndex: null,
      editDialog: false,
      editItemData: { name: "", priceY: 0, quantity: 1 },
    };
  },
  computed: {
    totalY() {
      return this.cart.reduce((acc, item) => acc + Number(item.priceY), 0).toFixed(2);
    },
    totalX() {
      return this.cart.reduce((acc, item) => acc + Number(item.priceY) / this.exchangeRateXtoY, 0).toFixed(2);
    },
  },
  created() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },
    addToCart() {
      const unitPrice = parseFloat(this.productPriceY);
      const quantity = parseInt(this.productQuantity, 10);
      if (!isNaN(unitPrice) && !isNaN(quantity) && unitPrice > 0 && quantity > 0) {
        const itemData = {
          name: this.productName,
          unitPrice: unitPrice,
          quantity: quantity,
          priceY: unitPrice * quantity,
          priceX: ((unitPrice * quantity) / this.exchangeRateXtoY).toFixed(2),
        };
        this.cart.push(itemData);
        this.saveCart();
        this.resetInputs();
      } else {
        console.error("Invalid product price or quantity");
      }
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    updateQuantity(index, newQuantity) {
      const validQuantity = Number(newQuantity);
      if (!isNaN(validQuantity) && validQuantity > 0) {
        const item = this.cart[index];
        item.quantity = validQuantity;
        item.priceY = parseFloat(item.unitPrice) * validQuantity;
        item.priceX = (item.priceY / this.exchangeRateXtoY).toFixed(2);
        this.saveCart();
        this.$forceUpdate();
      } else {
        console.error("Invalid quantity input:", newQuantity);
      }
    },
    deleteItem(index) {
      this.cart.splice(index, 1);
      this.saveCart();
    },
    deleteAllItem(index) {
      this.cart = [];
      this.saveCart();
    },
    openEditModal(item, index) {
      this.editItemData = { ...item };
      this.selectedIndex = index;
      this.editDialog = true;
    },
    updateItem() {
      if (this.selectedIndex !== null) {
        const updatedItem = {
          ...this.editItemData,
          quantity: parseInt(this.editItemData.quantity, 10),
          priceY: parseFloat(this.editItemData.priceY),
          priceX: (parseFloat(this.editItemData.priceY) / this.exchangeRateXtoY).toFixed(2),
        };
        this.cart.splice(this.selectedIndex, 1, updatedItem);
        this.saveCart();
        this.closeEditModal();
      }
    },
    closeEditModal() {
      this.editDialog = false;
      this.selectedIndex = null;
    },
    resetInputs() {
      this.productName = "";
      this.productPriceY = 0;
      this.productQuantity = 1;
    },
  },
};
</script>
