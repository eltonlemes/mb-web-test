<template>
  <div>
    <!-- Campo de e-mail -->
    <div class="form__group">
      <label for="email">Endereço de e-mail</label>
      <input
        id="email"
        type="email"
        v-model="formStore.stepFirst.email"
        :class="`form__field form__field--${emailValidation.class}`"
        placeholder="Digite seu e-mail"
      />
      <div v-if="emailValidation.message" class="form__field-error">
        {{ emailValidation.message }}
      </div>
    </div>

    <!-- Tipo de cadastro -->
    <div class="form__group" v-if="showPersonType">
      <div class="form__radio-group">
        <label>
          <input type="radio" :value="PERSON_TYPES.PF" v-model="formStore.stepFirst.tipoCadastro" />
          Pessoa física
        </label>
        <label>
          <input type="radio" :value="PERSON_TYPES.PJ" v-model="formStore.stepFirst.tipoCadastro" />
          Pessoa jurídica
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { getEmailValidation } from "@helpers/utils.js";
import { formStore } from "@store/formStore.js";
import { PERSON_TYPES } from "@components/constants.js";

const props = defineProps({
  showPersonType: { type: Boolean, default: true },
});

const emailValidation = computed(() => {
  return getEmailValidation(formStore.stepFirst.email);
});
</script>
