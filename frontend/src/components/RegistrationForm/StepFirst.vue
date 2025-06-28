<template>
  <div>
    <!-- Campo de e-mail -->
    <div class="form__group">
      <label for="email">Endereço de e-mail</label>
      <input
        id="email"
        type="email"
        name="email"
        v-model="formStore.fields.email.value"
        :class="`form__field form__field--${formStore.fields.email.class}`"
        placeholder="Digite seu e-mail"
        @input="handleInput('email')"
      />
      <div v-if="formStore.fields.email.message" class="form__field-error">
        {{ formStore.fields.email.message }}
      </div>
    </div>
    <!-- Fim do campo de e-mail -->

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
    <!-- Fim do tipo de cadastro -->
  </div>
</template>

<script setup>
import { handleInput } from "@helpers/validation.js";
import { formStore } from "@store/formStore.js";
import { PERSON_TYPES } from "@components/constants.js";

const props = defineProps({
  showPersonType: { type: Boolean, default: true },
});
</script>
