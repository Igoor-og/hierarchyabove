/**
 * HIERARCHY ABOVE - Official Script v2.1
 */

const targetDate = new Date("January 20, 2026 00:00:00").getTime();
let cupomAplicado = false;

// 1. CRONÔMETRO COM REDIRECIONAMENTO E PULO DE DEV
function updateCountdown() {
  const urlParams = new URLSearchParams(window.location.search);
  const isDev = urlParams.get("dev");

  if (isDev === "true") {
    if (!window.location.pathname.includes("produtos.html")) {
      window.location.href = "produtos.html";
    }
    return;
  }

  const now = new Date().getTime();
  const distance = targetDate - now;

  if (document.getElementById("countdown")) {
    if (distance < 0) {
      window.location.href = "produtos.html";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }
}
setInterval(updateCountdown, 1000);

// 2. NAVEGAÇÃO MOBILE
function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  if (menu) {
    menu.classList.toggle("active");
  }
}

// 3. INTERFACE DE PRODUTO (VITRINE / DETALHES)
function showProductDetail() {
  const vitrine = document.getElementById("vitrine");
  const detail = document.getElementById("product-detail");
  if (vitrine && detail) {
    vitrine.classList.add("hidden");
    detail.classList.remove("hidden");
    window.scrollTo(0, 0);
    triggerFadeIn();
  }
}

function hideProductDetail() {
  const vitrine = document.getElementById("vitrine");
  const detail = document.getElementById("product-detail");
  if (vitrine && detail) {
    detail.classList.add("hidden");
    vitrine.classList.remove("hidden");
    window.scrollTo(0, 0);
  }
}

// 4. LÓGICA DE CUPOM
function applyCoupon() {
  const inputField = document.getElementById("couponInput");
  if (!inputField) return;

  const input = inputField.value.toUpperCase();
  const priceDisplay = document.getElementById("totalPrice");

  if (input === "MILGRAU") {
    cupomAplicado = true;
    priceDisplay.innerHTML =
      "TOTAL: <strike>R$ 149,90</strike> R$ 134,91 (10% OFF)";
    priceDisplay.style.color = "green";
  } else {
    cupomAplicado = false;
    priceDisplay.innerHTML = "TOTAL: R$ 149,90";
    priceDisplay.style.color = "#000";
  }
}

// 5. ENVIO POR E-MAIL (TEXTO ORIGINAL PRESERVADO)
function sendPurchaseEmail() {
  const emailDestino = "goinawlsherarco@gmail.com";

  // Verifica se um tamanho foi selecionado para evitar erro
  const selectedRadio = document.querySelector('input[name="size"]:checked');

  if (!selectedRadio) {
    alert("Por favor, selecione um tamanho antes de comprar.");
    return;
  }

  const sizeSelected = selectedRadio.value;
  const valorFinal = cupomAplicado
    ? "R$ 134,91 (Cupom MILGRAU aplicado)"
    : "R$ 149,90 (Sem cupom)";

  const assunto = "CONFIRMAÇÃO DE PAGAMENTO PIX - HIERARCHY ABOVE";

  // O seu texto original abaixo:
  const corpoEmail = `Olá, realizei o pagamento via Pix. Seguem os detalhes:

PRODUTO: Camiseta Hierarchy – “No Bluff”
TAMANHO: ${sizeSelected}
VALOR PAGO: ${valorFinal}

--- DADOS PARA ENVIO ---
Nome Completo:
CPF:
Endereço Completo:
CEP:
Cidade / Estado:
Telefone de Contato:

(Anexe o comprovante do Pix a este e-mail para agilizar o envio).`;

  const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;
  window.location.href = mailtoLink;
}

// 6. EFEITO FADE-IN
function triggerFadeIn() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );
  fadeElements.forEach((el) => observer.observe(el));
}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  triggerFadeIn();
  updateCountdown();
});
