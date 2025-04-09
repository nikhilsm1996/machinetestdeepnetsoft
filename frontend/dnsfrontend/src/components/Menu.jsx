import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllTabs, setShowAllTabs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // API base URL
  const API_URL = 'https://machinetestdeepnetsoft.onrender.com';

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Fetch all menu categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        console.log('Fetching categories from API...');
        
        const response = await fetch(`${API_URL}/menu`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response not OK:', errorText);
          throw new Error(`Failed to fetch menu categories: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        
        setCategories(data);
        
        // Set first category as active if available
        if (data.length > 0) {
          setActiveTab(data[0]._id);
          setMenuItems(data[0].items);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in fetchCategories:', error);
        setError(`${error.message}. Check console for more details.`);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Adding Oswald font
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Kelly+Slab&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    const selectedCategory = categories.find(cat => cat._id === categoryId);
    if (selectedCategory) {
      setMenuItems(selectedCategory.items);
    }
    // Close dropdown on mobile after selection
    if (isMobile) {
      setShowAllTabs(false);
    }
  };

  // Function to open modal - simplified
  const openAddCategoryModal = () => {
    // Use data attributes approach which is what your NavDropdown is already using
    const modalBtn = document.querySelector('[data-bs-target="#addCategoryModal"]');
    if (modalBtn) {
      modalBtn.click();
    } else {
      console.error('Modal trigger button not found');
      alert('Could not open add category modal. Please use the Menu dropdown instead.');
    }
  };

  const responsiveStyles = `
    .menu-tabs-section {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    
    @media (max-width: 768px) {
      .menu-content {
        padding: 2rem 0 !important;
      }
      
      .menu-container {
        padding: 1rem !important;
        margin: 0 10px !important;
        width: calc(100% - 20px) !important;
      }
      
      .menu-title {
        font-size: 1.5rem !important;
      }
      
      .menu-decoration {
        width: 100px !important;
      }
      
      .menu-tab {
        min-width: 100px !important;
      }
      
      .border-decorations {
        display: none;
      }
      
      .menu-dropdown-btn {
        display: flex !important;
      }
      
      .menu-tabs-container {
        flex-wrap: wrap;
      }
      
      .menu-tabs-hidden {
        display: none !important;
      }
      
      .menu-tabs-visible {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        padding: 10px;
        display: flex !important;
        flex-direction: column;
        align-items: center;
      }
    }
  `;

  const menuTabSectionStyle = {
    width: '100%',
    maxWidth: '1440px',
    height: 'auto',
    minHeight: '79px',
    position: 'relative',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  };

  const backgroundImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/menutabbgimage.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1
  };

  const tabsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '14px',
    position: 'relative',
    zIndex: 2,
    padding: '15px 10px',
    flexWrap: isMobile ? 'wrap' : 'nowrap'
  };

  const dropdownButtonStyle = {
    display: isMobile ? 'flex' : 'none',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 15px',
    backgroundColor: '#0796EF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    zIndex: 3
  };

  const tabStyle = (isActive) => ({
    minWidth: '114.25px',
    height: '49.98px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '0.5px solid #0796EF',
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: isActive ? '#0796EF' : 'transparent',
    transition: 'background-color 0.3s ease',
    margin: isMobile ? '5px 0' : '0'
  });

  const tabTextStyle = (isActive) => ({
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0.48px',
    textTransform: 'uppercase',
    color: isActive ? '#FFFFFF' : '#AAAAAA',
    textShadow: isActive ? '1.3px 0.97px 0px #800020' : 'none',
    transition: 'all 0.3s ease'
  });

  const titleStyle = {
    fontFamily: 'Oswald, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
    boxShadow: '4px 3px 0px 0px #800020',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '0.5rem 2rem',
    fontSize: '2rem',
    display: 'inline-block',
    color: '#fff',
  };

  const nameStyle = {
    fontFamily: 'Oswald, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.05rem',
    color: '#fff',
  };

  const descriptionStyle = {
    fontFamily: 'Kelly Slab, serif',
    opacity: 0.85,
    color: '#eee',
  };

  const errorContainerStyle = {
    color: 'white',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    border: '1px solid red',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '800px',
    textAlign: 'center'
  };

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Loading menu...</div>;
  }

  if (error) {
    return (
      <div style={errorContainerStyle}>
        <h3>Error Loading Menu</h3>
        <p>{error}</p>
        <div style={{ marginTop: '15px', textAlign: 'left', fontSize: '14px' }}>
          <p><strong>Could not load Menu Tabs.</strong></p>
       
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              // Try fetching again with the correct port
              fetch(`${API_URL}/menu`)
                .then(resp => resp.json())
                .then(data => {
                  setCategories(data);
                  if (data.length > 0) {
                    setActiveTab(data[0]._id);
                    setMenuItems(data[0].items);
                  }
                  setLoading(false);
                })
                .catch(err => {
                  console.error('Retry error:', err);
                  setError(`Retry failed: ${err.message}`);
                  setLoading(false);
                });
            }}
            style={{
              backgroundColor: '#0796EF',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Handle case when no categories are available
  if (categories.length === 0) {
    return (
      <div>
        <style>{responsiveStyles}</style>
        <div style={menuTabSectionStyle} className="menu-tabs-section">
          <div style={backgroundImageStyle}></div>
          <div style={overlayStyle}></div>
          <div style={tabsContainerStyle}>
            {/* Add Category Button */}
            <div 
              style={{
                ...tabStyle(false),
                width: '49.98px',
                backgroundColor: '#333',
                fontSize: '24px',
                color: '#AAAAAA'
              }}
              onClick={openAddCategoryModal}
            >
              +
            </div>
          </div>
        </div>
        <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
          <p>No menu categories available. Click the + button to add your first category.</p>
        </div>
      </div>
    );
  }

  // Get active category for display
  const activeCategory = categories.find(cat => cat._id === activeTab);
  const activeCategoryName = activeCategory ? activeCategory.menuName : 'Menu';

  return (
    <>
      <style>{responsiveStyles}</style>
      {/* Menu Tabs Section */}
      <div style={menuTabSectionStyle} className="menu-tabs-section">
        <div style={backgroundImageStyle}></div>
        <div style={overlayStyle}></div>
        
        <div style={{ position: 'relative', width: '100%', padding: '0 10px', zIndex: 2 }}>
          {/* Mobile Dropdown Button */}
          {isMobile && (
            <button 
              style={dropdownButtonStyle}
              className="menu-dropdown-btn"
              onClick={() => setShowAllTabs(!showAllTabs)}
            >
              <span>{activeCategoryName}</span>
              <span>{showAllTabs ? '▲' : '▼'}</span>
            </button>
          )}
          
          <div 
            style={tabsContainerStyle} 
            className={`menu-tabs-container ${isMobile && !showAllTabs ? 'menu-tabs-hidden' : isMobile && showAllTabs ? 'menu-tabs-visible' : ''}`}
          >
            {categories.map((category) => (
              <div
                key={category._id}
                style={tabStyle(activeTab === category._id)}
                className="menu-tab"
                onClick={() => handleTabClick(category._id)}
              >
                <div style={tabTextStyle(activeTab === category._id)}>
                  {category.menuName}
                </div>
              </div>
            ))}
            {/* Add Category Button */}
            <div 
              style={{
                ...tabStyle(false),
                width: '49.98px',
                backgroundColor: '#333',
                fontSize: '24px',
                color: '#AAAAAA'
              }}
              onClick={openAddCategoryModal}
            >
              +
            </div>
          </div>
        </div>
      </div>

      {/* Menu Display Section */}
      {activeTab && (
        <div
          className="d-flex justify-content-center align-items-center position-relative menu-content"
          style={{
            backgroundImage: `linear-gradient(#000000CC, #000000CC), url("/rect116.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem 1rem',
            overflow: 'hidden',
          }}
        >
          {/* Left Frame - only visible on desktop */}
          <img
            src="/frame-left.png"
            alt="Left Frame"
            style={{
              position: 'absolute',
              height: '90%', 
              width: 'auto',
              top: '5%',
              left: '0',
              zIndex: 2,
              pointerEvents: 'none',
              display: isMobile ? 'none' : 'block'
            }}
            className="border-decorations"
          />

          {/* Right Frame - only visible on desktop */}
          <img
            src="/frame-right.png"
            alt="Right Frame"
            style={{
              position: 'absolute',
              height: '90%',
              width: 'auto',
              top: '5%',
              right: '0',
              zIndex: 2,
              pointerEvents: 'none',
              display: isMobile ? 'none' : 'block'
            }}
            className="border-decorations"
          />

          {/* Menu Container */}
          <div
            className="position-relative w-100 menu-container"
            style={{
              maxWidth: '900px',
              minHeight: '416px',
              padding: '2rem',
              border: '1px solid #FFFFFF',
              position: 'relative',
              zIndex: 3,
            }}
          >
            <img
              src="/cocktailleft.png"
              alt="Top Left Decoration"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'translate(-30%, -60%)',
                width: isMobile ? '100px' : '150px',
                height: 'auto',
                zIndex: 1,
                pointerEvents: 'none',
              }}
              className="menu-decoration"
            />

            {/* Bottom-right Decoration Image (inside menu box) */}
            <img
              src="/cocktailright.png"
              alt="Bottom Right Decoration"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(30%, 30%)',
                width: isMobile ? '100px' : '150px',
                height: 'auto',
                zIndex: 1,
                pointerEvents: 'none',
              }}
              className="menu-decoration"
            />
            
            {/* Title - Using the active category name */}
            <div className="text-center mb-4">
              <div className="d-flex align-items-center justify-content-center flex-wrap">
                <hr className="me-3" style={{ width: '60px', borderTop: '2px solid #fff', opacity: 0.8 }} />
                <span style={titleStyle} className="menu-title">{activeCategory?.menuName || 'MENU'}</span>
                <hr className="ms-3" style={{ width: '60px', borderTop: '2px solid #fff', opacity: 0.8 }} />
              </div>
            </div>

            {/* Menu Items - Using data from API */}
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <div key={item._id || index} className="col-12 col-md-6 mb-2">
                    <div className="d-flex justify-content-between px-2 py-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                      <span className="fs-6 fw-bold" style={nameStyle}>
                        {item.itemName}{"...".padEnd(Math.max(5, 20 - item.itemName.length), ".")}
                      </span>
                      <span className="fs-6" style={nameStyle}>${item.price}</span>
                    </div>
                    <div className="p-2 fs-6" style={descriptionStyle}>
                      {item.itemDescription}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center" style={descriptionStyle}>
                  <p>No items in this category yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;