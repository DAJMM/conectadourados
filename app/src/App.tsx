import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfessionalProfile from './pages/ProfessionalProfile';
import Advertise from './pages/Advertise';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Testimonials from './pages/Testimonials';
import DigitalCard from './pages/DigitalCard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminSubscriptions from './pages/admin/Subscriptions';
import AdminProfessionals from './pages/admin/Professionals';
import AdminCustomers from './pages/admin/Customers';
import MeusAnunciosPage from './pages/MeusAnunciosPage';
import AnuncioSuccess from './pages/AnuncioSuccess';
import AreaDoCliente from './pages/AreaDoCliente';

// Layout wrapper for public pages to include Header/Footer
function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<RegisterSuccess />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/profile/:id" element={<ProfessionalProfile />} />
            <Route path="/profile" element={<ProfessionalProfile />} />
            <Route path="/meus-anuncios" element={<MeusAnunciosPage />} />
            <Route path="/anuncio-success" element={<AnuncioSuccess />} />
          </Route>

          {/* Client Area Route - Protected (User Only) */}
          <Route path="/area-do-cliente" element={
            <ProtectedRoute requiredRole="user">
              <>
                <Header />
                <AreaDoCliente />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          {/* Standalone Route (No Header/Footer) */}
          <Route path="/card/:id" element={<DigitalCard />} />

          {/* Admin Routes - Protected (Admin Only) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <Outlet />
                </AdminLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
            {/* Placeholders for other admin links */}
            <Route path="professionals" element={<AdminProfessionals />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="settings" element={<div className="font-bold text-2xl">Configurações (Em breve)</div>} />
          </Route>

          {/* Fallback route for 404 */}
          <Route path="*" element={<LinkWrapperNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

// Wrapper to include header/footer only for 404 page if it falls through
// Actually, better to include 404 inside public layout or standalone. 
// Let's reuse PublicLayout for 404 to keep consistency.
function LinkWrapperNotFound() {
  return (
    <>
      <Header />
      <NotFound />
      <Footer />
    </>
  )
}

export default App
