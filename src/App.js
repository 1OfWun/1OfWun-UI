import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<><Hero /><CategoryIcons /><Featured /></>} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
