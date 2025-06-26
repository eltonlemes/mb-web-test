<template>
  <div>
    <!-- Campos para Pessoa Física -->
    <template v-if="formStore.stepFirst.tipoCadastro === 'PF'">
      <div class="form__group">
        <label for="nome">Nome</label>
        <input
          id="nome"
          type="text"
          v-model="formStore.stepSecond.nome"
          :class="`form__field form__field--${nomeClass}`"
        />
      </div>
      <div class="form__group">
        <label for="cpf">CPF</label>
        <input
          id="cpf"
          type="text"
          v-model="formStore.stepSecond.cpf"
          :class="`form__field form__field--${cpfClass}`"
        />
      </div>
      <div class="form__group">
        <label for="dataNascimento">Data de nascimento</label>
        <input
          id="dataNascimento"
          type="date"
          v-model="formStore.stepSecond.dataNascimento"
          :class="`form__field form__field--${dataNascimentoClass}`"
        />
      </div>
      <div class="form__group">
        <label for="telefone">Telefone</label>
        <input
          id="telefone"
          type="text"
          v-model="formStore.stepSecond.telefone"
          :class="`form__field form__field--${telefoneClass}`"
        />
      </div>
    </template>

    <!-- Campos para Pessoa Jurídica -->
    <template v-else>
      <div class="form__group">
        <label for="razaoSocial">Razão social</label>
        <input
          id="razaoSocial"
          type="text"
          v-model="formStore.stepSecond.razaoSocial"
          :class="`form__field form__field--${razaoSocialClass}`"
        />
      </div>
      <div class="form__group">
        <label for="cnpj">CNPJ</label>
        <input
          id="cnpj"
          type="text"
          v-model="formStore.stepSecond.cnpj"
          :class="`form__field form__field--${cnpjClass}`"
        />
      </div>
      <div class="form__group">
        <label for="dataAbertura">Data de abertura</label>
        <input
          id="dataAbertura"
          type="date"
          v-model="formStore.stepSecond.dataAbertura"
          :class="`form__field form__field--${dataAberturaClass}`"
        />
      </div>
      <div class="form__group">
        <label for="telefonePJ">Telefone</label>
        <input
          id="telefonePJ"
          type="text"
          v-model="formStore.stepSecond.telefonePJ"
          :class="`form__field form__field--${telefonePJClass}`"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import { computed } from "vue";
import {
  isValidNome,
  isValidCPF,
  isValidCNPJ,
  isValidTelefone,
  isValidDate,
} from "../helpers/utils.js";

const nomeClass = computed(() => {
  if (!formStore.stepSecond.nome) return "default";
  return isValidNome(formStore.stepSecond.nome) ? "success" : "error";
});
const razaoSocialClass = computed(() => {
  if (!formStore.stepSecond.razaoSocial) return "default";
  return isValidNome(formStore.stepSecond.razaoSocial) ? "success" : "error";
});
const cpfClass = computed(() => {
  if (!formStore.stepSecond.cpf) return "default";
  return isValidCPF(formStore.stepSecond.cpf) ? "success" : "error";
});
const cnpjClass = computed(() => {
  if (!formStore.stepSecond.cnpj) return "default";
  return isValidCNPJ(formStore.stepSecond.cnpj) ? "success" : "error";
});
const dataNascimentoClass = computed(() => {
  if (!formStore.stepSecond.dataNascimento) return "default";
  return isValidDate(formStore.stepSecond.dataNascimento) ? "success" : "error";
});
const dataAberturaClass = computed(() => {
  if (!formStore.stepSecond.dataAbertura) return "default";
  return isValidDate(formStore.stepSecond.dataAbertura) ? "success" : "error";
});
const telefoneClass = computed(() => {
  if (!formStore.stepSecond.telefone) return "default";
  return isValidTelefone(formStore.stepSecond.telefone) ? "success" : "error";
});
const telefonePJClass = computed(() => {
  if (!formStore.stepSecond.telefonePJ) return "default";
  return isValidTelefone(formStore.stepSecond.telefonePJ) ? "success" : "error";
});
</script>
