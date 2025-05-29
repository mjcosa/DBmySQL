import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./scenes/AuthPage";
import UserDashboard from "./scenes/UserDash";
import ProtectedRoute from "./states/authRoute";
import { AuthProvider } from "./states/auth";
import HomePage from "./scenes/HomePage";
import PatientsPage from "./scenes/components/PatientsPage";
import MidwivesPage from "./scenes/components/MidwivesPage";
import AddPatientForm from "./scenes/components/AddPatient";
import AppointmentsPage from "./scenes/components/AppointmentsPage";
import PatientProfile from "./scenes/components/PatientProfile";
import AppointmentProfile from "./scenes/components/AppointmentProfile";
import MidwivesProfile from "./scenes/components/MidwivesProfile";
import AddAppointmentForm from "./scenes/components/AddAppointmentPage";
import EditAppointmentForm from "./scenes/components/EditAppointment";
import UpdatePatientForm from "./scenes/components/editPatient";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <HomePage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/patients"
            element={
              <ProtectedRoute requiredRole="admin">
                <PatientsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/patient/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <PatientProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit/patient/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <UpdatePatientForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/addPatient"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddPatientForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/appointments"
            element={
              <ProtectedRoute requiredRole="admin">
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/appointment/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <AppointmentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/appointment/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <EditAppointmentForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/midwives"
            element={
              <ProtectedRoute requiredRole="admin">
                <MidwivesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/midwives/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <MidwivesProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/appointments"
            element={
              <ProtectedRoute requiredRole="user">
                <AddAppointmentForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/view/profile/:id"
            element={
              <ProtectedRoute requiredRole="user">
                <PatientProfile />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;