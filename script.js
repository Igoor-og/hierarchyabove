/**
 * HIERARCHY ABOVE - Official Script v3.1
 */

const targetDate = new Date("January 30, 2026 00:00:00").getTime();

// 1. NAVEGAÇÃO MOBILE (Movido para o topo para garantir prioridade)
function toggleMenu() {
  // Mudamos o ponto (.) por hashtag (#) para encontrar o nav#nav-menu
  const navMenu = document.querySelector("#nav-menu");
  const hamburger = document.querySelector(".hamburger");

  if (navMenu) {
    navMenu.classList.toggle("active");
  }

  if (hamburger) {
    hamburger.classList.toggle("open");
  }
}

// 2. CRONÔMETRO
function updateCountdown() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("dev") === "true") {
    if (!window.location.pathname.includes("produtos.html")) {
      window.location.href = "produtos.html";
    }
    return;
  }

  const now = new Date().getTime();
  const distance = targetDate - now;
  const countdownEl = document.getElementById("countdown");

  if (countdownEl) {
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
    countdownEl.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }
}
setInterval(updateCountdown, 1000);

// 3. INTERFACE DE PRODUTO
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

// 4. LÓGICA DE PIX E CUPOM
const pixOriginal =
  "00020126470014BR.GOV.BCB.PIX0125goinawlsherarco@gmail.com5204000053039865406149.905802BR5901N6001C62180514HIERARCHYABOVE630470E3";
const pixPromocional =
  "00020126470014BR.GOV.BCB.PIX0125goinawlsherarco@gmail.com5204000053039865406134.915802BR5901N6001C62180514HIERARCHYABOVE630467B7";

function applyCoupon() {
  const inputEl = document.getElementById("couponInput");
  if (!inputEl) return;

  const input = inputEl.value.toUpperCase().trim();
  const priceDisplay = document.getElementById("totalPrice");
  const valorDisplayForm = document.getElementById("valor-display");
  const qrImage = document.getElementById("pix-qr-img");
  const pixTextarea = document.getElementById("pixCode");
  const hiddenValor = document.getElementById("hidden-valor");

  if (input === "MILGRAU") {
    if (priceDisplay)
      priceDisplay.innerHTML =
        "TOTAL: <strike>R$ 149,90</strike> <span style='color:var(--vinho)'>R$ 134,91</span>";
    if (valorDisplayForm) valorDisplayForm.innerText = "134,91";
    if (hiddenValor) hiddenValor.value = "134.91";
    if (qrImage) qrImage.src = "assets/pix-promocional.png";
    if (pixTextarea) pixTextarea.value = pixPromocional;
  } else {
    if (priceDisplay) priceDisplay.innerHTML = "TOTAL: R$ 149,90";
    if (valorDisplayForm) valorDisplayForm.innerText = "149,90";
    if (hiddenValor) hiddenValor.value = "149.90";
    if (qrImage) qrImage.src = "assets/pix-original.png";
    if (pixTextarea) pixTextarea.value = pixOriginal;
  }
}

function copyPix() {
  const pixCode = document.getElementById("pixCode");
  const btn = document.getElementById("btnCopy");
  if (!pixCode) return;

  pixCode.select();
  pixCode.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(pixCode.value);

  const originalText = btn.innerText;
  btn.innerText = "COPIADO!";
  btn.style.background = "var(--vinho)";
  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.background = "#000";
  }, 2000);
}

function selectSize(tamanho) {
  const hiddenTamanho = document.getElementById("hidden-tamanho");
  if (hiddenTamanho) hiddenTamanho.value = tamanho;

  const pixArea = document.getElementById("pix-area");
  if (pixArea) {
    pixArea.classList.remove("hidden");
    pixArea.scrollIntoView({ behavior: "smooth" });
  }
  applyCoupon();
}

// 5. ENVIO DO FORMULÁRIO (Protegido para não travar o script)
function setupForm() {
  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) return;

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(this);
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerText;

    button.innerText = "ENVIANDO...";
    button.disabled = true;

    fetch("https://formspree.io/f/mwvklgdy", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "obrigado.html";
        } else {
          alert("Erro ao enviar. Verifique os dados.");
          button.innerText = originalText;
          button.disabled = false;
        }
      })
      .catch(() => {
        alert("Erro de conexão.");
        button.innerText = originalText;
        button.disabled = false;
      });
  });
}

// 6. INICIALIZAÇÃO
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

document.addEventListener("DOMContentLoaded", () => {
  triggerFadeIn();
  updateCountdown();
  setupForm(); // Inicializa o formulário com segurança
});
