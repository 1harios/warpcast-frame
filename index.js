const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
        }
        img {
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello, Warpcast Frame!</h1>
        <button onclick="alert('Button clicked!')">Click me</button>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
