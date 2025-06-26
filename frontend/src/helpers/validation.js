import { formStore } from "../store/formStore.js";
import {
  isValidEmail,
  isValidNome,
  isValidCPF,
  isValidCNPJ,
  isValidDate,
  isValidTelefone,
} from "./utils.js";

/**
 * Verifica se o usuário pode continuar para o próximo passo
 * Primeiro passo: Verifica se o email é válido
 * Segundo passo: Verifica se o tipo de cadastro está selecionado
 * @returns {boolean}
 */
export function canContinueStep1() {
  if (!isValidEmail(formStore.stepFirst.email)) return false;
  return formStore.stepFirst.tipoCadastro;
}

export function canContinueStep2() {
  if (formStore.stepFirst.tipoCadastro === "PF") {
    if (!isValidNome(formStore.stepSecond.nome)) return false;
    if (!isValidCPF(formStore.stepSecond.cpf)) return false;
    if (!isValidDate(formStore.stepSecond.dataNascimento)) return false;
    if (!isValidTelefone(formStore.stepSecond.telefone)) return false;
    return true;
  }
  if (!isValidNome(formStore.stepSecond.razaoSocial)) return false;
  if (!isValidCNPJ(formStore.stepSecond.cnpj)) return false;
  if (!isValidDate(formStore.stepSecond.dataAbertura)) return false;
  if (!isValidTelefone(formStore.stepSecond.telefonePJ)) return false;
  return true;
}

export function canContinueStep3() {
  return formStore.stepThird.senha && formStore.stepThird.senha.length >= 6;
}

export function canContinueStep4() {
  return true; // Sempre pode continuar na revisão
}
