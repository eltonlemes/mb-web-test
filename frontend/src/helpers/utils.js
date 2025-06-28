import { FEEDBACK_TYPES } from "../components/constants.js";

/**
 * FUNÇÕES DE VALIDAÇÃO COMPLETAS
 *
 * Estas funções retornam um objeto com:
 * {
 *   isValid: boolean,    // Se é válido
 *   class: string,       // Classe CSS (success, error, default)
 *   message: string      // Mensagem de erro (vazia se válido)
 * }
 *
 * Exemplo de uso no componente:
 *
 * const emailValidation = computed(() => getEmailValidation(email.value));
 *
 * No template:
 * :class="`form__field--${emailValidation.class}`"
 * <div v-if="emailValidation.message">{{ emailValidation.message }}</div>
 */

/**
 * Verifica se o email é válido
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Valida email e retorna informações detalhadas
 * @param {string} email
 * @returns {{isValid: boolean, message: string}}
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return { isValid: false, message: "E-mail é obrigatório" };
  }

  if (email.length > 100) {
    return { isValid: false, message: "E-mail deve ter no máximo 100 caracteres" };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, message: "E-mail inválido" };
  }

  return { isValid: true, message: "E-mail válido" };
}

/**
 * Verifica se o nome é válido
 * @param {string} nome
 * @returns {boolean}
 */
export function isValidNome(nome) {
  return nome && nome.trim().length > 2;
}

/**
 * Verifica se o CPF é válido
 * @param {string} cpf
 * @returns {boolean}
 */
export function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

/**
 * Verifica se a senha é válida
 * @param {string} senha
 * @returns {boolean}
 */
export function isValidSenha(senha) {
  return senha && senha.trim().length >= 6;
}

/**
 * Valida senha e retorna informações detalhadas
 * @param {string} senha
 * @returns {{isValid: boolean, message: string}}
 */
export function validateSenha(senha) {
  if (!senha || !senha.trim()) {
    return { isValid: false, message: "Senha é obrigatória" };
  }

  if (senha.length < 6) {
    return { isValid: false, message: "Senha deve ter pelo menos 6 caracteres" };
  }

  if (senha.length > 50) {
    return { isValid: false, message: "Senha deve ter no máximo 50 caracteres" };
  }

  // Verificações de segurança opcionais
  const hasUpperCase = /[A-Z]/.test(senha);
  const hasLowerCase = /[a-z]/.test(senha);
  const hasNumbers = /\d/.test(senha);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  if (!hasUpperCase && !hasNumbers && !hasSpecialChar) {
    return {
      isValid: false,
      message: "Senha deve conter pelo menos uma letra maiúscula, número ou caractere especial",
    };
  }

  return { isValid: true, message: "Senha válida" };
}

/**
 * Verifica se o CNPJ é válido
 * @param {string} cnpj
 * @returns {boolean}
 */
export function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14) return false;
  // Elimina CNPJs com todos os dígitos iguais
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
}

/**
 * Verifica se o telefone é válido
 * @param {string} telefone
 * @returns {boolean}
 */
export function isValidTelefone(telefone) {
  telefone = telefone.replace(/\D/g, "");
  if (!/^\d{10,11}$/.test(telefone)) return false;
  // DDD válido (11 a 99)
  const ddd = telefone.substring(0, 2);
  if (parseInt(ddd) < 11 || parseInt(ddd) > 99) return false;
  // Não pode ser sequência repetida
  if (/^(\d)\1+$/.test(telefone)) return false;
  // Se for celular (11 dígitos), o terceiro dígito deve ser 9
  if (telefone.length === 11 && telefone[2] !== "9") return false;
  return true;
}

/**
 * Verifica se a data é válida (formato e existência)
 * @param {string} dateStr
 * @returns {boolean}
 */
export function isValidDate(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
}

/**
 * Calcula a idade baseada na data de nascimento
 * @param {string} dateStr - Data no formato YYYY-MM-DD
 * @returns {number} - Idade em anos
 */
export function calculateAge(dateStr) {
  const birthDate = new Date(dateStr);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Ajusta a idade se ainda não fez aniversário este ano
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Verifica se a data de nascimento é válida e retorna informações detalhadas
 * @param {string} dateStr - Data no formato YYYY-MM-DD
 * @returns {{isValid: boolean, message: string, age?: number}}
 *
 * @example
 * // Exemplos de uso:
 * validateDataNascimento('2000-01-01') // { isValid: true, message: "Data de nascimento válida", age: 24 }
 * validateDataNascimento('2010-01-01') // { isValid: false, message: "Idade mínima é 18 anos. Você tem 14 anos", age: 14 }
 * validateDataNascimento('1800-01-01') // { isValid: false, message: "Idade máxima é 150 anos. Você tem 224 anos", age: 224 }
 * validateDataNascimento('2025-01-01') // { isValid: false, message: "Data de nascimento não pode ser futura" }
 */
export function validateDataNascimento(dateStr) {
  // Verifica formato
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { isValid: false, message: "Formato de data inválido. Use YYYY-MM-DD" };
  }

  // Verifica se a data existe
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: "Data inválida" };
  }

  // Verifica se não é futura
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) {
    return { isValid: false, message: "Data de nascimento não pode ser futura" };
  }

  // Calcula idade
  const age = calculateAge(dateStr);

  // Verifica idade mínima
  if (age < 18) {
    return {
      isValid: false,
      message: `Idade mínima é 18 anos. Você tem ${age} anos`,
      age,
    };
  }

  // Verifica idade máxima
  if (age > 130) {
    return {
      isValid: false,
      message: `Idade máxima é 130 anos. Você tem ${age} anos`,
      age,
    };
  }

  return {
    isValid: true,
    message: "Data de nascimento válida",
    age,
  };
}

/**
 * Verifica se a data de nascimento é válida (entre 18 e 150 anos)
 * @param {string} dateStr - Data no formato YYYY-MM-DD
 * @returns {boolean}
 */
export function isValidDataNascimento(dateStr) {
  return validateDataNascimento(dateStr).isValid;
}

/**
 * Verifica se a data de abertura da empresa é válida (não pode ser futura)
 * @param {string} dateStr - Data no formato YYYY-MM-DD
 * @returns {boolean}
 */
export function isValidDataAbertura(dateStr) {
  return isValidDate(dateStr);
}

/**
 * Valida nome e retorna informações detalhadas
 * @param {string} nome
 * @returns {{isValid: boolean, message: string}}
 */
export function validateNome(nome) {
  if (!nome || !nome.trim()) {
    return { isValid: false, message: "Nome é obrigatório" };
  }
  if (nome.trim().length < 3) {
    return { isValid: false, message: "Nome deve ter pelo menos 3 caracteres" };
  }
  if (nome.trim().length > 100) {
    return { isValid: false, message: "Nome deve ter no máximo 100 caracteres" };
  }
  return { isValid: true, message: "Nome válido" };
}

/**
 * Valida CPF e retorna informações detalhadas
 * @param {string} cpf
 * @returns {{isValid: boolean, message: string}}
 */
export function validateCPF(cpf) {
  if (!cpf || !cpf.trim()) {
    return { isValid: false, message: "CPF é obrigatório" };
  }

  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) {
    return { isValid: false, message: "CPF deve ter 11 dígitos" };
  }

  if (/^(\d)\1+$/.test(cleanCPF)) {
    return { isValid: false, message: "CPF não pode ter todos os dígitos iguais" };
  }

  if (!isValidCPF(cpf)) {
    return { isValid: false, message: "CPF inválido" };
  }

  return { isValid: true, message: "CPF válido" };
}

/**
 * Valida CNPJ e retorna informações detalhadas
 * @param {string} cnpj
 * @returns {{isValid: boolean, message: string}}
 */
export function validateCNPJ(cnpj) {
  if (!cnpj || !cnpj.trim()) {
    return { isValid: false, message: "CNPJ é obrigatório" };
  }

  const cleanCNPJ = cnpj.replace(/\D/g, "");

  if (cleanCNPJ.length !== 14) {
    return { isValid: false, message: "CNPJ deve ter 14 dígitos" };
  }

  if (/^(\d)\1+$/.test(cleanCNPJ)) {
    return { isValid: false, message: "CNPJ não pode ter todos os dígitos iguais" };
  }

  if (!isValidCNPJ(cnpj)) {
    return { isValid: false, message: "CNPJ inválido" };
  }

  return { isValid: true, message: "CNPJ válido" };
}

/**
 * Valida telefone e retorna informações detalhadas
 * @param {string} telefone
 * @returns {{isValid: boolean, message: string}}
 */
export function validateTelefone(telefone) {
  if (!telefone || !telefone.trim()) {
    return { isValid: false, message: "Telefone é obrigatório" };
  }

  const cleanTelefone = telefone.replace(/\D/g, "");

  if (cleanTelefone.length < 10) {
    return { isValid: false, message: "Telefone deve ter pelo menos 10 dígitos" };
  }

  if (cleanTelefone.length > 11) {
    return { isValid: false, message: "Telefone deve ter no máximo 11 dígitos" };
  }

  const ddd = cleanTelefone.substring(0, 2);
  if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
    return { isValid: false, message: "DDD inválido (deve estar entre 11 e 99)" };
  }

  if (/^(\d)\1+$/.test(cleanTelefone)) {
    return { isValid: false, message: "Telefone não pode ter todos os dígitos iguais" };
  }

  if (cleanTelefone.length === 11 && cleanTelefone[2] !== "9") {
    return { isValid: false, message: "Celular deve ter 9 como terceiro dígito" };
  }

  return { isValid: true, message: "Telefone válido" };
}

/**
 * Valida data de abertura e retorna informações detalhadas
 * @param {string} dateStr
 * @returns {{isValid: boolean, message: string}}
 */
export function validateDataAbertura(dateStr) {
  if (!dateStr || !dateStr.trim()) {
    return { isValid: false, message: "Data de abertura é obrigatória" };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { isValid: false, message: "Formato de data inválido. Use YYYY-MM-DD" };
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { isValid: false, message: "Data inválida" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) {
    return { isValid: false, message: "Data de abertura não pode ser futura" };
  }

  return { isValid: true, message: "Data de abertura válida" };
}

/**
 * Retorna validação completa para email
 * @param {string} email
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getEmailValidation(email) {
  if (!email || !email.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  if (email.length > 100) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "E-mail deve ter no máximo 100 caracteres",
    };
  }

  if (!isValidEmail(email)) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "E-mail inválido",
    };
  }

  return {
    isValid: true,
    class: FEEDBACK_TYPES.SUCCESS,
    message: "",
  };
}

/**
 * Retorna validação completa para nome
 * @param {string} nome
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getNomeValidation(nome) {
  if (!nome || !nome.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  if (nome.trim().length < 3) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Nome deve ter pelo menos 3 caracteres",
    };
  }

  if (nome.trim().length > 100) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Nome deve ter no máximo 100 caracteres",
    };
  }

  return {
    isValid: true,
    class: FEEDBACK_TYPES.SUCCESS,
    message: "",
  };
}

/**
 * Retorna validação completa para CPF
 * @param {string} cpf
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getCPFValidation(cpf) {
  if (!cpf || !cpf.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "CPF deve ter 11 dígitos",
    };
  }

  if (/^(\d)\1+$/.test(cleanCPF)) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "CPF não pode ter todos os dígitos iguais",
    };
  }

  if (!isValidCPF(cpf)) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "CPF inválido",
    };
  }

  return {
    isValid: true,
    class: FEEDBACK_TYPES.SUCCESS,
    message: "",
  };
}

/**
 * Retorna validação completa para CNPJ
 * @param {string} cnpj
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getCNPJValidation(cnpj) {
  if (!cnpj || !cnpj.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  const cleanCNPJ = cnpj.replace(/\D/g, "");

  if (cleanCNPJ.length !== 14) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "CNPJ deve ter 14 dígitos",
    };
  }

  if (/^(\d)\1+$/.test(cleanCNPJ)) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "CNPJ não pode ter todos os dígitos iguais",
    };
  }

  if (!isValidCNPJ(cnpj)) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "CNPJ inválido",
    };
  }

  return {
    isValid: true,
    class: FEEDBACK_TYPES.SUCCESS,
    message: "",
  };
}

/**
 * Retorna validação completa para telefone
 * @param {string} telefone
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getTelefoneValidation(telefone) {
  if (!telefone || !telefone.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  const cleanTelefone = telefone.replace(/\D/g, "");

  if (cleanTelefone.length < 10) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Telefone deve ter pelo menos 10 dígitos",
    };
  }

  if (cleanTelefone.length > 11) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Telefone deve ter no máximo 11 dígitos",
    };
  }

  const ddd = cleanTelefone.substring(0, 2);
  if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "DDD inválido (deve estar entre 11 e 99)",
    };
  }

  if (/^(\d)\1+$/.test(cleanTelefone)) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Telefone não pode ter todos os dígitos iguais",
    };
  }

  if (cleanTelefone.length === 11 && cleanTelefone[2] !== "9") {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Celular deve ter 9 como terceiro dígito",
    };
  }

  return {
    isValid: true,
    class: FEEDBACK_TYPES.SUCCESS,
    message: "",
  };
}

/**
 * Retorna validação completa para data de nascimento
 * @param {string} dateStr
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getDataNascimentoValidation(dateStr) {
  if (!dateStr || !dateStr.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  const validation = validateDataNascimento(dateStr);

  return {
    isValid: validation.isValid,
    class: validation.isValid ? FEEDBACK_TYPES.SUCCESS : FEEDBACK_TYPES.ERROR,
    message: validation.isValid ? "" : validation.message,
  };
}

/**
 * Retorna validação completa para data de abertura
 * @param {string} dateStr
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getDataAberturaValidation(dateStr) {
  if (!dateStr || !dateStr.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  const validation = validateDataAbertura(dateStr);

  return {
    isValid: validation.isValid,
    class: validation.isValid ? FEEDBACK_TYPES.SUCCESS : FEEDBACK_TYPES.ERROR,
    message: validation.isValid ? "" : validation.message,
  };
}

/**
 * Retorna validação completa para senha
 * @param {string} senha
 * @returns {{isValid: boolean, class: string, message: string}}
 */
export function getSenhaValidation(senha) {
  if (!senha || !senha.trim()) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.DEFAULT,
      message: "",
    };
  }

  if (senha.length < 6) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Senha deve ter pelo menos 6 caracteres",
    };
  }

  if (senha.length > 50) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Senha deve ter no máximo 50 caracteres",
    };
  }

  // Verificações de segurança opcionais
  const hasUpperCase = /[A-Z]/.test(senha);
  const hasNumbers = /\d/.test(senha);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  if (!hasUpperCase && !hasNumbers && !hasSpecialChar) {
    return {
      isValid: false,
      class: FEEDBACK_TYPES.ERROR,
      message: "Senha deve conter pelo menos uma letra maiúscula, número ou caractere especial",
    };
  }

  return {
    isValid: true,
    class: FEEDBACK_TYPES.SUCCESS,
    message: "",
  };
}
