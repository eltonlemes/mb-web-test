/**
 * Verifica se o email é válido
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
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
  const hasUpperCase = /[A-Z]/.test(senha);
  const hasNumbers = /\d/.test(senha);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  if (!hasUpperCase || !hasNumbers || !hasSpecialChar) {
    return false;
  }

  return true;
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
 */
function validateDataNascimento(dateStr) {
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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
}
