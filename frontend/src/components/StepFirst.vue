<template>
  <div>
    <!-- Campo de e-mail -->
    <div class="form__group">
      <label for="email">Endereço de e-mail</label>
      <input
        id="email"
        type="email"
        v-model="formStore.stepFirst.email"
        class="form__field"
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
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
</script>
