import React, { useState, useEffect } from 'react';
import MenuTabSection from './MenuTabSection';
import MenuModal from './MenuModal';

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API base URL - correct port
  const API_URL = 'https://machinetestdeepnetsoft.onrender.com';

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/menu`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu categories');
      }
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Callback function for when a new category is added
  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="menu-page">
      <MenuTabSection />
      <MenuModal onCategoryAdded={handleCategoryAdded} />
      
      {/* Add a button to trigger the modal */}
      <div className="text-center mt-4 mb-4">
        <button 
          className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#addCategoryModal"
        >
          Add New Menu Category
        </button>
      </div>
      
      {error && (
        <div className="alert alert-danger mx-auto my-3" style={{ maxWidth: "800px" }}>
          Error: {error}. Make sure your backend server is running on port 5000.
        </div>
      )}
    </div>
  );
}

export default MenuPage;