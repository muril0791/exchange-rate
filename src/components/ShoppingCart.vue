<template>
  <div style="border-radius: 20px; border: 1px solid whitesmoke">
    <v-card-title class="headline text-center">Shopping car
      <v-card-subtitle class="headline text-right">{{
        exchangeRateXtoY
      }}</v-card-subtitle></v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="productName" label="Nome do Produto" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="productPriceY" :label="`Preço em ${currencyY}`" type="number" outlined
            dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <stepper-button :initial-value="productQuantity" @update:value="(value) => (productQuantity = value)" />
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-btn color="blue" :disabled="productPriceY === 0 || productName === null"
            @click="addToCart"><v-icon>mdi-cart-arrow-down</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-card-title>Itens:</v-card-title>
      <v-list class="mt-2 pa-2" style="background: none; border: 1px solid grey; border-radius: 20px"
        color="transparent">
        <v-list-item-group style="background: none">
          <v-list-item v-for="(item, index) in cart" :key="index">
            <v-list-item-title style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              ">
              {{ item.name }}: {{ item.priceY }} {{ currencyY }} ({{
                item.priceX
              }}
              {{ currencyX }})
              <span class="crudBtn" style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                ">
                <v-col>
                  <!-- Vincule o initialValue ao item.quantity e atualize diretamente essa propriedade -->
                  <stepper-button :initial-value="item.quantity"
                    @update:value="(value) => updateQuantity(index, value)" />
                </v-col>
                <v-btn class="mr-2" icon @click="openEditModal(item, index)">
                  <v-icon color="orange">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteItem(index)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </span>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider class="border-opacity-75 mt-5 mb-5"></v-divider>
      <div>Total em {{ currencyY }}: {{ totalY }}</div>
      <div>Total em {{ currencyX }}: {{ totalX }}</div>
    </v-container>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title> Editar Produto </v-card-title>
        <v-card-text>
          <v-text-field v-model="editItemData.name" label="Nome do Produto" outlined dense></v-text-field>
          <v-text-field v-model="editItemData.priceY" :label="`Preço em ${currencyY}`" type="number" outlined
            dense></v-text-field>
          <v-text-field v-model="editItemData.quantity" label="Quantidade" type="number" outlined
            dense></v-text-field>
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
      productQuantity: 1, // Valor inicial ajustável conforme necessário
      cart: [],
      selectedIndex: null,
      editDialog: false,
      editItemData: { name: "", priceY: 0, quantity: 1 },
    };
  },
  computed: {
    totalY() {
      return this.cart
        .reduce((acc, item) => acc + Number(item.priceY), 0)
        .toFixed(2);
    },
    totalX() {
      return this.cart
        .reduce(
          (acc, item) => acc + Number(item.priceY) / this.exchangeRateXtoY,
          0
        )
        .toFixed(2);
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
      if (
        !isNaN(unitPrice) &&
        !isNaN(quantity) &&
        unitPrice > 0 &&
        quantity > 0
      ) {
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
          priceX: (
            parseFloat(this.editItemData.priceY) / this.exchangeRateXtoY
          ).toFixed(2),
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

<style scoped>
.v-list-item {
  background-color: transparent;
  border-bottom: 1px solid rgb(255, 255, 255);
  max-height: 150px;
  overflow: auto;
  margin: 8px;
  color: white;
  padding-left: 1em;
  padding-right: 1em;
}

.item-list {
  margin-bottom: 8px;
  align-items: center;
}

.item-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
