<template>
  <div>
    <!-- Campos para Pessoa Física -->
    <template v-if="formStore.stepFirst.tipoCadastro === PERSON_TYPES.PF">
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
import { PERSON_TYPES, FEEDBACK_TYPES } from "./constants.js";

const nomeClass = computed(() => {
  if (!formStore.stepSecond.nome) return FEEDBACK_TYPES.DEFAULT;
  return isValidNome(formStore.stepSecond.nome) ? FEEDBACK_TYPES.SUCCESS : FEEDBACK_TYPES.ERROR;
});
const razaoSocialClass = computed(() => {
  if (!formStore.stepSecond.razaoSocial) return FEEDBACK_TYPES.DEFAULT;
  return isValidNome(formStore.stepSecond.razaoSocial)
    ? FEEDBACK_TYPES.SUCCESS
    : FEEDBACK_TYPES.ERROR;
});
const cpfClass = computed(() => {
  if (!formStore.stepSecond.cpf) return FEEDBACK_TYPES.DEFAULT;
  return isValidCPF(formStore.stepSecond.cpf) ? FEEDBACK_TYPES.SUCCESS : FEEDBACK_TYPES.ERROR;
});
const cnpjClass = computed(() => {
  if (!formStore.stepSecond.cnpj) return FEEDBACK_TYPES.DEFAULT;
  return isValidCNPJ(formStore.stepSecond.cnpj) ? FEEDBACK_TYPES.SUCCESS : FEEDBACK_TYPES.ERROR;
});
const dataNascimentoClass = computed(() => {
  if (!formStore.stepSecond.dataNascimento) return FEEDBACK_TYPES.DEFAULT;
  return isValidDate(formStore.stepSecond.dataNascimento)
    ? FEEDBACK_TYPES.SUCCESS
    : FEEDBACK_TYPES.ERROR;
});
const dataAberturaClass = computed(() => {
  if (!formStore.stepSecond.dataAbertura) return FEEDBACK_TYPES.DEFAULT;
  return isValidDate(formStore.stepSecond.dataAbertura)
    ? FEEDBACK_TYPES.SUCCESS
    : FEEDBACK_TYPES.ERROR;
});
const telefoneClass = computed(() => {
  if (!formStore.stepSecond.telefone) return FEEDBACK_TYPES.DEFAULT;
  return isValidTelefone(formStore.stepSecond.telefone)
    ? FEEDBACK_TYPES.SUCCESS
    : FEEDBACK_TYPES.ERROR;
});
const telefonePJClass = computed(() => {
  if (!formStore.stepSecond.telefonePJ) return FEEDBACK_TYPES.DEFAULT;
  return isValidTelefone(formStore.stepSecond.telefonePJ)
    ? FEEDBACK_TYPES.SUCCESS
    : FEEDBACK_TYPES.ERROR;
});
</script>
