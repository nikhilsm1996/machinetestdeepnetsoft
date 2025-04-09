import React from 'react';
import { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Adding responsive CSS with media queries
  const responsiveStyles = `
    @media (max-width: 992px) {
      .footer-content {
        flex-direction: column;
        padding: 20px 15px;
      }
      
      .footer-box {
        width: 80% !important;
        max-width: 400px;
        margin-bottom: 40px !important;
      }
      
      .footer-box:nth-child(2) {
        order: -1;
        margin-bottom: 60px !important;
      }
      
      .bottom-bar {
        flex-direction: column;
        gap: 10px;
      }
    }
    
    @media (max-width: 576px) {
      .footer-box {
        width: 100% !important;
      }
    }
  `;

  const footerContainerStyle = {
    width: '100%',
    backgroundColor: '#000000',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Lato, sans-serif',
    overflow: 'hidden' // Added to prevent any overflow issues
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '40px 20px', // Added horizontal padding
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    position: 'relative'
  };

  const rectangleStyle = {
    width: '100%', // Changed from fixed width
    maxWidth: '373px', // Added max-width instead
    height: '134px',
    borderRadius: '15px',
    border: '1px solid #FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    position: 'relative',
    padding: '10px',
    margin: '0 0 20px 0' // Added bottom margin
  };
  
  const rectangle2Style = {
    ...rectangleStyle,
    paddingTop: '40px',
    position: 'relative'
  };
  
  const logoContainerStyle = {
    position: 'absolute',
    top: '-55px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '110px',
    zIndex: 10
  };
  
  const headingStyle = {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    color: '#0796EF',
    textTransform: 'uppercase'
  };

  const findUsHeadingStyle = {
    ...headingStyle
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    gap: '8px'
  };

  const addressContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    margin: '5px 0',
    gap: '8px',
    maxWidth: '300px'
  };

  const addressTextStyle = {
    fontSize: '14px',
    color: '#FFFFFF',
    lineHeight: '1.4',
    textAlign: 'left'
  };

  const iconStyle = {
    width: '16px',
    height: '16px'
  };

  const locationIconStyle = {
    width: '18px',
    height: '18px',
    marginTop: '2px'
  };

  const contactTextStyle = {
    fontSize: '14px',
    color: '#FFFFFF'
  };

  const bottomBarStyle = {
    width: '100%',
    background: '#857878',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '100%',
    letterSpacing: '0.03em',
    color: '#FFFFFF',
    maxWidth: '1440px'
  };

  const linkContainerStyle = {
    display: 'flex',
    gap: '15px'
  };

  const linkStyle = {
    color: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={footerContainerStyle}>
      <style>{responsiveStyles}</style>
      <div style={footerStyle} className="footer-content">
        {/* Rectangle 1 */}
        <div style={rectangleStyle} className="footer-box">
          <div style={headingStyle}>CONNECT WITH US</div>

          <div style={contactItemStyle}>
            <img src="/bytesize_telephone.png" alt="Telephone" style={iconStyle} />
            <span style={contactTextStyle}>+91 9567843340</span>
          </div>

          <div style={contactItemStyle}>
            <img src="/formkit_email.png" alt="Email" style={iconStyle} />
            <span style={contactTextStyle}>info@deepnetsoft.com</span>
          </div>
        </div>

        {/* Rectangle 2 */}
        <div style={rectangle2Style} className="footer-box">
          <div style={logoContainerStyle}>
            <img src="/dnslogo.png" alt="DNS Logo" style={{ width: '100%', height: 'auto' }} />
          </div>

          <img src="/DEEP NET SOFT.png" alt="Deep Net Soft" style={{ width: '200px', height: 'auto', marginBottom: '10px' }} />
          <img src="/Group 455.svg" alt="Group 455" style={{ width: '180px', height: 'auto' }} />
        </div>

        {/* Rectangle 3 */}
        <div style={rectangleStyle} className="footer-box">
          <div style={findUsHeadingStyle}>FIND US</div>

          <div style={addressContainerStyle}>
            <img src="/streamline_travel-map-location-pin-navigation-map-maps-pin-gps-location.png" alt="Location" style={locationIconStyle} />
            <span style={addressTextStyle}>
              First floor, Geo infopark, Infopark EXPY, Kakkanad
            </span>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div style={bottomBarStyle} className="bottom-bar">
        <div>© 2024 Deepnetsoft Solutions. All rights reserved.</div>
        <div style={linkContainerStyle}>
          <a style={linkStyle} href="#">Terms & Conditions</a>
          <a style={linkStyle} href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;