<template>
  <div class="registration-form">
    <div class="registration-form__card">
      <div class="registration-form__step-indicator">
        Etapa
        <span class="registration-form__step-indicator--highlight">{{
          formStore.currentStep
        }}</span>
        de 4
      </div>
      <h1 class="registration-form__title">{{ formStore.currentTitle }}</h1>
      <StepFirst v-if="formStore.currentStep === 1" />
      <StepSecond v-if="formStore.currentStep === 2" />
      <StepThird v-if="formStore.currentStep === 3" />
    </div>
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import StepFirst from "./StepFirst.vue";
import StepSecond from "./StepSecond.vue";
import StepThird from "./StepThird.vue";
</script>
