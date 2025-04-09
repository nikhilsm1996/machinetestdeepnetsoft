import express from 'express';
import MenuCategory from '../models/MenuModel.js';

const router = express.Router();

// 1. Create a new menu categoryc& create items
router.post('/', async (req, res) => {
    try {
        console.log("heyyyyy")
      const { menuName, menuDescription, items } = req.body;
  
      const newCategory = new MenuCategory({
        menuName,
        menuDescription,
        items: items || [], // Use provided items or default to []
      });
  
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// 2. Get all menu categories with items
router.get('/', async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Add an item to a specific category
router.post('/:menuId/items', async (req, res) => {
  try {
    const { itemName, itemDescription, price } = req.body;
    const category = await MenuCategory.findById(req.params.menuId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.items.push({ itemName, itemDescription, price });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Update an item inside a category
router.put('/:menuId/items/:itemId', async (req, res) => {
  try {
    const { itemName, itemDescription, price } = req.body;
    const category = await MenuCategory.findById(req.params.menuId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const item = category.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.itemName = itemName ?? item.itemName;
    item.itemDescription = itemDescription ?? item.itemDescription;
    item.price = price ?? item.price;

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. Delete an item from a category
router.delete('/:menuId/items/:itemId', async (req, res) => {
  try {
    const category = await MenuCategory.findById(req.params.menuId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.items.id(req.params.itemId).remove();
    await category.save();
    res.json({ message: 'Item deleted', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 6. Delete a menu category and all its items
router.delete('/:menuId', async (req, res) => {
    try {
      const deletedCategory = await MenuCategory.findByIdAndDelete(req.params.menuId);
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Menu category not found' });
      }
      res.json({ message: 'Menu category deleted successfully', deletedCategory });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
export default router;
