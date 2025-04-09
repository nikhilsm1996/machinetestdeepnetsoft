import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: String,
  price: { type: Number, required: true }
});

const menuCategorySchema = new mongoose.Schema({
  menuName: { type: String, required: true, unique: true },
  menuDescription: String,
  items: [itemSchema]
});

export default mongoose.model('MenuCategory', menuCategorySchema);
