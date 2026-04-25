const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Para salvar logs de vendas
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DISCORD_WEBHOOK = "https://discordapp.com/api/webhooks/1496176353979007026/QVE9sfnG1qBErYwWW0iNM0UFvVHh5etuFQYolo7rbj8NiRJf4Xjo-Cci7h4ypkFJrVOe";

app.post('/api/order', async (req, res) => {
    try {
        // Criar log local da venda antes de enviar ao Discord
        const orderInfo = req.body.embeds[0].fields;
        const logEntry = `[${new Date().toLocaleString()}] Nick: ${orderInfo[0].value} | Item: ${orderInfo[1].value} | Valor: ${orderInfo[2].value}\n`;
        
        fs.appendFileSync('vendas_carnagez.txt', logEntry);

        const response = await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        if (response.ok) {
            res.status(200).send({ success: true });
        } else {
            res.status(500).send({ error: 'Erro no Webhook' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Erro interno' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor CarnageZ rodando na porta ${PORT}`));