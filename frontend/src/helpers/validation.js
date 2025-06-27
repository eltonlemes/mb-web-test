import { formStore } from "../store/formStore.js";
import {
  isValidEmail,
  isValidNome,
  isValidSenha,
  isValidCPF,
  isValidCNPJ,
  isValidDataNascimento,
  isValidDataAbertura,
  isValidTelefone,
} from "./utils.js";

import { PERSON_TYPES } from "../components/constants.js";

/**
 * Primeiro passo: Verifica se o email é válido
 * Segundo passo: Verifica se o tipo de cadastro está selecionado
 * @returns {boolean}
 */
export function canContinueStep1() {
  if (!isValidEmail(formStore.stepFirst.email)) return false;
  return formStore.stepFirst.tipoCadastro;
}

/**
 * Primeiro passo: Verifica se é Pessoa Física ou Pessoa Jurídica
 * Segundo passo: Se for Pessoa Física, verifica se o nome é válido, se o CPF é válido, se a data de nascimento é válida (18-150 anos) e se o telefone é válido
 * Terceiro passo: Se for Pessoa Jurídica, verifica se a razão social é válida, se o CNPJ é válido, se a data de abertura é válida e se o telefone é válido
 * @returns {boolean}
 */
export function canContinueStep2() {
  if (formStore.stepFirst.tipoCadastro === PERSON_TYPES.PF) {
    if (!isValidNome(formStore.stepSecond.nome)) return false;
    if (!isValidCPF(formStore.stepSecond.cpf)) return false;
    if (!isValidDataNascimento(formStore.stepSecond.dataNascimento)) return false;
    if (!isValidTelefone(formStore.stepSecond.telefone)) return false;
    return true;
  }
  if (!isValidNome(formStore.stepSecond.razaoSocial)) return false;
  if (!isValidCNPJ(formStore.stepSecond.cnpj)) return false;
  if (!isValidDataAbertura(formStore.stepSecond.dataAbertura)) return false;
  if (!isValidTelefone(formStore.stepSecond.telefonePJ)) return false;
  return true;
}

/**
 * Terceiro passo: Verifica se a senha é válida
 * @returns {boolean}
 */
export function canContinueStep3() {
  return isValidSenha(formStore.stepThird.senha);
}

/**
 * Quarto passo: Sempre pode continuar na revisão
 * @returns {boolean}
 */
export function canContinueStep4() {
  return true; // Sempre pode continuar na revisão
}
