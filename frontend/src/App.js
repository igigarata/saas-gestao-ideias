import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIdea = { title, description, category };

    try {
      await axios.post('http://localhost:3000/ideas', newIdea);
      alert('Ideia enviada com sucesso!');
    } catch (err) {
      alert('Erro ao enviar a ideia');
    }
  };

  return (
    <div className="App">
      <h1>Envio de Ideias</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Enviar Ideia</button>
      </form>
    </div>
  );
}

export default App;
