// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <h1 className="heading">Bienvenido al Sistema de Reservas de Coworking</h1>
      <p className="paragraph">Consulta la disponibilidad de espacios y haz una reserva fácilmente.</p>
      
      <Link to="/register" className="button">
        Comenzar Reserva
      </Link>
    </div>
  );
};

export default Home;
