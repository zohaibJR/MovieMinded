import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./Pages/Home.jsx";
import NavBar from './Componenets/Navbar/NavBar';
import SearchPage from './Pages/Search.jsx';
import AboutusPage from './Pages/Aboutus.jsx';
import AdminLogin from "./Pages/AdminLogin.jsx"
import AdminHome from './Pages/AdminHome.jsx';
import AddMovie from "./Pages/AddMovie.jsx"

// Wrapper component to use hooks like useLocation
function AppContent() {
  const location = useLocation();
  const hideNavbarOnPaths = ['/admin', '/adminhome', '/addmovie']; // Add paths where you want to hide the navbar
  const shouldShowNavbar = !hideNavbarOnPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/aboutus" element={<AboutusPage />} />

        {/* ------------ ADMIN ---------------- */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome/>} />
        <Route path="/addmovie" element={<AddMovie/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
