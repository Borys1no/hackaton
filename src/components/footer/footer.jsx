// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.footerContent}>
                <p>&copy; {new Date().getFullYear()} Reserva de Espacios. Todos los derechos reservados.</p>
                <ul style={styles.footerLinks}>
                    <li><Link style={styles.link} to="/contacto">Contacto</Link></li>
                    <li><Link style={styles.link} to="/terminos">Términos y Condiciones</Link></li>
                    <li><Link style={styles.link} to="/privacidad">Política de Privacidad</Link></li>
                </ul>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
    footerContent: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    footerLinks: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.3s ease',
    },
    linkHover: {
        color: '#ccc',
    },
};

export default Footer;
