const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// CONFIGURAÇÃO DO CORS: Permite que seu site (carnagezbr.site) envie dados para cá
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ROTA DE TESTE: Para você abrir no navegador e ver se o servidor está vivo
app.get('/', (req, res) => {
    res.send('<h1>Servidor CarnageZ Online!</h1><p>O backend está funcionando corretamente.</p>');
});

// LINK DO SEU WEBHOOK DO DISCORD
const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1487722799874314240/k1mDmAMH2nNGk6bOcNpSD90uwfyCUaNiFNVDTlQm-b3Ls-oxqscDQQYfxeX3HIZ2pZxC";

// ROTA PRINCIPAL: Onde o site envia o pedido
app.post('/api/order', async (req, res) => {
    try {
        console.log("Pedido recebido:", req.body);
        
        // Envia para o Discord
        await axios.post(DISCORD_WEBHOOK_URL, req.body);
        
        res.status(200).json({ message: "Pedido enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar para o Discord:", error.message);
        res.status(500).json({ error: "Erro ao processar pedido no servidor" });
    }
});

// PORTA E INICIALIZAÇÃO: O 0.0.0.0 é fundamental para o Railway funcionar
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor CarnageZ rodando na porta ${PORT}`);
});
