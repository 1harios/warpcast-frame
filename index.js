const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());

// Главная страница с кнопкой и изображением
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Warpcast Frame</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          text-align: center;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
        }
        button {
          padding: 10px 20px;
          background-color: #008cba;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .stats {
          margin-top: 20px;
          text-align: left;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Warpcast Wallet Stats</h1>
        <img src="https://via.placeholder.com/600x200" alt="Main Image" />
        <button onclick="checkBalance()">Проверить баланс</button>
        <div id="stats" class="stats"></div>
      </div>
      <script>
        async function checkBalance() {
          const wallet = "0x33041027dd8F4dC82B6e825FB37ADf8f15d44053"; // Пример адреса кошелька
          const response = await fetch(\`/api/stats?wallet=\${wallet}\`);
          const stats = await response.json();
          document.getElementById('stats').innerHTML = \`
            <p>ID: \${stats.id}</p>
            <p>Wallet: \${stats.wallet}</p>
            <p>Build Score: \${stats.build_score}</p>
            <p>Rank: \${stats.rank}</p>
            <p>Nominations Received: \${stats.nominations_received}</p>
            <p>Nominations Given: \${stats.nominations_given}</p>
            <p>Tokens Committed Round 1: \${stats.tokens_committed_round_1}</p>
            <p>Talent Passport ID: \${stats.talent_passport_id}</p>
            <p>Talent Builder Score: \${stats.talent_builder_score}</p>
          \`;
        }
      </script>
    </body>
    </html>
  `);
});

// Endpoint для получения статистики
app.get('/api/stats', async (req, res) => {
  const wallet = req.query.wallet;
  if (!wallet) {
    return res.status(400).send({ error: 'Wallet address is required' });
  }
  try {
    const response = await axios.get(`https://build.top/api/stats?wallet=${wallet}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch wallet stats' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
