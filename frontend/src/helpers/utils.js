/**
 * Verifica se o email é válido
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
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
 * Verifica se a data é válida
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
