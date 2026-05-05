import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Practice from './components/Practice';
import Work from './components/Work';
import Press from './components/Press';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Practice />
        <Work />
        <Press />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
