/**
 * Validações para o sistema de cadastro
 */

// Validações básicas de formato
const validators = {
  isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isCPF(cpf) {
    if (!/^\d{11}$/.test(cpf)) return false;

    // Validação do algoritmo do CPF
    const digits = cpf.split("").map(Number);

    // Verifica se todos os dígitos são iguais
    if (digits.every((digit) => digit === digits[0])) return false;

    // Calcula primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) firstDigit = 0;

    if (digits[9] !== firstDigit) return false;

    // Calcula segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) secondDigit = 0;

    return digits[10] === secondDigit;
  },

  isCNPJ(cnpj) {
    if (!/^\d{14}$/.test(cnpj)) return false;

    // Validação do algoritmo do CNPJ
    const digits = cnpj.split("").map(Number);

    // Verifica se todos os dígitos são iguais
    if (digits.every((digit) => digit === digits[0])) return false;

    // Calcula primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * weights1[i];
    }
    let firstDigit = sum % 11;
    firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

    if (digits[12] !== firstDigit) return false;

    // Calcula segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += digits[i] * weights2[i];
    }
    let secondDigit = sum % 11;
    secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

    return digits[13] === secondDigit;
  },

  isDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

    const dateObj = new Date(date);
    const today = new Date();

    // Verifica se é uma data válida e não está no futuro
    return dateObj.getTime() && dateObj <= today;
  },

  isTelefone(tel) {
    return /^\d{10,11}$/.test(tel);
  },

  isNome(nome) {
    return nome && nome.trim().length >= 3;
  },

  isSenha(senha) {
    return senha && senha.length >= 6;
  },

  isTipoCadastro(tipo) {
    return ["PF", "PJ"].includes(tipo);
  },
};

// Validações específicas por etapa
const stepValidators = {
  validateStepFirst(data) {
    const errors = [];

    if (!data.email || !validators.isEmail(data.email)) {
      errors.push("E-mail inválido ou não informado");
    }

    if (!data.tipoCadastro || !validators.isTipoCadastro(data.tipoCadastro)) {
      errors.push("Tipo de cadastro inválido");
    }

    return errors;
  },

  validateStepSecond(data) {
    const errors = [];

    if (data.tipoCadastro === "PF") {
      if (!validators.isNome(data.nome)) {
        errors.push("Nome é obrigatório e deve ter pelo menos 3 caracteres");
      }

      if (!data.cpf || !validators.isCPF(data.cpf)) {
        errors.push("CPF inválido ou não informado");
      }

      if (!data.dataNascimento || !validators.isDate(data.dataNascimento)) {
        errors.push("Data de nascimento inválida ou não informada");
      }

      if (!data.telefone || !validators.isTelefone(data.telefone)) {
        errors.push("Telefone inválido ou não informado (10-11 dígitos)");
      }
    } else if (data.tipoCadastro === "PJ") {
      if (!validators.isNome(data.razaoSocial)) {
        errors.push(
          "Razão social é obrigatória e deve ter pelo menos 3 caracteres"
        );
      }

      if (!data.cnpj || !validators.isCNPJ(data.cnpj)) {
        errors.push("CNPJ inválido ou não informado");
      }

      if (!data.dataAbertura || !validators.isDate(data.dataAbertura)) {
        errors.push("Data de abertura inválida ou não informada");
      }

      if (!data.telefonePJ || !validators.isTelefone(data.telefonePJ)) {
        errors.push("Telefone inválido ou não informado (10-11 dígitos)");
      }
    }

    return errors;
  },

  validateStepThird(data) {
    const errors = [];

    if (!validators.isSenha(data.senha)) {
      errors.push("Senha deve ter pelo menos 6 caracteres");
    }

    if (!data.confirmarSenha || data.senha !== data.confirmarSenha) {
      errors.push("Confirmação de senha não confere");
    }

    return errors;
  },
};

// Função principal de validação
function validateRegistration(data) {
  const errors = [];

  // Valida todas as etapas
  errors.push(...stepValidators.validateStepFirst(data));
  errors.push(...stepValidators.validateStepSecond(data));
  errors.push(...stepValidators.validateStepThird(data));

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validators,
  stepValidators,
  validateRegistration,
};
