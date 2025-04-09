// seed.js
import MenuCategory from './models/MenuModel.js';

export const seedDatabase = async () => {
  const existing = await MenuCategory.find();
  if (existing.length > 0) return; // Already seeded

  const seedData = [
    {
      menuName: 'Food',
      menuDescription: 'Tasty bites, mains, and sides to satisfy your hunger.',
      items: [
        {
          itemName: 'Cheeseburger',
          itemDescription: 'Juicy beef patty with cheese, lettuce, tomato, and sauce',
          price: 9.99
        },
        {
          itemName: 'Veggie Wrap',
          itemDescription: 'Grilled veggies and hummus in a whole wheat wrap',
          price: 7.49
        }
      ]
    },
    {
      menuName: 'Drinks',
      menuDescription: '',
      items: [
        {
          itemName: 'CINNAMON TOAST CRUNCH..........................',
          itemDescription: 'Skrewball peanut butter whiskey, vanilla extract, Amaretto, Baileys, egg white, cinnamon',
          price: 16
        },
        {
          itemName: 'MOET SPRITZ..................................................',
          itemDescription: 'Aperol, St Germain, botanical liquor, fresh lime juice, mini brut Moet topper',
          price: 20
        },
        {
            itemName: 'BAR 42 MARY..................................................',
            itemDescription: 'Titos, tomato juice, worcestershire, celery salt, black pepper, tabasco, fully loaded',
            price: 14
          }
      ]
    },
    {
      menuName: 'Brunch',
      menuDescription: 'Late morning delights for your weekend cravings.',
      items: [
        {
          itemName: 'Avocado Toast',
          itemDescription: 'Sourdough topped with smashed avocado and poached egg',
          price: 8.5
        },
        {
          itemName: 'Pancake Stack',
          itemDescription: 'Fluffy pancakes with maple syrup and berries',
          price: 7.99
        }
      ]
    }
  ];

  await MenuCategory.insertMany(seedData);
  console.log('✅ Database seeded with default categories: Food, Drinks, Brunch');
};
