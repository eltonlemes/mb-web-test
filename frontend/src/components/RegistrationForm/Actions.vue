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
</template>

<script setup>
import { formStore } from "@store/formStore.js";
import { STEPS } from "@components/constants.js";
import { ref, computed } from "vue";
import { canContinueStep1, canContinueStep2, canContinueStep3 } from "@helpers/validation.js";

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

const canRegister = computed(() => {
  return canContinueStep1() && canContinueStep2() && canContinueStep3();
});
</script>
