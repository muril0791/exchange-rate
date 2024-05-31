<template>
    <div class="flex items-center border border-gray-700 rounded-lg overflow-hidden">
        <button @click="decrement" :disabled="value === min" class="px-4 py-2 bg-gray-700 text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
        </button>
        <span class="px-4">{{ value }}</span>
        <button @click="increment" :disabled="value === max" class="px-4 py-2 bg-gray-700 text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "StepperButton",
    props: {
        initialValue: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        }
    },
    data() {
        return {
            value: this.initialValue,
        };
    },
    watch: {
        initialValue(newVal) {
            this.value = newVal;
        },
    },
    methods: {
        increment() {
            if (this.value < this.max) {
                this.value++;
                this.$emit('update:value', this.value);
            }
        },
        decrement() {
            if (this.value > this.min) {
                this.value--;
                this.$emit('update:value', this.value);
            }
        },
    },
};
</script>

<style>
.stepper-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
