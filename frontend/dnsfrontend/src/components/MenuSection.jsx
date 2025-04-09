// src/components/MenuSection.jsx
import React from 'react';
// import AddItemModal from './AddItemModal';

const MenuSection = ({ menu, menus, setMenus }) => {
  return (
    <div>
      <h4>{menu.title}</h4>
      <ul className="list-group mb-3">
        {menu.items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </li>
        ))}
      </ul>
      <AddItemModal menuId={menu.id} menus={menus} setMenus={setMenus} />
    </div>
  );
};

export default MenuSection;
