<template>
  <v-list dense>
    <v-list-item-group>
      <v-list-item v-for="(entry, index) in history" :key="index">
        <v-list-item-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ entry.amount }} {{ entry.direction === 'XtoY' ? entry.currencyX : entry.currencyY }}
            <v-icon small>mdi-arrow-right</v-icon>
            {{ entry.convertedAmount }} {{ entry.direction === 'XtoY' ? entry.currencyY : entry.currencyX }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ entry.date }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    history: Array,
  }
};
</script>

<style scoped>
.v-list-item {
  align-items: center;
}

.v-list-item-icon {
  color: var(--v-theme-primary);
}
</style>
