<template>
  <div>
    <div class="form__group form__group--password">
      <label for="senha">Sua senha</label>
      <div class="form__password-wrapper">
        <input
          id="senha"
          :type="showPassword ? 'text' : 'password'"
          v-model="formStore.stepThird.senha"
          :class="`form__field form__field--${senhaClass}`"
          placeholder="Digite sua senha"
        />
        <button type="button" class="form__password-toggle" @click="togglePassword">
          <span v-if="showPassword">🕶️</span>
          <span v-else>👓</span>
        </button>
      </div>
    </div>
    <div class="form__actions" style="display: flex; gap: 1rem">
      <button class="btn btn--secondary" @click="prevStep">Voltar</button>
      <button class="btn btn--primary" @click="nextStep" :disabled="!canContinue">Continuar</button>
    </div>
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import { computed, onMounted, ref } from "vue";

onMounted(() => {
  formStore.currentTitle = "Senha de acesso";
});

const showPassword = ref(false);
function togglePassword() {
  showPassword.value = !showPassword.value;
}

const senhaClass = computed(() => {
  const senha = formStore.stepThird.senha;
  if (senha === "") return "default";
  return senha.length >= 6 ? "success" : "error";
});

const canContinue = computed(() => formStore.stepThird.senha.length >= 6);

function prevStep() {
  formStore.currentStep--;
}
function nextStep() {
  if (canContinue.value) {
    formStore.currentStep++;
  }
}
</script>
