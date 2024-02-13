<template>
    <v-card>
      <v-card-title>Últimas Cotações</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in history"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ `1 ${item.from} = ${item.rate} ${item.to}` }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'ExchangeHistory',
    props: {
      history: Array
    }
  };
  </script>
  