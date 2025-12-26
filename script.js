/**
 * HIERARCHY ABOVE - Official Script v2.0
 */

const targetDate = new Date("January 20, 2026 00:00:00").getTime();
let cupomAplicado = false;

// 1. CRONÔMETRO COM REDIRECIONAMENTO E PULO DE DEV
function updateCountdown() {
  // Verifica se existe o parâmetro ?dev=true na URL
  const urlParams = new URLSearchParams(window.location.search);
  const isDev = urlParams.get("dev");

  if (isDev === "true") {
    window.location.href = "produtos.html";
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
  document.getElementById("nav-menu").classList.toggle("active");
}

// 3. INTERFACE DE PRODUTO
function showProductDetail() {
  document.getElementById("vitrine").classList.add("hidden");
  document.getElementById("product-detail").classList.remove("hidden");
  window.scrollTo(0, 0);
  triggerFadeIn();
}

function hideProductDetail() {
  document.getElementById("product-detail").classList.add("hidden");
  document.getElementById("vitrine").classList.remove("hidden");
  window.scrollTo(0, 0);
}
// --- LÓGICA DE ENVIO POR E-MAIL (SUBSTITUINDO WHATSAPP) ---
function sendPurchaseEmail() {
  const emailDestino = "goinawlsherarco@gmail.com";
  const sizeSelected = document.querySelector(
    'input[name="size"]:checked',
  ).value;
  const valorFinal = cupomAplicado
    ? "R$ 134,91 (Cupom MILGRAU aplicado)"
    : "R$ 149,90 (Sem cupom)";

  const assunto = "CONFIRMAÇÃO DE PAGAMENTO PIX - HIERARCHY ABOVE";
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

  // Cria o link mailto
  const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;

  // Abre o aplicativo de e-mail do cliente
  window.location.href = mailtoLink;
}

// Funções de interface (Fade-in e Detalhes) permanecem as mesmas...
function showProductDetail() {
  document.getElementById("vitrine").classList.add("hidden");
  document.getElementById("product-detail").classList.remove("hidden");
  window.scrollTo(0, 0);
  triggerFadeIn();
}

function hideProductDetail() {
  document.getElementById("product-detail").classList.add("hidden");
  document.getElementById("vitrine").classList.remove("hidden");
}

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
document.addEventListener("DOMContentLoaded", triggerFadeIn);

function applyCoupon() {
  const input = document.getElementById("couponInput").value.toUpperCase();
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
