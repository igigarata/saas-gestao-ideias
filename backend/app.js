require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Para poder ler JSON no corpo das requisições

// Conexão com o MongoDB (usando a variável de ambiente)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Banco de dados conectado');
}).catch((err) => {
  console.log('Erro ao conectar ao banco de dados:', err);
});

// Definir o modelo de Idea
const Idea = mongoose.model('Idea', new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: { type: String, default: 'Em análise' },
  createdAt: { type: Date, default: Date.now },
}));

// Rota para enviar ideias
app.post('/ideas', async (req, res) => {
  const { title, description, category } = req.body;
  const idea = new Idea({ title, description, category });

  try {
    await idea.save();
    res.status(201).send('Ideia enviada com sucesso!');
  } catch (err) {
    res.status(400).send('Erro ao salvar ideia');
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
