import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CredibilityBar from './components/CredibilityBar';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Press from './components/Press';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-oasisDeep">
      <Navigation />
      <main>
        <Hero />
        <CredibilityBar />
        <About />
        <Services />
        <Work />
        <Press />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
