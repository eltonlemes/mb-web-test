<template>
  <div class="step-indicator">
    Etapa
    <span class="step-indicator__highlight">{{ currentStep }}</span>
    de {{ totalSteps }}
  </div>
  <h1 class="step-indicator__title">{{ title }}</h1>
</template>

<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
