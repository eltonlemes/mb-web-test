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
          :class="`form__field form__field--${nomeValidation.class}`"
        />
        <div v-if="nomeValidation.message" class="form__field-error">
          {{ nomeValidation.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="cpf">CPF</label>
        <input
          id="cpf"
          type="text"
          v-model="formStore.stepSecond.cpf"
          :class="`form__field form__field--${cpfValidation.class}`"
        />
        <div v-if="cpfValidation.message" class="form__field-error">
          {{ cpfValidation.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="dataNascimento">Data de nascimento</label>
        <input
          id="dataNascimento"
          type="date"
          v-model="formStore.stepSecond.dataNascimento"
          :class="`form__field form__field--${dataNascimentoValidation.class}`"
        />
        <div v-if="dataNascimentoValidation.message" class="form__field-error">
          {{ dataNascimentoValidation.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="telefone">Telefone</label>
        <input
          id="telefone"
          type="text"
          v-model="formStore.stepSecond.telefone"
          :class="`form__field form__field--${telefoneValidation.class}`"
        />
        <div v-if="telefoneValidation.message" class="form__field-error">
          {{ telefoneValidation.message }}
        </div>
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
          :class="`form__field form__field--${razaoSocialValidation.class}`"
        />
        <div v-if="razaoSocialValidation.message" class="form__field-error">
          {{ razaoSocialValidation.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="cnpj">CNPJ</label>
        <input
          id="cnpj"
          type="text"
          v-model="formStore.stepSecond.cnpj"
          :class="`form__field form__field--${cnpjValidation.class}`"
        />
        <div v-if="cnpjValidation.message" class="form__field-error">
          {{ cnpjValidation.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="dataAbertura">Data de abertura</label>
        <input
          id="dataAbertura"
          type="date"
          v-model="formStore.stepSecond.dataAbertura"
          :class="`form__field form__field--${dataAberturaValidation.class}`"
        />
        <div v-if="dataAberturaValidation.message" class="form__field-error">
          {{ dataAberturaValidation.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="telefonePJ">Telefone</label>
        <input
          id="telefonePJ"
          type="text"
          v-model="formStore.stepSecond.telefonePJ"
          :class="`form__field form__field--${telefonePJValidation.class}`"
        />
        <div v-if="telefonePJValidation.message" class="form__field-error">
          {{ telefonePJValidation.message }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { formStore } from "@store/formStore.js";
import { computed } from "vue";
import {
  getNomeValidation,
  getCPFValidation,
  getCNPJValidation,
  getTelefoneValidation,
  getDataNascimentoValidation,
  getDataAberturaValidation,
} from "@helpers/utils.js";
import { PERSON_TYPES } from "@components/constants.js";

// Validações para Pessoa Física
const nomeValidation = computed(() => getNomeValidation(formStore.stepSecond.nome));
const cpfValidation = computed(() => getCPFValidation(formStore.stepSecond.cpf));
const dataNascimentoValidation = computed(() =>
  getDataNascimentoValidation(formStore.stepSecond.dataNascimento)
);
const telefoneValidation = computed(() => getTelefoneValidation(formStore.stepSecond.telefone));

// Validações para Pessoa Jurídica
const razaoSocialValidation = computed(() => getNomeValidation(formStore.stepSecond.razaoSocial));
const cnpjValidation = computed(() => getCNPJValidation(formStore.stepSecond.cnpj));
const dataAberturaValidation = computed(() =>
  getDataAberturaValidation(formStore.stepSecond.dataAbertura)
);
const telefonePJValidation = computed(() => getTelefoneValidation(formStore.stepSecond.telefonePJ));
</script>
