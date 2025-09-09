import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CategoryIcons from './components/CategoryIcons/CategoryIcons';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Shop from './components/Shop/Shop';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Gear from './components/Gear/Gear';
import Featured from './components/Featured/Featured';
import Account from './components/Account/Account';
import Cart from './components/Cart/Cart';
import { AppProvider, AppContext } from './context/AppContext';
import Dashboard from './Dashboard/Dashboard';
import AdminLogin from './pages/AdminLogin';
import { useContext } from 'react';

// Layout wrapper
function Layout({ children }) {
  const location = useLocation();
  const noLayoutRoutes = ["/dashboard", "/admin-login"]; // hide header/footer
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

// ✅ Protected route wrapper
function AdminRoute({ children }) {
  const { user } = useContext(AppContext);
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }
  if (!user.is_admin) {
    return <Navigate to="/" replace />; // deny normal users
  }
  return children;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<><Hero /><CategoryIcons /><Featured /></>} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />

            {/* ✅ Admin routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
