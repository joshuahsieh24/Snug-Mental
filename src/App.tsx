import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { MoodProvider } from './context/MoodContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Landing from './pages/Landing';
import Login from './components/Login';
import MoodCheck from './pages/MoodCheck';
import Calendar from './pages/Calendar';
import Community from './pages/Community';
import Profile from './pages/Profile';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Snuggie from './pages/Snuggie';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <MoodProvider>
            <Router basename="/">
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkin" element={<MoodCheck />} />
                    <Route path="/calendar" element={
                      <PrivateRoute>
                        <Calendar />
                      </PrivateRoute>
                    } />
                    <Route path="/community" element={<Community />} />
                    <Route path="/profile" element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/snuggie" element={<Snuggie />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </MoodProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;