<template>
  <div class="registration-form">
    <Card>
      <StepIndicator
        :currentStep="formStore.currentStep"
        :totalSteps="STEPS.STEP_REVIEW"
        :title="currentTitle"
      />

      <StepFirst v-if="formStore.currentStep === STEPS.STEP_FIRST" />
      <StepSecond v-if="formStore.currentStep === STEPS.STEP_SECOND" />
      <StepThird v-if="formStore.currentStep === STEPS.STEP_THIRD" />

      <!-- No passo 4, renderiza todos os steps para revisão/edição -->
      <template v-if="formStore.currentStep === STEPS.STEP_REVIEW">
        <StepFirst :showPersonType="false" />
        <StepSecond />
        <StepThird />
      </template>

      <Actions />
    </Card>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { formStore } from "@store/formStore.js";
import StepFirst from "./StepFirst.vue";
import StepSecond from "./StepSecond.vue";
import StepThird from "./StepThird.vue";
import Actions from "./Actions.vue";
import StepIndicator from "@components/StepIndicator/index.vue";
import Card from "@components/Card/index.vue";
import { PERSON_TYPES, STEPS } from "@components/constants.js";

const currentTitle = computed(() => {
  switch (formStore.currentStep) {
    case STEPS.STEP_SECOND:
      return formStore.stepFirst.tipoCadastro === PERSON_TYPES.PJ
        ? "Pessoa Jurídica"
        : "Pessoa Física";
    case STEPS.STEP_THIRD:
      return "Senha de acesso";
    case STEPS.STEP_REVIEW:
      return "Revise suas informações";
    default:
      return "Seja bem vindo(a)";
  }
});
</script>
