import { reactive } from "vue";

export const formStore = reactive({
  currentStep: 1,
  stepFirst: {
    id: 1,
    title: "Seja bem vindo(a)",
    email: "",
    tipoCadastro: "", // 'PF' ou 'PJ'
  },
});
