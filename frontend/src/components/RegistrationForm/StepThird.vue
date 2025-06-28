<template>
  <div>
    <div class="form__group">
      <label for="senha">Sua senha</label>
      <div class="form__password-wrapper">
        <input
          id="senha"
          :type="showPassword ? 'text' : 'password'"
          v-model="formStore.stepThird.senha"
          :class="`form__field form__field--${senhaValidation.class}`"
          placeholder="Digite sua senha"
        />
        <button type="button" class="form__password-toggle" @click="togglePassword">
          <span v-if="showPassword">🕶️</span>
          <span v-else>👓</span>
        </button>
      </div>
      <div v-if="senhaValidation.message" class="form__field-error">
        {{ senhaValidation.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { formStore } from "@store/formStore.js";
import { computed, ref } from "vue";
import { getSenhaValidation } from "@helpers/utils.js";

const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

const senhaValidation = computed(() => {
  return getSenhaValidation(formStore.stepThird.senha);
});
</script>
