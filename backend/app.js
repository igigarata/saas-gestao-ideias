require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Verifique o valor da variável
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());  // Permite o acesso de qualquer origem

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

  // Validação para garantir que todos os campos necessários sejam passados
  if (!title || !description || !category) {
    return res.status(400).send('Faltando dados: título, descrição ou categoria');
  }

  // Criação do modelo Idea
  const idea = new Idea({ title, description, category });

  try {
    // Salva a ideia no banco de dados
    await idea.save();
    res.status(201).send('Ideia enviada com sucesso!');
  } catch (err) {
    // Log do erro no console para facilitar a depuração
    console.error('Erro ao salvar a ideia:', err);
    res.status(500).send('Erro ao salvar a ideia no banco de dados');
  }
});


// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
