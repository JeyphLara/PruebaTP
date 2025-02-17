import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistroMedico from "./components/RegistroMedico";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import MedicoDashboard from "./pages/MedicoDashboard";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroMedico />} />
          <Route path="/admindashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/medicodashboard" element={<PrivateRoute><MedicoDashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
