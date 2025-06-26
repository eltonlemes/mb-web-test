<template>
  <div class="step-indicator">
    Etapa
    <span class="step-indicator__highlight">{{ currentStep }}</span>
    de {{ totalSteps }}
  </div>
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
});
</script>
