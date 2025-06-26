import { reactive } from "vue";
import { STEPS } from "../components/constants.js";
export const formStore = reactive({
  currentStep: STEPS.STEP_FIRST,
  currentTitle: "",
  stepFirst: {
    email: "",
    tipoCadastro: "", // 'PF' ou 'PJ'
  },
  stepSecond: {
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
    senha: "",
  },
});
