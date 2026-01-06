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

// 4. LÓGICA DE FRETE, CUPOM E PIX (INTEGRAÇÃO COMPLETA)

const CONSTANTS = {
  MELHOR_ENVIO_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzI3N2M1ODE0N2FiZTRlODY5MjQ0NTMzMWMwYjMxNTVmNjBmOTM4OGMxMTE2NGJmZDU3YzY4YjNhMWIwZGY2YTQ2ZTNiOTc2NTJkYjE2ODUiLCJpYXQiOjE3Njc3MjgwOTMuOTg1NDksIm5iZiI6MTc2NzcyODA5My45ODU0OTIsImV4cCI6MTc5OTI2NDA5My45NzM2ODgsInN1YiI6ImEwYjgyMjFhLWZiZjMtNDNkMi05NmYyLTdhOTU1N2M5M2JmMCIsInNjb3BlcyI6WyJjYXJ0LXJlYWQiLCJjYXJ0LXdyaXRlIiwiY29tcGFuaWVzLXJlYWQiLCJjb21wYW5pZXMtd3JpdGUiLCJjb3Vwb25zLXJlYWQiLCJjb3Vwb25zLXdyaXRlIiwibm90aWZpY2F0aW9ucy1yZWFkIiwib3JkZXJzLXJlYWQiLCJwcm9kdWN0cy1yZWFkIiwicHJvZHVjdHMtZGVzdHJveSIsInByb2R1Y3RzLXdyaXRlIiwicHVyY2hhc2VzLXJlYWQiLCJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy1jYW5jZWwiLCJzaGlwcGluZy1jaGVja291dCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWdlbmVyYXRlIiwic2hpcHBpbmctcHJldmlldyIsInNoaXBwaW5nLXByaW50Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsImVjb21tZXJjZS1zaGlwcGluZyIsInRyYW5zYWN0aW9ucy1yZWFkIiwidXNlcnMtcmVhZCIsInVzZXJzLXdyaXRlIiwid2ViaG9va3MtcmVhZCIsIndlYmhvb2tzLXdyaXRlIiwid2ViaG9va3MtZGVsZXRlIiwidGRlYWxlci13ZWJob29rIl19.F46VtAD8bD6ZTq1lf3FqxgAXCeZJcbVetmDBPq15RjQFjRmvBhUZKzdFqtymWcbIMUC52IPwAXDYuk6sI_A0Q7yqNg4kxjehmyqgOjJGlK1KXVCmW3nAYICEmhy2pFP5vXmNLBFO5h5aRtBrwy2bZZDCFYWcFy1GJKkCTtsBGluPxJhdYlPqFersY2d8zfV_i7xjZb11g9lH7KWj8WePVg7K8HKqGE4sL4pDHw-Wm5pr-TEJQ49pVNHARh0N0rs_-9A-w6L2lnnWXCWaEd75bzCilrbcacHu1PPcTlPK2T1_e8X7D6rJXevsDM9zxmXTPIhAO5OlYANlVBq3ofZho8uF1Ok2GsGl1_DleYsMCiF_bjr5yjA5vHvBJ5mTj4jEHILNWUKNivjvgw4LeCzL-bvnwDHIhtPmx_IvCMvKMBZ75fVgSr_eKOCG0zIU8xclEGfY6elV1CtTeHjQwmYo-SicDxx4w64UbwsEL-qeQWgqXblCBM0b1BQ3djcn3i2FW0CV9Gk6Emq_UEEYfEQvH6Lr8dsa6aMnp6T2r-zWbeamSozQcepPcfa59qp9KfNruMuL-xChvywFBmXw9EZ14qe3Nu43huE7-UsfMftA-3dXOmIQZSrcGcfvp3M_pjFHpiXMIYbvoo4uk1fIhYaWV96GxPYO4UfBgtWqPBrl7uU", // SUBSTITUIR PELO TOKEN DO USUÁRIO
  CEP_ORIGEM: "86057055",
  PRODUTO_PRECO: 137.50,
  PRODUTO_PESO: 0.3, // kg
  PRODUTO_DIMS: { w: 20, h: 5, l: 20 }, // cm
  PIX_KEY: "goinalwsherarco@gmail.com",
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
async function calculateShipping() {
  const cepInput = document.getElementById("cepInput");
  const loading = document.getElementById("loading-frete");

  if (!cepInput || cepInput.value.length < 8) return;

  const cepDestino = cepInput.value.replace(/\D/g, "");
  if (cepDestino.length !== 8) return;

  if (loading) loading.style.display = "block";

  // Dados para API
  const data = {
    from: { postal_code: CONSTANTS.CEP_ORIGEM },
    to: { postal_code: cepDestino },
    products: [
      {
        id: "x",
        width: CONSTANTS.PRODUTO_DIMS.w,
        height: CONSTANTS.PRODUTO_DIMS.h,
        length: CONSTANTS.PRODUTO_DIMS.l,
        weight: CONSTANTS.PRODUTO_PESO,
        insurance_value: CONSTANTS.PRODUTO_PRECO,
        quantity: 1
      }
    ]
  };

  try {
    // Usando Proxy CORS Anywhere (necessário solicitar acesso temporário dnv se cair, mas é a melhor opção free rapida)
    // Alternativamente, se o usuário tiver backend, deve ser feito lá.
    const response = await fetch("/frete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${CONSTANTS.MELHOR_ENVIO_TOKEN}`,
        "User-Agent": "HierarchyAbove/1.0 (igora@example.com)"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Erro na API");

    const result = await response.json();

    // Pegar o frete mais barato (PAC ou Mini Envios geralmente) - Exemplo simples pegando o primeiro ou validando
    // Vamos filtrar por .price ou .custom_price
    // Na v2 geralmente retorna array de opções. Vamos pegar o menor preço valido.

    // Simulação de Fallback se token invalido ou erro (pra não quebrar a demo)
    // Se der erro, assume frete fixo ou trata erro

    let menorPreco = Infinity;
    let achou = false;

    if (Array.isArray(result)) {
      result.forEach(shipping => {
        if (shipping.price) {
          const p = parseFloat(shipping.price);
          if (p < menorPreco) menorPreco = p;
          achou = true;
        }
      });
    }

    // SE TOKEN NÃO ESTIVER PREENCHIDO VAI DAR ERRO 401. 
    // VAMOS FAZER UM MOCK SE NÃO TIVER TOKEN PRA NÃO TRAVAR O USUÁRIO AGORA NO TESTE
    if (!achou && CONSTANTS.MELHOR_ENVIO_TOKEN === "YOUR_TOKEN_HERE") {
      console.warn("Token ausente. Usando frete fixo de teste R$ 25,00");
      state.frete = 25.00;
    } else if (achou) {
      state.frete = menorPreco;
    } else {
      console.error("Nenhuma opção de frete encontrada");
      alert("Não foi possível calcular o frete para este CEP. Tente novamente.");
      state.frete = 0.00;
    }

  } catch (err) {
    console.error(err);
    // Fallback Fixo para teste se API falhar (CORS etc)
    // state.frete = 25.00; 
    alert("Erro ao calcular frete. Verifique o CEP ou tente mais tarde.");
  } finally {
    if (loading) loading.style.display = "none";
    updateTotal();
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

  if (input === "MILGRAU") {
    // 10% de desconto no produto
    state.desconto = CONSTANTS.PRODUTO_PRECO * 0.10; // R$ 14,99
    state.cupom = input;

    if (priceDisplay) {
      priceDisplay.innerHTML = `TOTAL: <strike>R$ 137,50</strike> <span style='color:var(--vinho)'>R$ ${(CONSTANTS.PRODUTO_PRECO - state.desconto).toFixed(2).replace('.', ',')}</span>`;
    }
    alert("CUPOM APLICADO COM SUCESSO!");
  } else if (input !== "") {
    if (priceDisplay) priceDisplay.innerHTML = "TOTAL: R$ 137,50";
    alert("CUPOM INVÁLIDO");
  }

  updateTotal();
}


// --- GERADOR PIX (CRC16) ---
// Função helper para remover acentos
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function generatePixPayload(amount) {
  const amountStr = amount.toFixed(2);
  const key = CONSTANTS.PIX_KEY;
  // O PIX limita o nome do recebedor em 25 caracteres
  const name = removeAccents(CONSTANTS.PIX_NAME).substring(0, 25).toUpperCase();
  // Cidade limita em 15 caracteres
  const city = removeAccents(CONSTANTS.PIX_CITY).substring(0, 15).toUpperCase();
  const txtId = "HIERARCHY01"; // Identificador da transação

  // Funções auxiliares para montar TLV (Type-Length-Value)
  const format = (id, value) => {
    const len = value.length.toString().padStart(2, "0");
    return `${id}${len}${value}`;
  };

  // Montagem Payload
  // 00 - Payload Format Indicator
  // 26 - Merchant Account Information (GUI, Chave)
  // 52 - Merchant Category Code (0000 - Not used/General)
  // 53 - Transaction Currency (986 - BRL)
  // 54 - Transaction Amount
  // 58 - Country Code (BR)
  // 59 - Merchant Name
  // 60 - Merchant City
  // 62 - Additional Data Field Template (TxID)

  // 26: 00(GUI) + 01(Chave)
  const merchantAccount = format("00", "BR.GOV.BCB.PIX") + format("01", key);

  // 62: 05(Reference Label)
  const additionalData = format("05", txtId);

  let payload =
    format("00", "01") +
    format("26", merchantAccount) +
    format("52", "0000") +
    format("53", "986") +
    format("54", amountStr) +
    format("58", "BR") +
    format("59", name) +
    format("60", city) +
    format("62", additionalData) +
    "6304"; // Adiciona ID do CRC no final

  // Calcular CRC16
  const crc = crc16ccitt(payload).toUpperCase();
  const finalPayload = `${payload}${crc}`;

  console.log("DEBUG PIX PAYLOAD:", finalPayload); // Debug no console
  return finalPayload;
}

function crc16ccitt(str) {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
      else crc = crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).padStart(4, "0");
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
  const hiddenTamanho = document.getElementById("hidden-tamanho");
  if (hiddenTamanho) hiddenTamanho.value = tamanho;

  const pixArea = document.getElementById("pix-area");
  if (pixArea) {
    pixArea.classList.remove("hidden");
    pixArea.scrollIntoView({ behavior: "smooth" });
  }

  // Inicializa valor corretor ao abrir area pix
  updateTotal();
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

function setupNewsletter() {
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = newsletterForm.querySelector("button");
      const originalText = btn.innerText;
      const data = new FormData(this);

      btn.innerText = "ENVIANDO...";
      btn.disabled = true;

      fetch("https://formspree.io/f/mwvklgdy", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          btn.innerText = "CADASTRADO!";
          btn.style.background = "#000";
          newsletterForm.reset();
          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "var(--vinho)";
            btn.disabled = false;
          }, 3000);
        } else {
          alert("Erro ao cadastrar. Tente novamente.");
          btn.innerText = originalText;
          btn.disabled = false;
        }
      }).catch(error => {
        alert("Erro de conexão.");
        btn.innerText = originalText;
        btn.disabled = false;
      });
    });
  }
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

triggerFadeIn();
updateCountdown();
setupForm();
setupNewsletter();
setupCepInput(); // Novo handler de CEP
updateTotal();
// Inicia a verificação de estoque
atualizarEstoquePlanilha();
});

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

  // Garante que o autofill dispare também
  cepInput.addEventListener("change", function () {
    const cleanValue = this.value.replace(/\D/g, "");
    if (cleanValue.length === 8) {
      calculateShipping();
    }
  });
}

// Estoque logic
async function atualizarEstoquePlanilha() {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNgY7qK5tkLpHz0Oi7zjKjiS-TCicyJ9FEaq9fou84IZXmdC-XnCbfUX--9ITN-L9iQmt6vWCvO-5M/pub?output=csv";

  try {
    const response = await fetch(url);
    const data = await response.text();

    const linhas = data.split("\n");
    // Assume que a Célula de estoque está na linha 2 (índice 1), primeira coluna
    const estoque = parseInt(linhas[1].trim());

    console.log("Estoque carregado:", estoque); // Debug

    const badge = document.getElementById("badge-nobluff");
    const cardProduto = document.getElementById("card-nobluff");
    const areaCheckout = document.querySelector(".checkout-area");

    if (!isNaN(estoque) && estoque > 0) {
      // PRODUTO DISPONÍVEL
      if (badge) {
        badge.innerText = `${estoque} UNIDADES RESTANTES`;
        badge.classList.remove("esgotado-badge");
      }
    } else if (!isNaN(estoque)) {
      // PRODUTO ESGOTADO
      if (badge) {
        badge.innerText = `ESGOTADO`;
        badge.classList.add("esgotado-badge");
      }

      if (cardProduto) {
        cardProduto.onclick = null;
        cardProduto.style.cursor = "not-allowed";
        cardProduto.style.filter = "grayscale(0.5)";
      }

      if (areaCheckout) {
        areaCheckout.innerHTML = `
          <div style="background: #f8d7da; color: #721c24; padding: 20px; text-align: center; font-weight: bold; border: 1px solid #f5c6cb; margin-top: 20px;">
            ESTE PRODUTO ESTÁ ESGOTADO
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Erro ao carregar estoque:", error);
  }
}
