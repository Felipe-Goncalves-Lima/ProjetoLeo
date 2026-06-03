import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Advogado } from './pages/Advogado';
import { Professor } from './pages/Professor';
import { Poeta } from './pages/Poeta';
import { Contato } from './pages/Contato';
import { PostDetail } from './pages/PostDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminRoute } from './components/AdminRoute';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminPostForm } from './pages/AdminPostForm';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advogado" element={<Advogado />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/poeta" element={<Poeta />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/posts/novo" element={<AdminRoute><AdminPostForm /></AdminRoute>} />
        <Route path="/admin/posts/editar/:slug" element={<AdminRoute><AdminPostForm /></AdminRoute>} />

        <Route path="/:category/:slug" element={<PostDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;

