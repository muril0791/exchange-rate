<template>
  <v-list>
    <v-list-item v-for="(item, index) in history" :key="index">
      <v-list-item-title>
        {{ item.date }}: {{ item.amountX }} {{ item.currencyX }} = {{ item.convertedAmountY }} {{ item.currencyY }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    history: Array,
  }
};
</script>
