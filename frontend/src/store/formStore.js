import { reactive } from "vue";
import { STEPS, FEEDBACK_TYPES } from "../components/constants.js";

export const formStore = reactive({
  currentStep: STEPS.STEP_FIRST,
  currentTitle: "",

  // Estrutura padronizada para todos os campos
  fields: {
    email: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    nome: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    cpf: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    dataNascimento: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    telefone: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    razaoSocial: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    cnpj: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    dataAbertura: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    telefonePJ: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
    senha: {
      value: "",
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
      isValid: false,
    },
  },

  // Dados específicos do formulário
  stepFirst: {
    tipoCadastro: "", // 'PF' ou 'PJ'
  },
});
