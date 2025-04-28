import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./Pages/Home.jsx";
import NavBar from './Componenets/Navbar/NavBar';
import Footer from "./Componenets/Footer/Footer.jsx";
import SearchPage from './Pages/Search.jsx';
import AboutusPage from './Pages/Aboutus.jsx';
import AdminLogin from "./Pages/AdminLogin.jsx";
import AdminHome from './Pages/AdminHome.jsx';
import AddMovie from "./Pages/AddMovie.jsx";
import TestimonialForm from './Pages/TestimonialForm.jsx';

// Wrapper component to use hooks like useLocation
function AppContent() {
  const location = useLocation();
  
  // Paths where Navbar and Footer should be hidden
  const hiddenPaths = ['/admin', '/adminhome', '/addmovie'];

  const shouldShowNavbar = !hiddenPaths.includes(location.pathname);
  const shouldShowFooter = !hiddenPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/aboutus" element={<AboutusPage />} />

        {/* ------------ ADMIN ---------------- */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/testimonial" element={<TestimonialForm />} />
      </Routes>
      {shouldShowFooter && <Footer />}
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
