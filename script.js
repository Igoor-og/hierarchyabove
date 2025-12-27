/**
 * HIERARCHY ABOVE - Official Script v3.0
 */

const targetDate = new Date("January 20, 2026 00:00:00").getTime();
let precoBase = 149.9;

// 1. CRONÔMETRO
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

// 4. LÓGICA DE CUPOM (Integrada com Formspree)
// Códigos PIX Oficiais fornecidos
const pixOriginal =
  "00020126470014BR.GOV.BCB.PIX0125goinawlsherarco@gmail.com5204000053039865406149.905802BR5901N6001C62180514HIERARCHYABOVE630470E3";
const pixPromocional =
  "00020126470014BR.GOV.BCB.PIX0125goinawlsherarco@gmail.com5204000053039865406134.915802BR5901N6001C62180514HIERARCHYABOVE630467B7";

function applyCoupon() {
  const input = document
    .getElementById("couponInput")
    .value.toUpperCase()
    .trim();
  const priceDisplay = document.getElementById("totalPrice");
  const valorDisplayForm = document.getElementById("valor-display");
  const qrImage = document.getElementById("pix-qr-img");
  const pixTextarea = document.getElementById("pixCode"); // Onde fica o Copia e Cola
  const hiddenValor = document.getElementById("hidden-valor");

  if (input === "MILGRAU") {
    // --- APLICANDO DESCONTO ---
    priceDisplay.innerHTML =
      "TOTAL: <strike>R$ 149,90</strike> <span style='color:var(--vinho)'>R$ 134,91</span>";
    if (valorDisplayForm) valorDisplayForm.innerText = "134,91";
    if (hiddenValor) hiddenValor.value = "134.91";

    // Troca para o PIX Promocional
    if (qrImage) qrImage.src = "assets/pix-promocional.png";
    if (pixTextarea) pixTextarea.value = pixPromocional;
  } else {
    // --- VALOR ORIGINAL ---
    priceDisplay.innerHTML = "TOTAL: R$ 149,90";
    if (valorDisplayForm) valorDisplayForm.innerText = "149,90";
    if (hiddenValor) hiddenValor.value = "149.90";

    // Troca para o PIX Original
    if (qrImage) qrImage.src = "assets/pix-original.png";
    if (pixTextarea) pixTextarea.value = pixOriginal;
  }
}

// Função para o botão de Copiar
function copyPix() {
  const pixCode = document.getElementById("pixCode");
  const btn = document.getElementById("btnCopy");

  pixCode.select();
  pixCode.setSelectionRange(0, 99999); // Mobile
  navigator.clipboard.writeText(pixCode.value);

  // Feedback visual
  const originalText = btn.innerText;
  btn.innerText = "COPIADO!";
  btn.style.background = "var(--vinho)";

  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.background = "#000";
  }, 2000);
}

// 5. PREPARAR ENVIO (Chamada ao selecionar o tamanho)
function selectSize(tamanho) {
  // 1. Grava o tamanho no campo oculto do Formspree
  const hiddenTamanho = document.getElementById("hidden-tamanho");
  if (hiddenTamanho) hiddenTamanho.value = tamanho;

  // 2. Mostra a área do PIX (que contém o seu formulário)
  const pixArea = document.getElementById("pix-area");
  if (pixArea) {
    pixArea.classList.remove("hidden"); // Remove o display:none
    pixArea.scrollIntoView({ behavior: "smooth" }); // Desce a tela suavemente
  }
  // Garante que o valor atual também esteja no campo hidden
  applyCoupon();
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
document
  .getElementById("checkout-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o Formspree de abrir a página deles

    const form = event.target;
    const data = new FormData(form);
    const button = form.querySelector('button[type="submit"]');

    // Feedback visual para o cliente saber que está enviando
    const originalText = button.innerText;
    button.innerText = "ENVIANDO...";
    button.disabled = true;

    // Faz o envio via AJAX
    fetch("https://formspree.io/f/mwvklgdy", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // SUCESSO! Agora sim redirecionamos para sua página personalizada
          window.location.href = "obrigado.html";
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              alert("Ops! Houve um erro ao enviar. Tente novamente.");
            }
          });
          button.innerText = originalText;
          button.disabled = false;
        }
      })
      .catch((error) => {
        alert("Erro de conexão. Verifique sua internet.");
        button.innerText = originalText;
        button.disabled = false;
      });
  });
