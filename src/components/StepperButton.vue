<!-- StepperButton.vue -->
<template>
    <div class="stepper">
        <button @click="decrement" :disabled="value === min" class="stepper-button">
            <v-icon>mdi-minus</v-icon>
        </button>
        <span class="stepper-value">{{ value }}</span>
        <button @click="increment" :disabled="value === max" class="stepper-button">
            <v-icon>mdi-plus</v-icon>
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
.stepper {
  display: flex;
  align-items: center;
  border: 1.5px solid #000000;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(245, 245, 245, 0.774);
  color: #000000;
  max-width: 120px;
  height: 35px;
  padding-left: 6px;
  padding-right: 6px;
}

.stepper-button {
  font-size: 18px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: black;
}

.stepper-button:disabled {
  color: rgb(168, 168, 168);
}

.stepper-value {
  padding: 0 20px;
}
</style>
