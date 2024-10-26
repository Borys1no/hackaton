// src/pages/ReservacionPagina.jsx
import React, { useState } from 'react';
import { db } from '../firebase'; // Asegúrate de que db esté correctamente configurado en firebase.js
import { collection, addDoc } from 'firebase/firestore';
import './ReservacionPagina.css';

const ReservacionPagina = () => {
  const [cliente, setCliente] = useState('');
  const [tipoEspacio, setTipoEspacio] = useState('oficina');
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [estado, setEstado] = useState('activo');
  const [error, setError] = useState('');

  const isValidDateAndTime = () => {
    const start = new Date(`${fechaInicio}T${horaInicio}`);
    const end = new Date(`${fechaFin}T${horaFin}`);
    return start < end;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cliente) {
      setError('El nombre del cliente es obligatorio');
      return;
    }
    if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) {
      setError('Las fechas y horas de reserva son obligatorias');
      return;
    }
    if (!isValidDateAndTime()) {
      setError('La fecha y hora de fin deben ser posteriores a la de inicio');
      return;
    }
    
    try {
      await addDoc(collection(db, 'reservas'), {
        cliente,
        tipoEspacio,
        fechaInicio,
        horaInicio,
        fechaFin,
        horaFin,
        estado,
      });
      alert('Reserva realizada con éxito');
      setCliente('');
      setTipoEspacio('oficina');
      setFechaInicio('');
      setHoraInicio('');
      setFechaFin('');
      setHoraFin('');
      setEstado('activo');
      setError('');
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      alert('Hubo un problema al realizar la reserva. Intente nuevamente.');
    }
  };

  return (
    <div className="reservation-container">
      <h2>Reservar un Espacio de Trabajo</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="reservation-form">
        <label>Nombre del Cliente:</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />

        <label>Tipo de Espacio:</label>
        <select
          value={tipoEspacio}
          onChange={(e) => setTipoEspacio(e.target.value)}
        >
          <option value="oficina">Oficina</option>
          <option value="sala_reunion">Sala de Reunión</option>
        </select>

        <label>Fecha y Hora de Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />
        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          required
        />

        <label>Fecha y Hora de Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
        />
        <input
          type="time"
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
          required
        />

        <button type="submit">Realizar Reserva</button>
      </form>
    </div>
  );
};

export default ReservacionPagina;
