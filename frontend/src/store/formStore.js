import { reactive } from "vue";

export const formStore = reactive({
  currentStep: 1,
  currentTitle: "",
  stepFirst: {
    id: 1,
    email: "",
    tipoCadastro: "", // 'PF' ou 'PJ'
  },
  stepSecond: {
    id: 2,
    // PF
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    // PJ
    razaoSocial: "",
    cnpj: "",
    dataAbertura: "",
    telefonePJ: "",
  },
  stepThird: {
    id: 3,
    senha: "",
  },
});
