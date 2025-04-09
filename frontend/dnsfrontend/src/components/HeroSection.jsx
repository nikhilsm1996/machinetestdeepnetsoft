import React, { useEffect } from 'react';

function HeroSection() {
  // Adding required fonts
  useEffect(() => {
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap',
      'https://fonts.googleapis.com/css2?family=Kelly+Slab&display=swap'
    ];
    
    const links = fonts.map(font => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = font;
      document.head.appendChild(link);
      return link;
    });
    
    return () => {
      links.forEach(link => document.head.removeChild(link));
    };
  }, []);

  const heroSectionStyle = {
    width: '100%',
    maxWidth: '1440px',
    minHeight: '311px',
    position: 'relative',
    backgroundImage: 'url("/herosectionbackground.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: '50% 10%',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto',
    overflow: 'visible', // Changed from 'hidden' to allow SOFT text to show
    zIndex: 1 // Lower z-index than navbar elements
  };

  const heroOverlayStyle = {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.71) 0%, rgba(0, 0, 0, 0.5) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    position: 'relative',
    zIndex: 2 // Higher than the hero section base but lower than navbar elements
  };

  const menuTitleStyle = {
    display: 'inline-block',
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontSize: '75px',
    lineHeight: '100%',
    letterSpacing: '3%',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textShadow: '4px 3px 0px #800020',
    position: 'relative',
    textAlign: 'center',
    margin: '20px 0'
  };

  const descriptionStyle = {
    width: '100%',
    maxWidth: '700px',
    margin: '20px auto 0',
    padding: '10px',
    fontFamily: 'Kelly Slab',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '1.4',
    textAlign: 'center',
    color: '#BBBBBB'
  };

  // Custom CSS for responsive design
  const customStyle = `
    @media (max-width: 992px) {
      .hero-title {
        font-size: 60px;
      }
      .hero-description {
        font-size: 16px;
      }
    }
    @media (max-width: 768px) {
      .hero-title {
        font-size: 50px;
        text-shadow: 3px 2px 0px #800020;
      }
      .hero-description {
        font-size: 15px;
      }
    }
    @media (max-width: 576px) {
      .hero-title {
        font-size: 40px;
        text-shadow: 2px 1px 0px #800020;
      }
      .hero-description {
        font-size: 14px;
      }
    }
  `;

  return (
    <>
      <style>{customStyle}</style>
      <div style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <div style={menuTitleStyle} className="hero-title">MENU</div>
          <div style={descriptionStyle} className="hero-description">
            Please take a look at our menu featuring food, drinks, and brunch. 
            If you'd like to place an order, use the "Order Online" button located below the menu.
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;