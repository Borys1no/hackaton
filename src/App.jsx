import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./services/AuthProvider"; // Asegúrate de que AuthProvider esté correctamente configurado
import WithNavbarFooter from "./components/WithNavbarFooter"; // Un componente para envolver rutas con Navbar y Footer
import ProtectedRoute from "./components/ProtectedRoute"; // Componente para proteger rutas

// Importación de las páginas y componentes
import Home from "./pages/Home";
import Login from "./components/auth/login/index";
import Register from "./components/auth/register/index";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas con Navbar y Footer */}
          <Route element={<WithNavbarFooter />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Ejemplo de una ruta protegida */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
