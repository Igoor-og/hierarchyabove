/**
 * HIERARCHY ABOVE - Official Script v3.1
 */

// Define a data alvo para o countdown: 27 de fevereiro de 2026 às 13h
const targetDate = new Date("February 27, 2026 13:00:00").getTime();

/**
 * Função para atualizar o cronômetro regressivo
 */
function updateCountdown() {
  // Captura parâmetros da URL para modo DEV
  const urlParams = new URLSearchParams(window.location.search);

  // Modo DEV: redireciona para produtos.html somente na página index.html ou raiz
  if (urlParams.get("dev") === "true") {
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      window.location.href = "produtos.html";
    }
    return; // Para execução do countdown no modo DEV
  }

  // Tempo atual em milissegundos
  const now = new Date().getTime();

  // Calcula a diferença entre a data alvo e o tempo atual
  const distance = targetDate - now;

  // Seleciona o elemento HTML onde o countdown será exibido
  const countdownEl = document.getElementById("countdown");

  if (countdownEl) {
    // Se o tempo acabou, redireciona para produtos.html
    if (distance < 0) {
      window.location.href = "produtos.html";
      return;
    }

    // Calcula dias, horas, minutos e segundos restantes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Atualiza o conteúdo do elemento com o tempo formatado
    countdownEl.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }
}

// Atualiza o countdown a cada segundo
setInterval(updateCountdown, 1000);

// Atualiza imediatamente ao carregar para evitar atraso na primeira exibição
updateCountdown();


// 3. INTERFACE DE PRODUTO
function showProductDetail() {
  const vitrine = document.getElementById("vitrine");
  const detail = document.getElementById("product-detail");
  const promoCarousel = document.getElementById("promo-carousel");

  if (vitrine && detail) {
    vitrine.classList.add("hidden");
    detail.classList.remove("hidden");

    // Esconde o carrossel promocional
    if (promoCarousel) {
      promoCarousel.classList.add("hidden");
    }

    window.scrollTo(0, 0);
    triggerFadeIn();
  }
}

function hideProductDetail() {
  const vitrine = document.getElementById("vitrine");
  const detail = document.getElementById("product-detail");
  const promoCarousel = document.getElementById("promo-carousel");

  if (vitrine && detail) {
    detail.classList.add("hidden");
    vitrine.classList.remove("hidden");

    // Mostra o carrossel promocional novamente
    if (promoCarousel) {
      promoCarousel.classList.remove("hidden");
    }

    window.scrollTo(0, 0);
  }
}

// 4. LÓGICA DE FRETE, CUPOM E PIX (INTEGRAÇÃO COMPLETA)

const CONSTANTS = {
  MELHOR_ENVIO_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzI3N2M1ODE0N2FiZTRlODY5MjQ0NTMzMWMwYjMxNTVmNjBmOTM4OGMxMTE2NGJmZDU3YzY4YjNhMWIwZGY2YTQ2ZTNiOTc2NTJkYjE2ODUiLCJpYXQiOjE3Njc3MjgwOTMuOTg1NDksIm5iZiI6MTc2NzcyODA5My45ODU0OTIsImV4cCI6MTc5OTI2NDA5My45NzM2ODgsInN1YiI6ImEwYjgyMjFhLWZiZjMtNDNkMi05NmYyLTdhOTU1N2M5M2JmMCIsInNjb3BlcyI6WyJjYXJ0LXJlYWQiLCJjYXJ0LXdyaXRlIiwiY29tcGFuaWVzLXJlYWQiLCJjb21wYW5pZXMtd3JpdGUiLCJjb3Vwb25zLXJlYWQiLCJjb3Vwb25zLXdyaXRlIiwibm90aWZpY2F0aW9ucy1yZWFkIiwib3JkZXJzLXJlYWQiLCJwcm9kdWN0cy1yZWFkIiwicHJvZHVjdHMtZGVzdHJveSIsInByb2R1Y3RzLXdyaXRlIiwicHVyY2hhc2VzLXJlYWQiLCJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy1jYW5jZWwiLCJzaGlwcGluZy1jaGVja291dCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWdlbmVyYXRlIiwic2hpcHBpbmctcHJldmlldyIsInNoaXBwaW5nLXByaW50Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsImVjb21tZXJjZS1zaGlwcGluZyIsInRyYW5zYWN0aW9ucy1yZWFkIiwidXNlcnMtcmVhZCIsInVzZXJzLXdyaXRlIiwid2ViaG9va3MtcmVhZCIsIndlYmhvb2tzLXdyaXRlIiwid2ViaG9va3MtZGVsZXRlIiwidGRlYWxlci13ZWJob29rIl19.F46VtAD8bD6ZTq1lf3FqxgAXCeZJcbVetmDBPq15RjQFjRmvBhUZKzdFqtymWcbIMUC52IPwAXDYuk6sI_A0Q7yqNg4kxjehmyqgOjJGlK1KXVCmW3nAYICEmhy2pFP5vXmNLBFO5h5aRtBrwy2bZZDCFYWcFy1GJKkCTtsBGluPxJhdYlPqFersY2d8zfV_i7xjZb11g9lH7KWj8WePVg7K8HKqGE4sL4pDHw-Wm5pr-TEJQ49pVNHARh0N0rs_-9A-w6L2lnnWXCWaEd75bzCilrbcacHu1PPcTlPK2T1_e8X7D6rJXevsDM9zxmXTPIhAO5OlYANlVBq3ofZho8uF1Ok2GsGl1_DleYsMCiF_bjr5yjA5vHvBJ5mTj4jEHILNWUKNivjvgw4LeCzL-bvnwDHIhtPmx_IvCMvKMBZ75fVgSr_eKOCG0zIU8xclEGfY6elV1CtTeHjQwmYo-SicDxx4w64UbwsEL-qeQWgqXblCBM0b1BQ3djcn3i2FW0CV9Gk6Emq_UEEYfEQvH6Lr8dsa6aMnp6T2r-zWbeamSozQcepPcfa59qp9KfNruMuL-xChvywFBmXw9EZ14qe3Nu43huE7-UsfMftA-3dXOmIQZSrcGcfvp3M_pjFHpiXMIYbvoo4uk1fIhYaWV96GxPYO4UfBgtWqPBrl7uU", // SUBSTITUIR PELO TOKEN DO USUÁRIO
  CEP_ORIGEM: "86057055",
  PRODUTO_PRECO: 136.00,
  PRODUTO_PESO: 0.3, // kg
  PRODUTO_DIMS: { w: 20, h: 5, l: 20 }, // cm
  PIX_KEY: "+5543996802158", // Adicionado + para formato E.164 padrão
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

  // LOGICA DE FRETE GRATIS NO FORMSPREE
  if (hiddenFrete) {
    if (state.frete === 0) {
      // hiddenFrete.type = "text"; // REMOVIDO: Causava bug visual
      hiddenFrete.value = "Gratis";
    } else {
      hiddenFrete.value = state.frete.toFixed(2);
    }
  }

  if (hiddenCupom) hiddenCupom.value = state.cupom;

  // Gerar Payload Pix
  const payload = generatePixPayload(state.total);
  if (pixTextarea) pixTextarea.value = payload;
}

// --- TABELA DE FRETE PRÉ-DEFINIDA POR ESTADO ---
const FRETE_POR_ESTADO = {
  // Sudeste - R$15
  SP: 15, RJ: 15, MG: 15, ES: 15,
  // Sul - R$18
  PR: 18, SC: 18, RS: 18,
  // Centro-Oeste - R$20
  DF: 20, GO: 20, MT: 20, MS: 20,
  // Nordeste - R$22
  BA: 22, PE: 22, CE: 22, SE: 22, AL: 22, PB: 22, RN: 22, MA: 22, PI: 22,
  // Norte - R$25
  AM: 25, PA: 25, RO: 25, AC: 25, RR: 25, AP: 25, TO: 25
};

/**
 * Aplica o frete com base no estado (UF).
 * Pode ser chamada a qualquer momento (autocomplete, restore, digitação).
 */
function aplicarFretePorEstado(uf) {
  const freteStatus = document.getElementById("frete-status");
  if (!uf) return;

  const ufUpper = uf.toUpperCase().trim();
  const valorFrete = FRETE_POR_ESTADO[ufUpper];

  if (valorFrete !== undefined) {
    state.frete = valorFrete;
    if (freteStatus) {
      freteStatus.style.display = "block";
      freteStatus.innerText = `FRETE: R$ ${valorFrete.toFixed(2).replace('.', ',')} ✓`;
      freteStatus.style.color = "var(--vinho)";
    }
  } else {
    state.frete = 0;
    if (freteStatus) {
      freteStatus.style.display = "block";
      freteStatus.innerText = "ESTADO NÃO RECONHECIDO";
      freteStatus.style.color = "#ff0000";
    }
  }

  updateTotal();
}

// Mantido para compatibilidade — agora delega para aplicarFretePorEstado
function calculateShipping() {
  const estadoInput = document.querySelector('input[name="Estado"]');
  if (estadoInput && estadoInput.value) {
    aplicarFretePorEstado(estadoInput.value);
  }
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

  if (input === "MILGRAU15") {
    // R$15 de desconto fixo no produto
    state.desconto = 15.00;
    state.cupom = input;

    if (priceDisplay) {
      priceDisplay.innerHTML = `TOTAL: <strike>R$ 136,00</strike> <span style='color:var(--vinho)'>R$ ${(CONSTANTS.PRODUTO_PRECO - state.desconto).toFixed(2).replace('.', ',')}</span>`;
    }
    showSuccess("Cupom MILGRAU15 aplicado! Você ganhou R$ 15,00 de desconto.", "CUPOM APLICADO!");
  } else if (input !== "") {
    if (priceDisplay) priceDisplay.innerHTML = "TOTAL: R$ 136,00";
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

  // Seleciona o texto (mobile friendly)
  pixCode.select();
  pixCode.setSelectionRange(0, 99999); // Para mobile

  try {
    // Tenta usar a API Clipboard moderna primeiro
    navigator.clipboard.writeText(pixCode.value).then(() => {
      showCopyFeedback(btn);
    }).catch(() => {
      // Fallback para execCommand
      document.execCommand('copy');
      showCopyFeedback(btn);
    });
  } catch (err) {
    console.error('Erro ao copiar', err);
    // Fallback final
    document.execCommand('copy');
    showCopyFeedback(btn);
  }
}

function showCopyFeedback(btn) {
  const originalText = "COPIAR CÓDIGO PIX";

  // Feedback visual
  btn.innerText = "CÓDIGO COPIADO!";
  btn.style.background = "#2ecc71"; // Verde sucesso
  btn.style.borderColor = "#2ecc71";

  // Feedback tátil (se disponível)
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.background = "var(--vinho)"; // Volta para a cor original (vinho ou preto dependendo do CSS)
    btn.style.borderColor = "transparent";
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

    fetch("https://formspree.io/f/xdalodkv", {
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

      fetch('https://formspree.io/f/xdalodkv', {
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
  setupCepInput(); // Novo handler de CEP com ViaCEP
  updateTotal();

  // LocalStorage: Recupera dados salvos anteriormente
  recuperarDadosFormulario();

  // LocalStorage: Configura salvamento automático ao digitar
  configurarAutoSave();

  // Inicia a verificação de estoque
  atualizarEstoquePlanilha();
  setupLookbookReveal(); // Ativa o efeito de reveal no lookbook
  // wakeUpServer(); // Desativado pois não usaremos API de frete
});

// --- EFEITO LOOKBOOK REVEAL ---
function setupLookbookReveal() {
  const lookbookImages = document.querySelectorAll(".reveal-img");

  if (lookbookImages.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
      } else {
        // Opcional: Se quiser que fique preto e branco de novo ao sair da tela
        // entry.target.classList.remove("reveal-active");
      }
    });
  }, {
    threshold: 0.3 // Dispara quando 30% da imagem estiver visível
  });

  lookbookImages.forEach(img => observer.observe(img));
}

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
    startPixPaymentTimer(); // Inicia o contador de 10 minutos
  }
}

let pixTimerInterval;
function startPixPaymentTimer() {
  const display = document.getElementById("pix-countdown");
  const container = document.getElementById("pix-timer-container");
  if (!display) return;

  // Reseta estado
  clearInterval(pixTimerInterval);
  display.classList.remove("expired");
  if (container) container.style.border = "1px solid #eee";

  let duration = 600; // 10 minutos em segundos

  function updateTimerDisplay() {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    display.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (duration < 0) {
      clearInterval(pixTimerInterval);
      display.textContent = "EXPIRADO";
      display.classList.add("expired");
      if (container) container.style.border = "1px solid red";
      showError("O tempo para pagamento expirou. Por favor, gere um novo código.", "TEMPO ESGOTADO");
    }

    duration--;
  }

  updateTimerDisplay(); // Chama imediatamente
  pixTimerInterval = setInterval(updateTimerDisplay, 1000);
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

    // Se tiver 8 dígitos numéricos, busca na API ViaCEP
    const cleanValue = value.replace("-", "");
    if (cleanValue.length === 8) {
      buscarCEP(cleanValue);
    }
  });

  // Garante que o autofill dispare também
  cepInput.addEventListener("change", function () {
    let value = this.value.replace(/\D/g, "");
    if (value.length >= 8) {
      value = value.substring(0, 8);
      this.value = value.substring(0, 5) + "-" + value.substring(5, 8);
      buscarCEP(value);
    }
  });

  // Listener no campo Estado: aplica frete ao digitar/colar a UF manualmente
  const estadoInput = document.querySelector('input[name="Estado"]');
  if (estadoInput) {
    estadoInput.addEventListener("input", function () {
      if (this.value.length === 2) {
        aplicarFretePorEstado(this.value);
      }
    });
    estadoInput.addEventListener("change", function () {
      if (this.value.length >= 2) {
        aplicarFretePorEstado(this.value);
      }
    });
  }
}

// --- INTEGRAÇÃO COM VIACEP API ---
async function buscarCEP(cep) {
  const freteStatus = document.getElementById("frete-status");
  const enderecoInput = document.querySelector('input[name="Endereco"]');
  const bairroInput = document.querySelector('input[name="Bairro"]');
  const cidadeInput = document.querySelector('input[name="Cidade"]');
  const estadoInput = document.querySelector('input[name="Estado"]');

  if (!enderecoInput) return; // Se não estiver na página de checkout, ignora

  try {
    // Mostra loading
    if (freteStatus) {
      freteStatus.style.display = "block";
      freteStatus.innerText = "BUSCANDO ENDEREÇO...";
      freteStatus.style.color = "#666";
    }

    // Chama API ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    // Preenche os campos automaticamente
    if (enderecoInput) enderecoInput.value = data.logradouro || "";
    if (bairroInput) bairroInput.value = data.bairro || "";
    if (cidadeInput) cidadeInput.value = data.localidade || "";
    if (estadoInput) estadoInput.value = data.uf || "";

    // Aplica o frete imediatamente com base no estado retornado pelo ViaCEP
    aplicarFretePorEstado(data.uf);

    // Foca no campo de número (que geralmente está junto com endereço)
    if (enderecoInput && !enderecoInput.value.includes(",")) {
      enderecoInput.focus();
    }

  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    if (freteStatus) {
      freteStatus.style.display = "block";
      freteStatus.innerText = "CEP NÃO ENCONTRADO";
      freteStatus.style.color = "#ff0000";
    }
  }
}

// --- SALVAMENTO E RECUPERAÇÃO DE DADOS (LOCALSTORAGE) ---
function salvarDadosFormulario() {
  const formData = {
    nome: document.querySelector('input[name="Nome"]')?.value || '',
    email: document.querySelector('input[name="Email"]')?.value || '',
    cpf: document.querySelector('input[name="CPF"]')?.value || '',
    cep: document.querySelector('input[name="CEP"]')?.value || '',
    bairro: document.querySelector('input[name="Bairro"]')?.value || '',
    endereco: document.querySelector('input[name="Endereco"]')?.value || '',
    complemento: document.querySelector('input[name="Complemento"]')?.value || '',
    cidade: document.querySelector('input[name="Cidade"]')?.value || '',
    estado: document.querySelector('input[name="Estado"]')?.value || ''
  };

  localStorage.setItem('hierarchyAbove_userData', JSON.stringify(formData));
}

function recuperarDadosFormulario() {
  const savedData = localStorage.getItem('hierarchyAbove_userData');

  if (!savedData) return;

  try {
    const formData = JSON.parse(savedData);

    // Preenche os campos se eles existirem
    const nomeInput = document.querySelector('input[name="Nome"]');
    const emailInput = document.querySelector('input[name="Email"]');
    const cpfInput = document.querySelector('input[name="CPF"]');
    const cepInput = document.querySelector('input[name="CEP"]');
    const bairroInput = document.querySelector('input[name="Bairro"]');
    const enderecoInput = document.querySelector('input[name="Endereco"]');
    const complementoInput = document.querySelector('input[name="Complemento"]');
    const cidadeInput = document.querySelector('input[name="Cidade"]');
    const estadoInput = document.querySelector('input[name="Estado"]');

    if (nomeInput && formData.nome) nomeInput.value = formData.nome;
    if (emailInput && formData.email) emailInput.value = formData.email;
    if (cpfInput && formData.cpf) cpfInput.value = formData.cpf;
    if (cepInput && formData.cep) cepInput.value = formData.cep;
    if (bairroInput && formData.bairro) bairroInput.value = formData.bairro;
    if (enderecoInput && formData.endereco) enderecoInput.value = formData.endereco;
    if (complementoInput && formData.complemento) complementoInput.value = formData.complemento;
    if (cidadeInput && formData.cidade) cidadeInput.value = formData.cidade;
    if (estadoInput && formData.estado) estadoInput.value = formData.estado;

    // Se o estado foi restaurado, aplica o frete automaticamente
    if (formData.estado) {
      aplicarFretePorEstado(formData.estado);
    }

  } catch (e) {
    console.error("Erro ao recuperar dados salvos:", e);
  }
}

function configurarAutoSave() {
  // Lista de campos para monitorar
  const campos = [
    'input[name="Nome"]',
    'input[name="Email"]',
    'input[name="CPF"]',
    'input[name="CEP"]',
    'input[name="Bairro"]',
    'input[name="Endereco"]',
    'input[name="Complemento"]',
    'input[name="Cidade"]',
    'input[name="Estado"]'
  ];

  // Adiciona listener de mudança em todos os campos
  campos.forEach(seletor => {
    const campo = document.querySelector(seletor);
    if (campo) {
      campo.addEventListener('blur', salvarDadosFormulario); // Salva ao sair do campo
      campo.addEventListener('change', salvarDadosFormulario); // Salva ao mudar
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
