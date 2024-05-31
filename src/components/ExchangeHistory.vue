<template>
  <ul class="space-y-2">
    <li v-for="(entry, index) in history" :key="index" class="bg-gray-400 p-2 rounded-lg">
      <div class="flex justify-between">
        <span>{{ entry.amount }} {{ entry.direction === 'XtoY' ? entry.currencyX : entry.currencyY }}
          <svg class="inline-block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-9.5 9.5L3 11">
            </path>
          </svg>
          {{ entry.convertedAmount }} {{ entry.direction === 'XtoY' ? entry.currencyY : entry.currencyX }}</span>
        <span>{{ entry.date }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    history: Array,
  }
};
</script>
