const express = require('express');
const cors = require('cors'); // Make frontend and backend communicate

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend 👋' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
