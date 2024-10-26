import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./components/contexts/authContext/index"; // Asegúrate de que AuthProvider esté correctamente configurado

// Importación de las páginas y componentes
import Home from "./pages/Home";
import Login from "./components/auth/login/index";
import Register from "./components/auth/register/index";
import Navbar from "./components/contexts/authContext/index";
import Footer from "./components/contexts/authContext/index";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar visible en todas las rutas */}
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* Footer visible en todas las rutas */}
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
