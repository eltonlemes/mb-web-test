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
      <h1>{{ formStore.stepFirst.title }}</h1>
    </div>
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
</script>
