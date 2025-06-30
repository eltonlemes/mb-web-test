/**
 * Validações para o sistema de cadastro
 * Replicadas do frontend para garantir consistência
 */

// Validações básicas de formato (idênticas ao frontend)
const validators = {
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  },

  isValidCPF(cpf) {
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
  },

  isValidSenha(senha) {
    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumbers = /\d/.test(senha);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return false;
    }

    return true;
  },

  isValidCNPJ(cnpj) {
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
  },

  isValidTelefone(telefone) {
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
  },

  calculateAge(dateStr) {
    const birthDate = new Date(dateStr);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajusta a idade se ainda não fez aniversário este ano
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  },

  isValidDataNascimento(dateStr) {
    // Verifica formato
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return false;
    }

    // Verifica se a data existe
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return false;
    }

    // Verifica se não é futura
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) {
      return false;
    }

    // Calcula idade
    const age = this.calculateAge(dateStr);

    // Verifica idade mínima
    if (age < 18) {
      return false;
    }

    // Verifica idade máxima
    if (age > 130) {
      return false;
    }

    return true;
  },

  isValidDataAbertura(dateStr) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
  },

  isValidNome(nome) {
    return nome && nome.trim().length >= 3;
  },

  isValidTipoCadastro(tipo) {
    return ["PF", "PJ"].includes(tipo);
  },
};

// Validações específicas por etapa
const stepValidators = {
  validateStepFirst(data) {
    const errors = [];

    if (!data.email || !validators.isValidEmail(data.email)) {
      errors.push("E-mail inválido ou não informado");
    }

    if (
      !data.tipoCadastro ||
      !validators.isValidTipoCadastro(data.tipoCadastro)
    ) {
      errors.push("Tipo de cadastro inválido");
    }

    return errors;
  },

  validateStepSecond(data) {
    const errors = [];

    if (data.tipoCadastro === "PF") {
      if (!validators.isValidNome(data.nome)) {
        errors.push("Nome é obrigatório e deve ter pelo menos 3 caracteres");
      }

      if (!data.cpf || !validators.isValidCPF(data.cpf)) {
        errors.push("CPF inválido ou não informado");
      }

      if (
        !data.dataNascimento ||
        !validators.isValidDataNascimento(data.dataNascimento)
      ) {
        errors.push(
          "Data de nascimento inválida (deve ter entre 18 e 130 anos)"
        );
      }

      if (!data.telefone || !validators.isValidTelefone(data.telefone)) {
        errors.push("Telefone inválido ou não informado");
      }
    } else if (data.tipoCadastro === "PJ") {
      if (!validators.isValidNome(data.razaoSocial)) {
        errors.push(
          "Razão social é obrigatória e deve ter pelo menos 3 caracteres"
        );
      }

      if (!data.cnpj || !validators.isValidCNPJ(data.cnpj)) {
        errors.push("CNPJ inválido ou não informado");
      }

      if (
        !data.dataAbertura ||
        !validators.isValidDataAbertura(data.dataAbertura)
      ) {
        errors.push("Data de abertura inválida ou não pode ser futura");
      }

      if (!data.telefonePJ || !validators.isValidTelefone(data.telefonePJ)) {
        errors.push("Telefone inválido ou não informado");
      }
    }

    return errors;
  },

  validateStepThird(data) {
    const errors = [];

    if (!data.senha || data.senha.length < 6) {
      errors.push("Senha deve ter pelo menos 6 caracteres");
    } else if (!validators.isValidSenha(data.senha)) {
      errors.push(
        "Senha deve conter letra maiúscula, minúscula, número e caractere especial"
      );
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
