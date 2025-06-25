<template>
  <div>
    <!-- Campos para Pessoa Física -->
    <template v-if="formStore.stepFirst.tipoCadastro === 'PF'">
      <div class="form__group">
        <label for="nome">Nome</label>
        <input id="nome" type="text" v-model="formStore.stepSecond.nome" class="form__field" />
      </div>
      <div class="form__group">
        <label for="cpf">CPF</label>
        <input id="cpf" type="text" v-model="formStore.stepSecond.cpf" class="form__field" />
      </div>
      <div class="form__group">
        <label for="dataNascimento">Data de nascimento</label>
        <input
          id="dataNascimento"
          type="date"
          v-model="formStore.stepSecond.dataNascimento"
          class="form__field"
        />
      </div>
      <div class="form__group">
        <label for="telefone">Telefone</label>
        <input
          id="telefone"
          type="text"
          v-model="formStore.stepSecond.telefone"
          class="form__field"
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
          class="form__field"
        />
      </div>
      <div class="form__group">
        <label for="cnpj">CNPJ</label>
        <input id="cnpj" type="text" v-model="formStore.stepSecond.cnpj" class="form__field" />
      </div>
      <div class="form__group">
        <label for="dataAbertura">Data de abertura</label>
        <input
          id="dataAbertura"
          type="date"
          v-model="formStore.stepSecond.dataAbertura"
          class="form__field"
        />
      </div>
      <div class="form__group">
        <label for="telefonePJ">Telefone</label>
        <input
          id="telefonePJ"
          type="text"
          v-model="formStore.stepSecond.telefonePJ"
          class="form__field"
        />
      </div>
    </template>

    <!-- Botões de navegação -->
    <div class="form__actions" style="display: flex; gap: 1rem">
      <button class="btn btn--secondary" @click="prevStep">Voltar</button>
      <button class="btn btn--primary" @click="nextStep">Continuar</button>
    </div>
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import { computed, onMounted } from "vue";

const titulo = computed(() =>
  formStore.stepFirst.tipoCadastro === "PJ" ? "Pessoa Jurídica" : "Pessoa Física"
);

onMounted(() => {
  formStore.currentTitle = titulo.value;
});

function prevStep() {
  formStore.currentStep--;
}
function nextStep() {
  formStore.currentStep++;
}
</script>
