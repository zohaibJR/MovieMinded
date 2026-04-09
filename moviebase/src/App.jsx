// moviebase/src/App.jsx

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Pages/Home.jsx';
import NavBar from './Componenets/Navbar/NavBar';
import Footer from './Componenets/Footer/Footer.jsx';
import SearchPage from './Pages/Search.jsx';
import AboutusPage from './Pages/Aboutus.jsx';
import AdminLogin from './Pages/AdminLogin.jsx';
import AdminHome from './Pages/AdminHome.jsx';
import AddMovie from './Pages/AddMovie.jsx';
import TestimonialForm from './Pages/TestimonialForm.jsx';
import ProtectedRoute from './Componenets/ProtectedRoute/ProtectedRoute.jsx';

// Paths where Navbar/Footer are hidden
const HIDDEN_PATH_PREFIXES = ['/admin', '/adminhome', '/addmovie', '/editmovie'];

function AppContent() {
  const location = useLocation();
  const hideChrome = HIDDEN_PATH_PREFIXES.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {!hideChrome && <NavBar />}

      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/search"     element={<SearchPage />} />
        <Route path="/aboutus"    element={<AboutusPage />} />
        <Route path="/testimonial" element={<TestimonialForm />} />

        {/* Admin (public) */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin (protected) */}
        <Route
          path="/adminhome"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addmovie"
          element={
            <ProtectedRoute>
              <AddMovie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editmovie/:id"
          element={
            <ProtectedRoute>
              <AddMovie />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideChrome && <Footer />}
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
