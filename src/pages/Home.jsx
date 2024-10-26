// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bienvenido al Sistema de Reservas de Coworking</h1>
      <p style={styles.paragraph}>Consulta la disponibilidad de espacios y haz una reserva fácilmente.</p>
      
      <Link to="/register" style={styles.button}>
        Comenzar Reserva
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#555',
    textAlign: 'center',
    maxWidth: '600px',
    marginTop: '1rem',
  },
  button: {
    marginTop: '2rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
  },
};

export default Home;
