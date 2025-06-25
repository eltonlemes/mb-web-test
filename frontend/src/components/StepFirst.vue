<template>
  <div>
    <!-- Campo de e-mail -->
    <div class="form__group">
      <label for="email">Endereço de e-mail</label>
      <input
        id="email"
        type="email"
        v-model="formStore.stepFirst.email"
        :class="`form__field form__field--${emailClass}`"
        placeholder="Digite seu e-mail"
      />
    </div>

    <!-- Tipo de cadastro -->
    <div class="form__group">
      <div class="form__radio-group">
        <label>
          <input type="radio" value="PF" v-model="formStore.stepFirst.tipoCadastro" />
          Pessoa física
        </label>
        <label>
          <input type="radio" value="PJ" v-model="formStore.stepFirst.tipoCadastro" />
          Pessoa jurídica
        </label>
      </div>
    </div>

    <!-- Botão Continuar -->
    <div class="form__actions">
      <button class="btn btn--primary" @click="nextStep" :disabled="!canContinue">Continuar</button>
    </div>
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import { computed } from "vue";
import { isValidEmail } from "../helpers.js";

const emailClass = computed(() => {
  const email = formStore.stepFirst.email;
  if (email === "") return "default";
  if (!isValidEmail(email)) return "error";
  return "success";
});

const canContinue = computed(() => {
  return isValidEmail(formStore.stepFirst.email) && formStore.stepFirst.tipoCadastro !== "";
});

function nextStep() {
  if (canContinue.value) {
    formStore.currentStep++;
  }
}
</script>
