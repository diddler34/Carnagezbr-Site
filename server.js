const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// SEU LINK DO WEBHOOK QUE VOCÊ ME MANDOU
const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1487722799874314240/k1mDmAMH2nNGk6bOcNpSD90uwfyCUaNiFNVDTlQm-b3Ls-oxqscDQQYfxeX3HIZ2pZxC";

app.post('/api/order', async (req, res) => {
    try {
        // Envia os dados recebidos do site diretamente para o Discord
        await axios.post(DISCORD_WEBHOOK_URL, req.body);
        res.status(200).json({ message: "Pedido enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar para o Discord:", error.message);
        res.status(500).json({ error: "Erro ao processar pedido" });
    }
});

// Porta automática para o Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
