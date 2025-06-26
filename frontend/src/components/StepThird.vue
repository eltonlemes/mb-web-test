<template>
  <div>
    <div class="form__group">
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
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import { computed, ref } from "vue";
import { isValidSenha } from "../helpers/utils.js";
import { FEEDBACK_TYPES } from "./constants.js";
const showPassword = ref(false);
function togglePassword() {
  showPassword.value = !showPassword.value;
}

const senhaClass = computed(() => {
  const senha = formStore.stepThird.senha;
  if (senha === "") return FEEDBACK_TYPES.DEFAULT;
  return isValidSenha(senha) ? FEEDBACK_TYPES.SUCCESS : FEEDBACK_TYPES.ERROR;
});
</script>
