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
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import { computed, ref } from "vue";

const showPassword = ref(false);
function togglePassword() {
  showPassword.value = !showPassword.value;
}

const senhaClass = computed(() => {
  const senha = formStore.stepThird.senha;
  if (senha === "") return "default";
  return senha.length >= 6 ? "success" : "error";
});
</script>
