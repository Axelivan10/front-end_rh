import './App.css';
import React from "react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/home.js'
import Login from './pages/login';
import Register from './pages/register';
import Listado from './pages/listado';
import Form_crear from './componentes/form_crear';
import Form_edit from './componentes/form_edit';
import Alerta_modal from './componentes/alerta_modal';
import Contrato_pdf from './componentes/contrato_pdf';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<Listado />} />
        <Route path="/create" element={<Form_crear />} />
        <Route path="/edit/:id" element={<Form_edit />} />
        <Route path="/alerta" element={<Alerta_modal />} />
        <Route path="/contrato/:id" element={<Contrato_pdf />} />
      </Routes>
    </Router>
  );
}

export default App;
