<template>
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
      :disabled="!canRegister || loading"
    >
      {{ loading ? "Enviando..." : "Cadastrar" }}
    </button>
  </div>

  <div v-if="feedback" :class="['form__feedback', feedback.type]">{{ feedback.message }}</div>
</template>

<script setup>
import { formStore } from "@store/formStore.js";
import { STEPS } from "@components/constants.js";
import { ref, computed } from "vue";
import { canContinueStep1, canContinueStep2, canContinueStep3 } from "@helpers/validation.js";
import { submitRegistration } from "@services/api/registration.js";

const feedback = ref(null);
const loading = ref(false);

// Validação centralizada para cada step
const canContinue = computed(() => {
  switch (formStore.currentStep) {
    case STEPS.STEP_FIRST:
      return canContinueStep1();
    case STEPS.STEP_SECOND:
      return canContinueStep2();
    case STEPS.STEP_THIRD:
      return canContinueStep3();
    default:
      return false;
  }
});

function prevStep() {
  if (formStore.currentStep > STEPS.STEP_FIRST) formStore.currentStep--;
}
function nextStep() {
  if (canContinue.value && formStore.currentStep < STEPS.STEP_REVIEW) formStore.currentStep++;
}

async function submitForm() {
  feedback.value = null;
  loading.value = true;

  // Dados comuns para ambos os tipos
  const basePayload = {
    email: formStore.fields.email.value,
    tipoCadastro: formStore.stepFirst.tipoCadastro,
    senha: formStore.fields.senha.value,
  };

  // Adiciona campos específicos baseado no tipo de cadastro
  let payload;

  if (formStore.stepFirst.tipoCadastro === "PF") {
    payload = {
      ...basePayload,
      nome: formStore.fields.nome.value,
      cpf: formStore.fields.cpf.value,
      dataNascimento: formStore.fields.dataNascimento.value,
      telefone: formStore.fields.telefone.value,
    };
  }
  if (formStore.stepFirst.tipoCadastro === "PJ") {
    payload = {
      ...basePayload,
      razaoSocial: formStore.fields.razaoSocial.value,
      cnpj: formStore.fields.cnpj.value,
      dataAbertura: formStore.fields.dataAbertura.value,
      telefonePJ: formStore.fields.telefonePJ.value,
    };
  }

  try {
    const result = await submitRegistration(payload);

    if (result.success) {
      feedback.value = {
        type: "form__feedback--success",
        message: result.message,
      };
    } else {
      feedback.value = {
        type: "form__feedback--error",
        message: result.message,
      };
    }
  } catch (error) {
    feedback.value = {
      type: "form__feedback--error",
      message: error.message || "Erro de conexão com o servidor.",
    };
  } finally {
    loading.value = false;
  }
}

const canRegister = computed(() => {
  return canContinueStep1() && canContinueStep2() && canContinueStep3();
});
</script>
