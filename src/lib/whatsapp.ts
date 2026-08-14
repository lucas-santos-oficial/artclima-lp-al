export const PHONE_DISPLAY = "(82) 9 8892-8846";
export const PHONE_TEL = "+5582988928846";
const WA_BASE = "https://wa.me/5582988928846";

export const WA_MESSAGES = {
  principal:
    "Olá! Meu ar-condicionado está precisando de limpeza e gostaria de saber como funciona o atendimento da Art-Climatização.",
  regiao:
    "Olá! Gostaria de saber se a Art-Climatização atende minha região para limpeza de ar-condicionado.",
};

export function waLink(message: string = WA_MESSAGES.principal) {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}