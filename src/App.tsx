import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { MoodProvider } from './context/MoodContext';

// Layouts
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import MoodCheck from './pages/MoodCheck';
import Calendar from './pages/Calendar';
import Community from './pages/Community';
import Profile from './pages/Profile';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Snuggie from './pages/Snuggie';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MoodProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkin" element={<MoodCheck />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/snuggie" element={<Snuggie />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </MoodProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;