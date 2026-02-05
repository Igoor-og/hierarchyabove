/**
 * HIERARCHY ABOVE - Official Script v3.1
 *//**
 * HIERARCHY ABOVE - Official Script v3.1
 */

// 1. DATA ALVO AJUSTADA PARA 6 DE FEVEREIRO
const targetDate = new Date("February 14, 2026 00:00:00").getTime();

function updateCountdown() {
  // Ignorar bloqueio se estiver em modo desenvolvedor
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("dev") === "true") return;

  const now = new Date().getTime();
  const distance = targetDate - now;
  
  const countdownEl = document.getElementById("countdown");

  // 2. LÓGICA DE BLOQUEIO ATIVO
  if (distance > 0) {
    // Se ainda NÃO CHEGOU dia 6:
    // Se o usuário tentar entrar na produtos.html antes da hora, manda de volta pra index
    if (window.location.pathname.includes("produtos.html")) {
      window.location.href = "index.html"; 
    }
    
    // Atualiza o contador na tela (se ele existir)
    if (countdownEl) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      countdownEl.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;
    }
  } else {
    // 3. SE JÁ PASSOU DO DIA 6: Libera e Redireciona
    if (!window.location.pathname.includes("produtos.html")) {
      window.location.href = "produtos.html";
    }
  }
}

// Executa o check assim que carregar
updateCountdown();
setInterval(updateCountdown, 1000);


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

// 4. LÓGICA DE FRETE, CUPOM E PIX (INTEGRAÇÃO COMPLETA)

const CONSTANTS = {
  MELHOR_ENVIO_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzI3N2M1ODE0N2FiZTRlODY5MjQ0NTMzMWMwYjMxNTVmNjBmOTM4OGMxMTE2NGJmZDU3YzY4YjNhMWIwZGY2YTQ2ZTNiOTc2NTJkYjE2ODUiLCJpYXQiOjE3Njc3MjgwOTMuOTg1NDksIm5iZiI6MTc2NzcyODA5My45ODU0OTIsImV4cCI6MTc5OTI2NDA5My45NzM2ODgsInN1YiI6ImEwYjgyMjFhLWZiZjMtNDNkMi05NmYyLTdhOTU1N2M5M2JmMCIsInNjb3BlcyI6WyJjYXJ0LXJlYWQiLCJjYXJ0LXdyaXRlIiwiY29tcGFuaWVzLXJlYWQiLCJjb21wYW5pZXMtd3JpdGUiLCJjb3Vwb25zLXJlYWQiLCJjb3Vwb25zLXdyaXRlIiwibm90aWZpY2F0aW9ucy1yZWFkIiwib3JkZXJzLXJlYWQiLCJwcm9kdWN0cy1yZWFkIiwicHJvZHVjdHMtZGVzdHJveSIsInByb2R1Y3RzLXdyaXRlIiwicHVyY2hhc2VzLXJlYWQiLCJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy1jYW5jZWwiLCJzaGlwcGluZy1jaGVja291dCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWdlbmVyYXRlIiwic2hpcHBpbmctcHJldmlldyIsInNoaXBwaW5nLXByaW50Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsImVjb21tZXJjZS1zaGlwcGluZyIsInRyYW5zYWN0aW9ucy1yZWFkIiwidXNlcnMtcmVhZCIsInVzZXJzLXdyaXRlIiwid2ViaG9va3MtcmVhZCIsIndlYmhvb2tzLXdyaXRlIiwid2ViaG9va3MtZGVsZXRlIiwidGRlYWxlci13ZWJob29rIl19.F46VtAD8bD6ZTq1lf3FqxgAXCeZJcbVetmDBPq15RjQFjRmvBhUZKzdFqtymWcbIMUC52IPwAXDYuk6sI_A0Q7yqNg4kxjehmyqgOjJGlK1KXVCmW3nAYICEmhy2pFP5vXmNLBFO5h5aRtBrwy2bZZDCFYWcFy1GJKkCTtsBGluPxJhdYlPqFersY2d8zfV_i7xjZb11g9lH7KWj8WePVg7K8HKqGE4sL4pDHw-Wm5pr-TEJQ49pVNHARh0N0rs_-9A-w6L2lnnWXCWaEd75bzCilrbcacHu1PPcTlPK2T1_e8X7D6rJXevsDM9zxmXTPIhAO5OlYANlVBq3ofZho8uF1Ok2GsGl1_DleYsMCiF_bjr5yjA5vHvBJ5mTj4jEHILNWUKNivjvgw4LeCzL-bvnwDHIhtPmx_IvCMvKMBZ75fVgSr_eKOCG0zIU8xclEGfY6elV1CtTeHjQwmYo-SicDxx4w64UbwsEL-qeQWgqXblCBM0b1BQ3djcn3i2FW0CV9Gk6Emq_UEEYfEQvH6Lr8dsa6aMnp6T2r-zWbeamSozQcepPcfa59qp9KfNruMuL-xChvywFBmXw9EZ14qe3Nu43huE7-UsfMftA-3dXOmIQZSrcGcfvp3M_pjFHpiXMIYbvoo4uk1fIhYaWV96GxPYO4UfBgtWqPBrl7uU", // SUBSTITUIR PELO TOKEN DO USUÁRIO
  CEP_ORIGEM: "86057055",
  PRODUTO_PRECO: 157.00,
  PRODUTO_PESO: 0.3, // kg
  PRODUTO_DIMS: { w: 20, h: 5, l: 20 }, // cm
  PIX_KEY: "goinawlsherarco@gmail.com",
  PIX_NAME: "Moises Eduardo Marques Geronimo",
  PIX_CITY: "Londrina"
};

let state = {
  frete: 0.00,
  desconto: 0.00,
  cupom: "",
  total: CONSTANTS.PRODUTO_PRECO
};

// --- FUNÇÃO PRINCIPAL DE ATUALIZAÇÃO ---
function updateTotal() {
  // Cálculo: (Produto - Desconto) + Frete
  // Se o cupom for percentual, aplica sobre o produto base

  // Validar se desconto é apenas no produto ou total. Geralmente no produto.
  let valorComDesconto = CONSTANTS.PRODUTO_PRECO - state.desconto;
  if (valorComDesconto < 0) valorComDesconto = 0;

  state.total = valorComDesconto + state.frete;

  // Atualizar UI
  const valorDisplay = document.getElementById("valor-display");
  const detailDisplay = document.getElementById("detail-display");
  const pixTextarea = document.getElementById("pixCode");

  // Inputs Hidden
  const hiddenValor = document.getElementById("hidden-valor");
  const hiddenFrete = document.getElementById("hidden-frete");
  const hiddenCupom = document.getElementById("hidden-cupom");

  if (valorDisplay) valorDisplay.innerText = state.total.toFixed(2).replace(".", ",");

  if (detailDisplay) {
    detailDisplay.innerHTML = `(Produto: R$ ${valorComDesconto.toFixed(2).replace(".", ",")} + Frete: R$ ${state.frete.toFixed(2).replace(".", ",")})`;
  }

  if (hiddenValor) hiddenValor.value = state.total.toFixed(2);
  if (hiddenFrete) hiddenFrete.value = state.frete.toFixed(2);
  if (hiddenCupom) hiddenCupom.value = state.cupom;

  // Gerar Payload Pix
  const payload = generatePixPayload(state.total);
  if (pixTextarea) pixTextarea.value = payload;
}

// --- FRETE (MELHOR ENVIO) ---
// --- FRETE (COM MOCK FRETE GRÁTIS) ---
async function calculateShipping() {
  const cepInput = document.getElementById("cepInput");
  const freteStatus = document.getElementById("frete-status");

  if (!cepInput || cepInput.value.length < 8) return;

  const cepDestino = cepInput.value.replace(/\D/g, "");
  if (cepDestino.length !== 8) return;

  // Como estamos oferecendo FRETE GRÁTIS, pulamos a consulta à API
  // e apenas mostramos visualmente que o frete foi calculado/aplicado.

  state.frete = 0.00;

  if (freteStatus) {
    freteStatus.style.display = "block";
    freteStatus.innerText = "FRETE GRÁTIS APLICADO ✓";
  }

  updateTotal();
  // Se quiser simular um delay visual:
  // setTimeout(() => updateTotal(), 500);
}


// --- CUPOM ---
function applyCoupon() {
  const inputEl = document.getElementById("couponInput");
  if (!inputEl) return;

  const input = inputEl.value.toUpperCase().trim();
  const priceDisplay = document.getElementById("totalPrice");

  // Reseta desconto antes de aplicar
  state.desconto = 0.00;
  state.cupom = "";

  if (input === "YOUNG") {
    // 10% de desconto no produto
    state.desconto = CONSTANTS.PRODUTO_PRECO * 0.10; // R$ 14,99
    state.cupom = input;

    if (priceDisplay) {
      priceDisplay.innerHTML = `TOTAL: <strike>R$ 157,00</strike> <span style='color:var(--vinho)'>R$ ${(CONSTANTS.PRODUTO_PRECO - state.desconto).toFixed(2).replace('.', ',')}</span>`;
    }
    showSuccess("Cupom YOUNG aplicado! Você ganhou 10% de desconto.", "CUPOM APLICADO!");
  } else if (input !== "") {
    if (priceDisplay) priceDisplay.innerHTML = "TOTAL: R$ 157,00";
    showError("O cupom informado não é válido. Verifique e tente novamente.", "CUPOM INVÁLIDO");
  }

  updateTotal();
}


// ========================================
// GERADOR PIX BRCODE ROBUSTO (CRC16 CCITT)
// ========================================

/**
 * Remove acentos e caracteres especiais de strings
 * Essencial para garantir compatibilidade com o padrão BRCode
 */
function removeAccents(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
    .replace(/[^\x00-\x7F]/g, ""); // Remove caracteres não-ASCII
}

/**
 * Formata campo no padrão TLV (Type-Length-Value)
 * @param {string} id - ID do campo (2 dígitos)
 * @param {string} value - Valor do campo
 * @returns {string} Campo formatado no padrão TLV
 */
function formatTLV(id, value) {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

/**
 * Calcula CRC16 CCITT (polinômio 0x1021, inicial 0xFFFF)
 * Padrão obrigatório para validação de códigos PIX
 * @param {string} payload - String do payload sem o CRC
 * @returns {string} CRC16 em hexadecimal (4 caracteres)
 */
function crc16ccitt(payload) {
  let crc = 0xFFFF;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }

  // Garante que o resultado seja um número de 16 bits
  crc = crc & 0xFFFF;

  // Converte para hexadecimal com 4 dígitos
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Gera o payload PIX (BRCode) completo com CRC16
 * @param {number} amount - Valor da transação
 * @returns {string} Código PIX Copia e Cola válido
 */
function generatePixPayload(amount) {
  // Validação do valor
  if (!amount || amount <= 0) {
    console.error("Valor inválido para PIX:", amount);
    return "";
  }

  // Formata o valor com 2 casas decimais (padrão BRCode)
  const amountStr = amount.toFixed(2);

  // Dados do beneficiário
  const pixKey = CONSTANTS.PIX_KEY.trim();

  // Remove acentos e limita tamanhos conforme especificação BRCode
  // Nome: máximo 25 caracteres
  // Cidade: máximo 15 caracteres
  const beneficiaryName = removeAccents(CONSTANTS.PIX_NAME)
    .trim()
    .toUpperCase()
    .substring(0, 25);

  const beneficiaryCity = removeAccents(CONSTANTS.PIX_CITY)
    .trim()
    .toUpperCase()
    .substring(0, 15);

  // Transaction ID (pode ser usado para reconciliação)
  const txId = "***";

  // Log para debug
  console.log("=== GERANDO PIX ===");
  console.log("Valor:", amountStr);
  console.log("Chave:", pixKey);
  console.log("Beneficiário:", beneficiaryName);
  console.log("Cidade:", beneficiaryCity);

  // Monta o campo 26 (Merchant Account Information)
  // 00 = GUI do PIX
  // 01 = Chave PIX
  const gui = formatTLV("00", "BR.GOV.BCB.PIX");
  const key = formatTLV("01", pixKey);
  const merchantAccount = formatTLV("26", gui + key);

  // Monta o campo 62 (Additional Data Field)
  const referenceLabel = formatTLV("05", txId);
  const additionalData = formatTLV("62", referenceLabel);

  // Monta o payload sem o CRC
  let payload = "";
  payload += formatTLV("00", "01");              // 00: Payload Format Indicator
  payload += merchantAccount;                     // 26: Merchant Account Information
  payload += formatTLV("52", "0000");            // 52: Merchant Category Code
  payload += formatTLV("53", "986");             // 53: Transaction Currency (986 = BRL)
  payload += formatTLV("54", amountStr);         // 54: Transaction Amount
  payload += formatTLV("58", "BR");              // 58: Country Code
  payload += formatTLV("59", beneficiaryName);   // 59: Merchant Name
  payload += formatTLV("60", beneficiaryCity);   // 60: Merchant City
  payload += additionalData;                      // 62: Additional Data
  payload += "6304";                              // 63: CRC16 (placeholder)

  // Calcula o CRC16 do payload
  const crc = crc16ccitt(payload);

  // Monta o payload final
  const finalPayload = payload + crc;

  console.log("Payload gerado (length):", finalPayload.length);
  console.log("CRC16 calculado:", crc);
  console.log("Payload completo:", finalPayload);
  console.log("===================");

  return finalPayload;
}

function copyPix() {
  const pixCode = document.getElementById("pixCode");
  const btn = document.getElementById("btnCopy");
  if (!pixCode) return;

  // Garante que o payload está atualizado
  updateTotal();

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
  // Salva o tamanho selecionado na sessionStorage
  sessionStorage.setItem('tamanho_selecionado', tamanho);

  // Mostra o botão de comprar em vez do formulário
  const buyButtonContainer = document.getElementById("buy-button-container");
  if (buyButtonContainer) {
    buyButtonContainer.classList.remove("hidden");
    buyButtonContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// Nova função para redirecionar ao checkout
function goToCheckout() {
  const tamanho = sessionStorage.getItem('tamanho_selecionado');
  if (!tamanho) {
    showWarning('Por favor, selecione um tamanho (M ou G) antes de continuar.', 'SELECIONE UM TAMANHO');
    return;
  }
  window.location.href = 'checkout.html';
}

// 5. ENVIO DO FORMULÁRIO (Protegido para não travar o script)
function setupForm() {
  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) return;

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Força update dos hidden
    updateTotal();

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
      .then(async (response) => {
        if (response.ok) {
          // BAIXA NO ESTOQUE ANTES DE IR PARA OBRIGADO
          const tamanhoSelecionado = sessionStorage.getItem('tamanho_selecionado');
          if (tamanhoSelecionado) {
            await baixarEstoquePlanilha(tamanhoSelecionado);
          }
          window.location.href = "obrigado.html";
        } else {
          showError("Não foi possível enviar seu pedido. Verifique os dados e tente novamente.", "ERRO AO ENVIAR");
          button.innerText = originalText;
          button.disabled = false;
        }
      })
      .catch(() => {
        showError("Erro de conexão com o servidor. Verifique sua internet e tente novamente.", "ERRO DE CONEXÃO");
        button.innerText = originalText;
        button.disabled = false;
      });
  });
}


// Newsletter Popup Logic
function showNewsletterPopup() {
  const popup = document.getElementById('newsletter-popup');
  if (!popup) return;

  // Check if user has previously interacted with the popup
  const popupStatus = getCookie('newsletter_popup');

  // Don't show if user dismissed or subscribed
  if (popupStatus === 'dismissed' || popupStatus === 'subscribed') {
    return;
  }

  // Show popup after 3 seconds
  setTimeout(() => {
    popup.classList.remove('hidden');
  }, 3000);
}

function closeNewsletterPopup(userDismissed) {
  const popup = document.getElementById('newsletter-popup');
  if (!popup) return;

  popup.classList.add('hidden');

  // If user clicked "Não, obrigado", set cookie to not show for 7 days
  if (userDismissed) {
    setCookie('newsletter_popup', 'dismissed', 7);
  }
}

function acceptNewsletter() {
  // Hide action buttons
  const actionsDiv = document.querySelector('.popup-actions');
  const popupText = document.querySelector('.popup-text');

  if (actionsDiv) actionsDiv.style.display = 'none';
  if (popupText) popupText.style.display = 'none';

  // Show email form
  const emailForm = document.getElementById('popup-newsletter-form');
  if (emailForm) {
    emailForm.classList.remove('hidden');
  }
}

function setupPopupNewsletter() {
  const popupForm = document.getElementById('popup-newsletter-form');
  if (popupForm) {
    popupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = popupForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      const data = new FormData(this);

      btn.innerText = 'ENVIANDO...';
      btn.disabled = true;

      fetch('https://formspree.io/f/mwvklgdy', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          // Success - hide popup and set cookie to never show again
          setCookie('newsletter_popup', 'subscribed', 365);

          // Show success message
          const popup = document.getElementById('newsletter-popup');
          const popupTitle = document.querySelector('.popup-title');
          const emailForm = document.getElementById('popup-newsletter-form');

          if (popupTitle) popupTitle.innerText = 'CADASTRO REALIZADO!';
          if (emailForm) emailForm.innerHTML = '<p style="color: var(--vinho); font-weight: bold; margin: 20px 0;">Obrigado! Você receberá nossas atualizações em breve.</p>';

          // Hide popup after 3 seconds
          setTimeout(() => {
            if (popup) popup.classList.add('hidden');
          }, 3000);
        } else {
          showError('Não foi possível realizar o cadastro. Tente novamente.', 'ERRO AO CADASTRAR');
          btn.innerText = originalText;
          btn.disabled = false;
        }
      }).catch(error => {
        showError('Erro de conexão. Verifique sua internet e tente novamente.', 'ERRO DE CONEXÃO');
        btn.innerText = originalText;
        btn.disabled = false;
      });
    });
  }
}

// Cookie Helper Functions
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
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
  setupForm();
  setupPopupNewsletter(); // Setup popup newsletter instead of old form
  showNewsletterPopup(); // Show popup after delay if user hasn't dismissed
  setupCepInput(); // Novo handler de CEP
  updateTotal();
  // Inicia a verificação de estoque
  // Inicia a verificação de estoque
  atualizarEstoquePlanilha();
  // wakeUpServer(); // Desativado pois não usaremos API de frete
});

// Funções de Navegação Checkout
function goToPaymentStep() {
  const step1 = document.getElementById('step-1-dados');
  const step2 = document.getElementById('step-2-pagamento');
  const nome = document.querySelector('input[name="Nome"]');
  const cpf = document.querySelector('input[name="CPF"]');

  // Validação simples
  if (!nome.value || !cpf.value) {
    showWarning('Por favor, preencha todos os campos obrigatórios antes de continuar.', 'CAMPOS OBRIGATÓRIOS');
    return;
  }

  if (step1 && step2) {
    step1.classList.remove('step-visible');
    step1.classList.add('step-hidden');
    step2.classList.remove('step-hidden');
    step2.classList.add('step-visible');

    // Gera o PIX ao entrar na etapa de pagamento
    updateTotal();
  }
}

function backToDataStep() {
  const step1 = document.getElementById('step-1-dados');
  const step2 = document.getElementById('step-2-pagamento');

  if (step1 && step2) {
    step2.classList.remove('step-visible');
    step2.classList.add('step-hidden');
    step1.classList.remove('step-hidden');
    step1.classList.add('step-visible');
  }
}

function setupCepInput() {
  const cepInput = document.getElementById("cepInput");
  if (!cepInput) return;

  // Monitora qualquer mudança no input (digitação, colar, autofill)
  cepInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove não-números

    // Máscara visual (XXXXX-XXX)
    if (value.length > 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 8);
    }
    e.target.value = value;

    // Se tiver 8 dígitos numéricos (com ou sem traço dá 9 chars), calcula
    const cleanValue = value.replace("-", "");
    if (cleanValue.length === 8) {
      calculateShipping();
      cepInput.blur(); // Remove foco para fechar teclado no mobile
    }
  });

  // Garante que o autofill dispare também e limpe sujeira (. ou -)
  cepInput.addEventListener("change", function () {
    let value = this.value.replace(/\D/g, "");

    // Reaplica mascara correta
    if (value.length >= 8) {
      // Garante que pegamos apenas os 8 primeiros digitos se vier lixo extra
      value = value.substring(0, 8);
      this.value = value.substring(0, 5) + "-" + value.substring(5, 8);
      calculateShipping();
    } else {
      this.value = value;
    }
  });
}

// --- CONFIGURAÇÃO DO ESTOQUE AUTOMATIZADO ---
// Substitua pelo seu URL do Google Apps Script após implantar
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0OoNegWpGTjoQZY0KpV93vIhEMR0ETk2fS1Yb9-yx2d-RHfMP4lMTfbHcDMXEnWv6/exec";

async function atualizarEstoquePlanilha() {
  const badge = document.getElementById("badge-nobluff");
  const sizeButtons = document.querySelectorAll('.size-btn');

  try {
    // Agora pedimos especificamente pelo produto "NoBluff"
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?produto=NoBluff`);
    const estoque = await response.json();

    console.log("Estoque NoBluff:", estoque);

    let totalDisponivel = 0;

    sizeButtons.forEach(label => {
      const input = label.querySelector('input');
      const size = input.value;
      const qtd = estoque[size] || 0;
      totalDisponivel += (qtd > 0 ? qtd : 0);

      if (qtd <= 0) {
        label.classList.add('out-of-stock');
        input.disabled = true;
        label.style.opacity = "0.3";
        label.style.cursor = "not-allowed";
        label.title = "Tamanho esgotado";
      } else {
        label.classList.remove('out-of-stock');
        input.disabled = false;
        label.style.opacity = "1";
        label.style.cursor = "pointer";
      }
    });

    if (badge) {
      if (totalDisponivel > 0) {
        badge.innerText = `${totalDisponivel} UNIDADES RESTANTES`;
        badge.classList.remove("esgotado-badge");
      } else {
        badge.innerText = `ESGOTADO`;
        badge.classList.add("esgotado-badge");
        desativarBotaoCompra();
      }
    }
  } catch (error) {
    console.error("Erro ao carregar estoque da API:", error);
    if (badge) badge.innerText = "ESTOQUE LIMITADO";
  }
}

function desativarBotaoCompra() {
  const buyBtn = document.querySelector("#buy-button-container button");
  if (buyBtn) {
    buyBtn.disabled = true;
    buyBtn.innerText = "PRODUTO ESGOTADO";
    buyBtn.style.background = "#ccc";
  }
}

async function baixarEstoquePlanilha(tamanho) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        produto: "NoBluff",
        tamanho: tamanho
      })
    });
    console.log("Baixa de estoque enviada: NoBluff -", tamanho);
  } catch (e) {
    console.error("Erro ao baixar estoque:", e);
  }
}

// Wake Up Render Server
function wakeUpServer() {
  // Faz um ping silencioso para acordar o container do Render quando o site abre
  fetch("https://hierarchyabove.onrender.com/frete")
    .then(() => console.log("Keeping Server Alive..."))
    .catch(e => console.log("Wake up ping sent"));
}
