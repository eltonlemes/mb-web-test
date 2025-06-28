<template>
  <div>
    <!-- Campos para Pessoa Física -->
    <template v-if="formStore.stepFirst.tipoCadastro === PERSON_TYPES.PF">
      <div class="form__group">
        <label for="nome">Nome</label>
        <input
          id="nome"
          type="text"
          v-model="formStore.fields.nome.value"
          :class="`form__field form__field--${formStore.fields.nome.class}`"
          @input="handleInput('nome')"
        />
        <div v-if="formStore.fields.nome.message" class="form__field-error">
          {{ formStore.fields.nome.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="cpf">CPF</label>
        <input
          id="cpf"
          type="text"
          v-model="formStore.fields.cpf.value"
          :class="`form__field form__field--${formStore.fields.cpf.class}`"
          @input="handleInput('cpf')"
        />
        <div v-if="formStore.fields.cpf.message" class="form__field-error">
          {{ formStore.fields.cpf.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="dataNascimento">Data de nascimento</label>
        <input
          id="dataNascimento"
          type="date"
          v-model="formStore.fields.dataNascimento.value"
          :class="`form__field form__field--${formStore.fields.dataNascimento.class}`"
          @input="handleInput('dataNascimento')"
        />
        <div v-if="formStore.fields.dataNascimento.message" class="form__field-error">
          {{ formStore.fields.dataNascimento.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="telefone">Telefone</label>
        <input
          id="telefone"
          type="text"
          v-model="formStore.fields.telefone.value"
          :class="`form__field form__field--${formStore.fields.telefone.class}`"
          @input="handleInput('telefone')"
        />
        <div v-if="formStore.fields.telefone.message" class="form__field-error">
          {{ formStore.fields.telefone.message }}
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
          v-model="formStore.fields.razaoSocial.value"
          :class="`form__field form__field--${formStore.fields.razaoSocial.class}`"
          @input="handleInput('razaoSocial')"
        />
        <div v-if="formStore.fields.razaoSocial.message" class="form__field-error">
          {{ formStore.fields.razaoSocial.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="cnpj">CNPJ</label>
        <input
          id="cnpj"
          type="text"
          v-model="formStore.fields.cnpj.value"
          :class="`form__field form__field--${formStore.fields.cnpj.class}`"
          @input="handleInput('cnpj')"
        />
        <div v-if="formStore.fields.cnpj.message" class="form__field-error">
          {{ formStore.fields.cnpj.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="dataAbertura">Data de abertura</label>
        <input
          id="dataAbertura"
          type="date"
          v-model="formStore.fields.dataAbertura.value"
          :class="`form__field form__field--${formStore.fields.dataAbertura.class}`"
          @input="handleInput('dataAbertura')"
        />
        <div v-if="formStore.fields.dataAbertura.message" class="form__field-error">
          {{ formStore.fields.dataAbertura.message }}
        </div>
      </div>
      <div class="form__group">
        <label for="telefonePJ">Telefone</label>
        <input
          id="telefonePJ"
          type="text"
          v-model="formStore.fields.telefonePJ.value"
          :class="`form__field form__field--${formStore.fields.telefonePJ.class}`"
          @input="handleInput('telefonePJ')"
        />
        <div v-if="formStore.fields.telefonePJ.message" class="form__field-error">
          {{ formStore.fields.telefonePJ.message }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { formStore } from "@store/formStore.js";
import { handleInput } from "@helpers/validation.js";
import { PERSON_TYPES } from "@components/constants.js";
</script>
