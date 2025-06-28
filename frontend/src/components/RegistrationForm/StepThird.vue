<template>
  <div>
    <div class="form__group">
      <label for="senha">Sua senha</label>
      <div class="form__password-wrapper">
        <input
          id="senha"
          :type="showPassword ? 'text' : 'password'"
          v-model="formStore.fields.senha.value"
          :class="`form__field form__field--${formStore.fields.senha.class}`"
          placeholder="Digite sua senha"
          @input="handleInput('senha')"
        />
        <button type="button" class="form__password-toggle" @click="togglePassword">
          <span v-if="showPassword">🕶️</span>
          <span v-else>👓</span>
        </button>
      </div>
      <div v-if="formStore.fields.senha.message" class="form__field-error">
        {{ formStore.fields.senha.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { formStore } from "@store/formStore.js";
import { ref } from "vue";
import { handleInput } from "@helpers/validation.js";

const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>
