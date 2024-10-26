// src/components/Reservaciones.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Asegúrate de tener el archivo de configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

function Reservaciones() {
    // Estados para almacenar las reservas y el formulario de reserva
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        spaceId: '',
        clientId: '',
        startDateTime: '',
        endDateTime: '',
        status: 'active',
    });

    // Cargar reservas al montar el componente
    useEffect(() => {
        fetchReservations();
    }, []);

    // Obtener todas las reservas de Firebase
    async function fetchReservations() {
        const querySnapshot = await getDocs(collection(db, 'reservations'));
        const reservationsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setReservations(reservationsList);
    }

    // Crear nueva reserva
    async function createReservation() {
        try {
            // Verificar disponibilidad antes de crear reserva
            const isAvailable = await checkAvailability(newReservation.spaceId, newReservation.startDateTime, newReservation.endDateTime);
            if (!isAvailable) {
                alert('El espacio no está disponible en el horario seleccionado.');
                return;
            }

            const docRef = await addDoc(collection(db, 'reservations'), newReservation);
            alert('Reserva creada exitosamente');
            fetchReservations(); // Recargar reservas
        } catch (error) {
            console.error('Error al crear la reserva:', error);
        }
    }

    // Actualizar una reserva
    async function updateReservation(id, updatedData) {
        const reservationRef = doc(db, 'reservations', id);
        await updateDoc(reservationRef, updatedData);
        alert('Reserva actualizada');
        fetchReservations(); // Recargar reservas
    }

    // Eliminar una reserva
    async function deleteReservation(id) {
        const reservationRef = doc(db, 'reservations', id);
        await deleteDoc(reservationRef);
        alert('Reserva eliminada');
        fetchReservations(); // Recargar reservas
    }

    // Comprobar disponibilidad del espacio
    async function checkAvailability(spaceId, startDateTime, endDateTime) {
        const reservationsQuery = query(
            collection(db, 'reservations'),
            where('spaceId', '==', spaceId),
            where('status', '==', 'active')
        );
        const querySnapshot = await getDocs(reservationsQuery);

        // Filtrar las reservas que se superponen
        const overlapping = querySnapshot.docs.some(doc => {
            const reservation = doc.data();
            return (
                (reservation.startDateTime <= endDateTime && reservation.startDateTime >= startDateTime) ||
                (reservation.endDateTime >= startDateTime && reservation.endDateTime <= endDateTime)
            );
        });
        return !overlapping;
    }

    // Manejar los cambios en el formulario de reserva
    function handleInputChange(e) {
        const { name, value } = e.target;
        setNewReservation(prevState => ({ ...prevState, [name]: value }));
    }

    // Renderizado del formulario y de la lista de reservas
    return (
        <div style={styles.container}>
            <h2>Reservaciones</h2>

            <div style={styles.formContainer}>
                <h3>Crear Nueva Reserva</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createReservation();
                    }}
                >
                    <input
                        type="text"
                        name="spaceId"
                        placeholder="ID del Espacio"
                        value={newReservation.spaceId}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="clientId"
                        placeholder="ID del Cliente"
                        value={newReservation.clientId}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="startDateTime"
                        value={newReservation.startDateTime}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="endDateTime"
                        value={newReservation.endDateTime}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Crear Reserva</button>
                </form>
            </div>

            <div style={styles.reservationsList}>
                <h3>Reservas Activas</h3>
                <ul>
                    {reservations.map(reservation => (
                        <li key={reservation.id} style={styles.reservationItem}>
                            <p>Espacio ID: {reservation.spaceId}</p>
                            <p>Cliente ID: {reservation.clientId}</p>
                            <p>Fecha de Inicio: {reservation.startDateTime}</p>
                            <p>Fecha de Fin: {reservation.endDateTime}</p>
                            <button onClick={() => updateReservation(reservation.id, { status: 'canceled' })}>Cancelar</button>
                            <button onClick={() => deleteReservation(reservation.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '1rem 2rem',
    },
    formContainer: {
        marginBottom: '2rem',
    },
    reservationsList: {
        marginTop: '1rem',
    },
    reservationItem: {
        borderBottom: '1px solid #ccc',
        padding: '1rem 0',
    },
};

export default Reservaciones;
