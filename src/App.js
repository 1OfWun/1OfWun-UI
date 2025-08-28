import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CategoryIcons from './components/CategoryIcons/CategoryIcons';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Shop from './components/Shop/Shop';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Gear from './components/Gear/Gear';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Routes>
          <Route path="/" element={
            <>
            <Hero />
            <CategoryIcons />
            </>
          } />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gear" element={<Gear />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
