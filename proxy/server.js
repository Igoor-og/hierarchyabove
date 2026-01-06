const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const path = require('path');
const app = express();

// Servir arquivos estáticos da pasta raiz (um nível acima de /proxy)
app.use(express.static(path.join(__dirname, '../')));

// Permite que SÓ o seu site acesse esse proxy (Segurança)
// Em produção, troque '*' pelo seu domínio: 'https://hierarchyabove.com.br'
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

// Redireciona tudo que chegar em /frete para a API do Melhor Envio
app.use('/frete', createProxyMiddleware({
    target: 'https://melhorenvio.com.br/api/v2/me/shipment/calculate',
    changeOrigin: true,
    pathRewrite: {
        '^/frete': '', // Remove /frete da URL
    },
    onProxyReq: (proxyReq, req, res) => {
        // Você pode injetar o Token aqui para não ficar exposto no Front-end (Opcional mas Recomendado)
        // proxyReq.setHeader('Authorization', 'Bearer SEU_TOKEN_AQUI');
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
});
