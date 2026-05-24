import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Advogado } from './pages/Advogado';
import { Professor } from './pages/Professor';
import { Poeta } from './pages/Poeta';
import { Contato } from './pages/Contato';
import { PostDetail } from './pages/PostDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advogado" element={<Advogado />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/poeta" element={<Poeta />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/:category/:slug" element={<PostDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
