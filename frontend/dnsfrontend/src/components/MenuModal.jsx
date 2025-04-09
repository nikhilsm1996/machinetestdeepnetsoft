import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const MenuModal = ({ onCategoryAdded }) => {
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [items, setItems] = useState([
    { itemName: '', itemDescription: '', price: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API base URL - correct port
  const API_URL = 'http://localhost:5000';

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { itemName: '', itemDescription: '', price: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const payload = {
      menuName,
      menuDescription,
      items,
    };
  
    try {
      console.log('Sending data to API:', payload);
      
      const response = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      console.log('Response status:', response.status);
  
      if (response.ok) {
        const newCategory = await response.json();
        console.log('API response:', newCategory);
        
        // Call the callback function to update the parent component
        if (onCategoryAdded) {
          onCategoryAdded(newCategory);
        }
        
        // Reset form
        setMenuName('');
        setMenuDescription('');
        setItems([{ itemName: '', itemDescription: '', price: '' }]);
        
        // Simple way to close the modal
        document.querySelector('[data-bs-dismiss="modal"]').click();
        
        alert('Menu category added successfully!');}
         else {
        const errorText = await response.text();
        console.error('API error:', errorText);
        setError(`Failed to add menu category: ${response.status} ${response.statusText}`);
        alert('Failed to add menu category. See console for details.');
      }
    } catch (error) {
      console.error('Request error:', error);
      setError(`Error adding menu category: ${error.message}`);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      className="modal fade"
      id="addCategoryModal"
      tabIndex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header border-0">
            <h5 className="modal-title" id="addCategoryModalLabel">Add Menu Category</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {error && (
            <div className="alert alert-danger mx-3 mt-2">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category Description</label>
                <textarea
                  className="form-control bg-secondary text-white"
                  rows="2"
                  value={menuDescription}
                  onChange={(e) => setMenuDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <hr className="border-light" />
              <h6>Add Items</h6>

              {items.map((item, index) => (
                <div className="item-group mb-3" key={index}>
                  <input
                    type="text"
                    className="form-control mb-2 bg-secondary text-white"
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                    required
                  />
                  <textarea
                    className="form-control mb-2 bg-secondary text-white"
                    placeholder="Item Description"
                    rows="2"
                    value={item.itemDescription}
                    onChange={(e) => handleItemChange(index, 'itemDescription', e.target.value)}
                    required
                  ></textarea>
                  <input
                    type="number"
                    className="form-control bg-secondary text-white"
                    placeholder="Item Price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    required
                  />
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-light mb-3"
                onClick={addItem}
              >
                + Add Another Item
              </button>
            </div>
            <div className="modal-footer border-0">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;