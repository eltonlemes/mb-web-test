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
      <h1 class="registration-form__title">{{ currentTitle }}</h1>

      <StepFirst v-if="formStore.currentStep === STEPS.STEP_FIRST" />
      <StepSecond v-if="formStore.currentStep === STEPS.STEP_SECOND" />
      <StepThird v-if="formStore.currentStep === STEPS.STEP_THIRD" />

      <!-- No passo 4, renderiza todos os steps para revisão/edição -->
      <template v-if="formStore.currentStep === STEPS.STEP_REVIEW">
        <StepFirst :showPersonType="false" />
        <StepSecond />
        <StepThird />
      </template>

      <div v-if="feedback" :class="['form__feedback', feedback.type]">{{ feedback.message }}</div>
      <div class="form__actions" style="display: flex; gap: 1rem">
        <button
          v-if="formStore.currentStep > STEPS.STEP_FIRST"
          class="btn btn--secondary"
          @click="prevStep"
          :disabled="loading"
        >
          Voltar
        </button>
        <button
          v-if="formStore.currentStep < STEPS.STEP_REVIEW"
          class="btn btn--primary"
          @click="nextStep"
          :disabled="!canContinue || loading"
        >
          Continuar
        </button>
        <button
          v-if="formStore.currentStep === STEPS.STEP_REVIEW"
          class="btn btn--primary"
          @click="submitForm"
          :disabled="loading"
        >
          {{ loading ? "Enviando..." : "Cadastrar" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { formStore } from "../store/formStore.js";
import StepFirst from "./StepFirst.vue";
import StepSecond from "./StepSecond.vue";
import StepThird from "./StepThird.vue";
import { PERSON_TYPES, STEPS } from "./constants.js";
import {
  canContinueStep1,
  canContinueStep2,
  canContinueStep3,
  canContinueStep4,
} from "../helpers/validation.js";

const titles = ["Seja bem vindo(a)", "Senha de acesso", "Revise suas informações"];

const currentTitle = computed(() => {
  if (formStore.currentStep === STEPS.STEP_SECOND) {
    return formStore.stepFirst.tipoCadastro === PERSON_TYPES.PJ
      ? "Pessoa Jurídica"
      : "Pessoa Física";
  }
  return titles[formStore.currentStep - 1];
});

const feedback = ref(null);
const loading = ref(false);

function prevStep() {
  if (formStore.currentStep > STEPS.STEP_FIRST) formStore.currentStep--;
}
function nextStep() {
  if (canContinue.value && formStore.currentStep < STEPS.STEP_REVIEW) formStore.currentStep++;
}
async function submitForm() {
  feedback.value = null;
  loading.value = true;
  // Monta o payload para o backend
  const payload = {
    email: formStore.stepFirst.email,
    tipoCadastro: formStore.stepFirst.tipoCadastro,
    nome: formStore.stepSecond.nome,
    cpf: formStore.stepSecond.cpf,
    dataNascimento: formStore.stepSecond.dataNascimento,
    telefone: formStore.stepSecond.telefone,
    razaoSocial: formStore.stepSecond.razaoSocial,
    cnpj: formStore.stepSecond.cnpj,
    dataAbertura: formStore.stepSecond.dataAbertura,
    telefonePJ: formStore.stepSecond.telefonePJ,
    senha: formStore.stepThird.senha,
  };
  try {
    const res = await fetch("/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      feedback.value = {
        type: "success",
        message: data.message || "Cadastro realizado com sucesso!",
      };
    } else {
      feedback.value = { type: "error", message: data.error || "Erro ao cadastrar." };
    }
  } catch (e) {
    feedback.value = { type: "error", message: "Erro de conexão com o servidor." };
  } finally {
    loading.value = false;
  }
}

// Validação centralizada para cada step
const canContinue = computed(() => {
  switch (formStore.currentStep) {
    case STEPS.STEP_FIRST:
      return canContinueStep1();
    case STEPS.STEP_SECOND:
      return canContinueStep2();
    case STEPS.STEP_THIRD:
      return canContinueStep3();
    case STEPS.STEP_REVIEW:
      return canContinueStep4();
    default:
      return false;
  }
});
</script>
