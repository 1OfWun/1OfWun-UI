import './App.css';
import CategoryIcons from './components/CategoryIcons/CategoryIcons';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <CategoryIcons />
      <Footer />
    </div>
  );
}

export default App;
