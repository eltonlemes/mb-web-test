import { formStore } from "../store/formStore.js";
import {
  isValidEmail,
  isValidSenha,
  isValidCPF,
  isValidCNPJ,
  isValidDataNascimento,
  isValidDataAbertura,
  isValidTelefone,
} from "./utils.js";

import { PERSON_TYPES, FEEDBACK_TYPES } from "../components/constants.js";

/**
 * Configuração de validação para todos os campos
 */
const FIELD_CONFIG = {
  email: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.length > 100,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "E-mail deve ter no máximo 100 caracteres",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidEmail(v),
        result: { class: FEEDBACK_TYPES.ERROR, message: "E-mail inválido", isValid: false },
      },
    ],
  },
  nome: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.trim().length < 3,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Nome deve ter pelo menos 3 caracteres",
          isValid: false,
        },
      },
      {
        check: (v) => v.trim().length > 100,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Nome deve ter no máximo 100 caracteres",
          isValid: false,
        },
      },
    ],
  },
  cpf: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.replace(/\D/g, "").length !== 11,
        result: { class: FEEDBACK_TYPES.ERROR, message: "CPF deve ter 11 dígitos", isValid: false },
      },
      {
        check: (v) => /^(\d)\1+$/.test(v.replace(/\D/g, "")),
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "CPF não pode ter todos os dígitos iguais",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidCPF(v),
        result: { class: FEEDBACK_TYPES.ERROR, message: "CPF inválido", isValid: false },
      },
    ],
  },
  dataNascimento: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => !/^\d{4}-\d{2}-\d{2}$/.test(v),
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Formato de data inválido",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidDataNascimento(v),
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Data de nascimento inválida (18-130 anos)",
          isValid: false,
        },
      },
    ],
  },
  telefone: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.replace(/\D/g, "").length < 10,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Telefone deve ter pelo menos 10 dígitos",
          isValid: false,
        },
      },
      {
        check: (v) => v.replace(/\D/g, "").length > 11,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Telefone deve ter no máximo 11 dígitos",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidTelefone(v),
        result: { class: FEEDBACK_TYPES.ERROR, message: "Telefone inválido", isValid: false },
      },
    ],
  },
  razaoSocial: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.trim().length < 3,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Razão social deve ter pelo menos 3 caracteres",
          isValid: false,
        },
      },
      {
        check: (v) => v.trim().length > 100,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Razão social deve ter no máximo 100 caracteres",
          isValid: false,
        },
      },
    ],
  },
  cnpj: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.replace(/\D/g, "").length !== 14,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "CNPJ deve ter 14 dígitos",
          isValid: false,
        },
      },
      {
        check: (v) => /^(\d)\1+$/.test(v.replace(/\D/g, "")),
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "CNPJ não pode ter todos os dígitos iguais",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidCNPJ(v),
        result: { class: FEEDBACK_TYPES.ERROR, message: "CNPJ inválido", isValid: false },
      },
    ],
  },
  dataAbertura: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => !/^\d{4}-\d{2}-\d{2}$/.test(v),
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Formato de data inválido",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidDataAbertura(v),
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Data de abertura não pode ser futura",
          isValid: false,
        },
      },
    ],
  },
  telefonePJ: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.replace(/\D/g, "").length < 10,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Telefone deve ter pelo menos 10 dígitos",
          isValid: false,
        },
      },
      {
        check: (v) => v.replace(/\D/g, "").length > 11,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Telefone deve ter no máximo 11 dígitos",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidTelefone(v),
        result: { class: FEEDBACK_TYPES.ERROR, message: "Telefone inválido", isValid: false },
      },
    ],
  },
  senha: {
    rules: [
      {
        check: (v) => !v?.trim(),
        result: { class: FEEDBACK_TYPES.DEFAULT, message: "", isValid: false },
      },
      {
        check: (v) => v.length < 6,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Senha deve ter pelo menos 6 caracteres",
          isValid: false,
        },
      },
      {
        check: (v) => v.length > 50,
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Senha deve ter no máximo 50 caracteres",
          isValid: false,
        },
      },
      {
        check: (v) => !isValidSenha(v),
        result: {
          class: FEEDBACK_TYPES.ERROR,
          message: "Senha deve conter letra maiúscula, número ou caractere especial",
          isValid: false,
        },
      },
    ],
  },
};

/**
 * Função universal para validar qualquer campo
 * @param {string} fieldKey - Chave do campo (email, nome, cpf, etc)
 */
export function handleInput(fieldKey) {
  const config = FIELD_CONFIG[fieldKey];
  if (!config) {
    console.warn(`Campo ${fieldKey} não configurado`);
    return;
  }

  const value = formStore.fields[fieldKey].value;

  // Aplica regras em ordem de prioridade
  for (const rule of config.rules) {
    if (rule.check(value)) {
      updateFieldState(fieldKey, rule.result);
      return;
    }
  }

  // Se passou em todas as regras, é válido
  updateFieldState(fieldKey, {
    class: FEEDBACK_TYPES.SUCCESS,
    message: "",
    isValid: true,
  });
}

/**
 * Atualiza o estado do campo no store
 * @param {string} fieldKey - Chave do campo
 * @param {Object} state - Novo estado {class, message, isValid}
 */
function updateFieldState(fieldKey, state) {
  Object.assign(formStore.fields[fieldKey], state);
}

/**
 * Validações para navegação entre steps
 */
export function canContinueStep1() {
  return formStore.fields.email.isValid && formStore.stepFirst.tipoCadastro;
}

export function canContinueStep2() {
  if (formStore.stepFirst.tipoCadastro === PERSON_TYPES.PF) {
    return (
      formStore.fields.nome.isValid &&
      formStore.fields.cpf.isValid &&
      formStore.fields.dataNascimento.isValid &&
      formStore.fields.telefone.isValid
    );
  }
  return (
    formStore.fields.razaoSocial.isValid &&
    formStore.fields.cnpj.isValid &&
    formStore.fields.dataAbertura.isValid &&
    formStore.fields.telefonePJ.isValid
  );
}

export function canContinueStep3() {
  return formStore.fields.senha.isValid;
}

export function canContinueStep4() {
  return true;
}
