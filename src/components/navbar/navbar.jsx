// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.logo}>Reserva de Espacios</h1>
            <ul style={styles.navLinks}>
                <li><Link style={styles.link} to="/">Inicio</Link></li>
                <li><Link style={styles.link} to="/reservas">Reservas</Link></li>
                <li><Link style={styles.link} to="/disponibilidad">Disponibilidad</Link></li>
                <li><Link style={styles.link} to="/perfil">Perfil</Link></li>
            </ul>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#333',
        color: '#fff'
    },
    logo: {
        fontSize: '1.5rem'
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.5rem',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease'
    },
    linkHover: {
        backgroundColor: '#555'
    }
};

export default Navbar;
