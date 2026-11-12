/**
 * Helpers de máscara visual (UI descritiva), sanitização numérica (payload cru para o backend)
 * e validação estruturada para o fluxo de Checkout AutoCore.
 */

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function maskPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function maskCep(value: string): string {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, "$1-$2");
}

export function maskCardNumber(value: string): string {
  const digits = onlyDigits(value).slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function maskCardExpiry(value: string): string {
  const digits = onlyDigits(value).slice(0, 4);
  return digits.replace(/^(\d{2})(\d)/, "$1/$2");
}

export function maskCvv(value: string): string {
  return onlyDigits(value).slice(0, 4);
}

export function isValidCpf(cpfRaw: string): boolean {
  const cpf = onlyDigits(cpfRaw);
  return cpf.length === 11 && !/^(\d)\1{10}$/.test(cpf);
}

export function getPlanValidityPeriod(): { start: string; end: string } {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 30);

  const fmt = (d: Date) =>
    d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return { start: fmt(now), end: fmt(end) };
}

export interface CustomerStepData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export function validateCustomerStep(data: CustomerStepData): Partial<Record<keyof CustomerStepData, string>> {
  const errors: Partial<Record<keyof CustomerStepData, string>> = {};

  if (data.name.trim().length < 3) {
    errors.name = "Informe seu nome completo.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }
  if (!isValidCpf(data.cpf)) {
    errors.cpf = "CPF inválido. Verifique os 11 dígitos.";
  }
  const phoneDigits = onlyDigits(data.phone);
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = "Informe um telefone com DDD válido.";
  }
  if (onlyDigits(data.cep).length !== 8) {
    errors.cep = "Informe um CEP válido com 8 dígitos.";
  }
  if (data.street.trim().length < 2) {
    errors.street = "Informe o endereço.";
  }
  if (data.number.trim().length < 1) {
    errors.number = "Informe o número.";
  }
  if (data.city.trim().length < 2) {
    errors.city = "Informe a cidade.";
  }
  if (data.state.trim().length !== 2) {
    errors.state = "UF inválida.";
  }

  return errors;
}

export interface CardStepData {
  holderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export function validateCardStep(data: CardStepData): Partial<Record<keyof CardStepData, string>> {
  const errors: Partial<Record<keyof CardStepData, string>> = {};

  if (data.holderName.trim().length < 3) {
    errors.holderName = "Informe o nome impresso no cartão.";
  }
  if (onlyDigits(data.cardNumber).length < 13) {
    errors.cardNumber = "Número do cartão incompleto.";
  }
  const expDigits = onlyDigits(data.expiry);
  if (expDigits.length !== 4) {
    errors.expiry = "Use o formato MM/AA.";
  } else {
    const month = Number(expDigits.slice(0, 2));
    if (month < 1 || month > 12) {
      errors.expiry = "Mês inválido.";
    }
  }
  if (onlyDigits(data.cvv).length < 3) {
    errors.cvv = "CVV inválido.";
  }

  return errors;
}

