import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MenuModal from './MenuModal'; // Ensure this path is correct

function AppNavbar() {
  const [activeLink, setActiveLink] = useState('Menu');
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: '#121618',
    width: '100%',
    maxWidth: '1440px',
    height: isMobile ? '60px' : '100px',
    margin: '0 auto',
    padding: '0',
    position: 'relative',
    zIndex: 5
  };

  const brandTextStyle = {
    position: 'absolute',
    width: '154px',
    height: '52px',
    top: '10px',
    left: '270px',
    fontFamily: 'Oswald',
    fontWeight: 400,
    fontSize: '35px',
    lineHeight: '100%',
    letterSpacing: '1.05px',
    textTransform: 'uppercase'
  };

  const softTextStyle = {
    position: 'absolute',
    width: '124px',
    top: '52px',
    left: '270px',
    fontFamily: 'Oswald',
    fontWeight: 300,
    fontSize: '35px',
    lineHeight: '100%',
    letterSpacing: '1.05px',
    color: '#857878',
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 20
  };

  const logoStyle = {
    position: 'absolute',
    width: '86px',
    height: '76px',
    left: '168px',
    bottom: '-38px',
    zIndex: 15
  };

  const navLinkStyle = (isActive) => ({
    fontFamily: 'Oswald',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0.48px',
    color: isActive ? '#0796EF' : '#F5F5F5',
    textTransform: 'uppercase',
    padding: '12px 15px'
  });

  const togglerStyle = {
    marginRight: '15px',
    border: '1px solid #F5F5F5'
  };

  const customStyle = `
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.75)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
    
    /* Desktop and tablet styles */
    @media (min-width: 768px) {
      .desktop-view {
        display: block;
      }
      .mobile-view {
        display: none;
      }
      
      @media (max-width: 992px) {
        .brand-text, .soft-text {
          font-size: 28px;
        }
        .soft-text {
          left: 200px;
        }
        .navbar-logo {
          width: 70px;
          height: auto;
          left: 100px;
        }
      }
    }
    
    /* Mobile-specific styles */
    @media (max-width: 767.98px) {
      .desktop-view {
        display: none;
      }
      .mobile-view {
        display: block;
      }
      .mobile-logo {
        position: absolute;
        width: 60px;
        height: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .navbar-toggler {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        z-index: 1000 !important;
        padding: 4px 8px;
      }
      .navbar-collapse {
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background-color: #121618;
        padding: 10px;
        z-index: 999;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{customStyle}</style>
      <Navbar expand="lg" style={navbarStyle} className="py-2" expanded={expanded} onToggle={setExpanded}>
        {/* Desktop View - Exactly as in the original */}
        <div className="desktop-view">
          <div style={{ position: 'relative' }}>
            <div className="brand-text" style={brandTextStyle}>
              <span style={{ color: '#0796EF' }}>DEEP</span>{' '}
              <span style={{ color: '#F5F5F5' }}>NET</span>
            </div>
            <div className="soft-text" style={softTextStyle}>SOFT</div>
          </div>

          <img src="/dnslogo.png" alt="DNS Logo" style={logoStyle} className="navbar-logo" />
        </div>
        
        {/* Mobile View - Logo Centered, No Text */}
        <div className="mobile-view">
          <img src="/dnslogo.png" alt="DNS Logo" className="mobile-logo" />
        </div>
        
        <Container>
          <Navbar.Toggle 
            aria-controls="main-navbar" 
            className="ms-auto" 
            style={togglerStyle}
            onClick={() => setExpanded(!expanded)}
          />
          
          <Navbar.Collapse id="main-navbar" className="justify-content-end">
            <Nav>
              <Nav.Link
                href="#"
                style={navLinkStyle(activeLink === 'Home')}
                onClick={() => {
                  setActiveLink('Home');
                  setExpanded(false);
                }}
              >
                Home
              </Nav.Link>

              <NavDropdown
                title={<span style={navLinkStyle(activeLink === 'Menu')}>Menu</span>}
                id="menu-dropdown"
                onClick={() => {
                  setActiveLink('Menu');
                  setExpanded(false);
                }}
              >
                <NavDropdown.Item
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addCategoryModal"
                >
                  Add Menu Category
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                href="#"
                style={navLinkStyle(activeLink === 'Reservation')}
                onClick={() => {
                  setActiveLink('Reservation');
                  setExpanded(false);
                }}
              >
                Make a Reservation
              </Nav.Link>
              <Nav.Link
                href="#"
                style={navLinkStyle(activeLink === 'Contact')}
                onClick={() => {
                  setActiveLink('Contact');
                  setExpanded(false);
                }}
              >
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Include the actual modal here */}
      <MenuModal onCategoryAdded={() => {
        // Simple reload to refresh the data
        window.location.reload();
      }} />
    </>
  );
}

export default AppNavbar;