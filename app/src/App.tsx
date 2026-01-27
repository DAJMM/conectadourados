import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CategoryFilterProvider } from './contexts/CategoryFilterContext';
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
import Professionals from './pages/Professionals';
import Testimonials from './pages/Testimonials';
import DigitalCard from './pages/DigitalCard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminSubscriptions from './pages/admin/Subscriptions';
import AdminProfessionals from './pages/admin/Professionals';
import AdminCustomers from './pages/admin/Customers';
import AdminAdApprovals from './pages/admin/AdApprovals';
import MeusAnunciosPage from './pages/MeusAnunciosPage';
import AnuncioSuccess from './pages/AnuncioSuccess';
import AreaDoCliente from './pages/AreaDoCliente';
import MeuPerfil from './pages/MeuPerfil';
import Mensagens from './pages/Mensagens';
import Avaliacoes from './pages/Avaliacoes';
import Notificacoes from './pages/Notificacoes';
import Configuracoes from './pages/Configuracoes';

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
      <CategoryFilterProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/advertise" element={<Advertise />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/success" element={<RegisterSuccess />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/profissionais" element={<Professionals />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/profile/:id" element={<ProfessionalProfile />} />
              <Route path="/profile" element={<ProfessionalProfile />} />
              <Route path="/anuncio-success" element={<AnuncioSuccess />} />
            </Route>

            {/* User/Ad Routes - Protected */}
            <Route path="/meus-anuncios" element={
              <ProtectedRoute requiredRole="user">
                <>
                  <Header />
                  <MeusAnunciosPage />
                  <Footer />
                </>
              </ProtectedRoute>
            } />

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

            {/* User Profile Routes - Protected */}
            <Route path="/meu-perfil" element={
              <ProtectedRoute requiredRole="user">
                <>
                  <Header />
                  <MeuPerfil />
                  <Footer />
                </>
              </ProtectedRoute>
            } />

            <Route path="/mensagens" element={
              <ProtectedRoute requiredRole="user">
                <>
                  <Header />
                  <Mensagens />
                  <Footer />
                </>
              </ProtectedRoute>
            } />

            <Route path="/avaliacoes" element={
              <ProtectedRoute requiredRole="user">
                <>
                  <Header />
                  <Avaliacoes />
                  <Footer />
                </>
              </ProtectedRoute>
            } />

            <Route path="/notificacoes" element={
              <ProtectedRoute requiredRole="user">
                <>
                  <Header />
                  <Notificacoes />
                  <Footer />
                </>
              </ProtectedRoute>
            } />

            <Route path="/configuracoes" element={
              <ProtectedRoute requiredRole="user">
                <>
                  <Header />
                  <Configuracoes />
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
              <Route path="approvals" element={<AdminAdApprovals />} />
              <Route path="settings" element={<div className="font-bold text-2xl">Configurações (Em breve)</div>} />
            </Route>

            {/* Fallback route for 404 */}
            <Route path="*" element={<LinkWrapperNotFound />} />
          </Routes>
        </BrowserRouter>
      </CategoryFilterProvider>
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
