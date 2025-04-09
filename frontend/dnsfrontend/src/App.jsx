import React from 'react';
import AppNavbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Menu from './components/Menu';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <AppNavbar />
      <HeroSection />
      <Menu />
      <Footer />
    </>
  );
}

export default App;
