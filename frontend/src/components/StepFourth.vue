<template>
  <div>
    <div class="form__group">
      <h2 class="registration-form__title">Revise suas informações</h2>
    </div>
    <div class="form__review">
      <div class="form__review-item">
        <strong>Endereço de e-mail:</strong>
        <span>{{ formStore.stepFirst.email }}</span>
      </div>
      <template v-if="formStore.stepFirst.tipoCadastro === 'PF'">
        <div class="form__review-item">
          <strong>Nome:</strong> <span>{{ formStore.stepSecond.nome }}</span>
        </div>
        <div class="form__review-item">
          <strong>CPF:</strong> <span>{{ formStore.stepSecond.cpf }}</span>
        </div>
        <div class="form__review-item">
          <strong>Data de nascimento:</strong>
          <span>{{ formStore.stepSecond.dataNascimento }}</span>
        </div>
        <div class="form__review-item">
          <strong>Telefone:</strong> <span>{{ formStore.stepSecond.telefone }}</span>
        </div>
      </template>
      <template v-else>
        <div class="form__review-item">
          <strong>Razão social:</strong> <span>{{ formStore.stepSecond.razaoSocial }}</span>
        </div>
        <div class="form__review-item">
          <strong>CNPJ:</strong> <span>{{ formStore.stepSecond.cnpj }}</span>
        </div>
        <div class="form__review-item">
          <strong>Data de abertura:</strong> <span>{{ formStore.stepSecond.dataAbertura }}</span>
        </div>
        <div class="form__review-item">
          <strong>Telefone:</strong> <span>{{ formStore.stepSecond.telefonePJ }}</span>
        </div>
      </template>
      <div class="form__review-item"><strong>Senha:</strong> <span>••••••••</span></div>
    </div>
    <div class="form__actions" style="display: flex; gap: 1rem">
      <button class="btn btn--secondary" @click="prevStep">Voltar</button>
      <button class="btn btn--primary" @click="submitForm">Cadastrar</button>
    </div>
  </div>
</template>

<script setup>
import { formStore } from "../store/formStore.js";
import { onMounted } from "vue";

onMounted(() => {
  formStore.currentTitle = "Revise suas informações";
});

function prevStep() {
  formStore.currentStep--;
}
function submitForm() {
  // Aqui você pode implementar o envio para a API
  alert("Cadastro enviado!");
}
</script>
