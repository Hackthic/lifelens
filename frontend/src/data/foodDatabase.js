// Common food items database with calories per 100g
export const foodDatabase = [
    // Breakfast items
    { id: 1, name: 'Paratha (Plain)', category: 'breakfast', caloriesPer100g: 320, unit: 'piece', defaultQty: 1 },
    { id: 2, name: 'Idli', category: 'breakfast', caloriesPer100g: 58, unit: 'piece', defaultQty: 2 },
    { id: 3, name: 'Dosa (Plain)', category: 'breakfast', caloriesPer100g: 168, unit: 'piece', defaultQty: 1 },
    { id: 4, name: 'Poha', category: 'breakfast', caloriesPer100g: 110, unit: 'g', defaultQty: 100 },
    { id: 5, name: 'Upma', category: 'breakfast', caloriesPer100g: 95, unit: 'g', defaultQty: 100 },
    { id: 6, name: 'Bread Toast', category: 'breakfast', caloriesPer100g: 264, unit: 'slice', defaultQty: 2 },
    { id: 7, name: 'Omelette', category: 'breakfast', caloriesPer100g: 154, unit: 'piece', defaultQty: 1 },
    { id: 8, name: 'Oats', category: 'breakfast', caloriesPer100g: 68, unit: 'g', defaultQty: 50 },
    { id: 9, name: 'Cornflakes', category: 'breakfast', caloriesPer100g: 357, unit: 'g', defaultQty: 30 },
    { id: 10, name: 'Banana', category: 'breakfast', caloriesPer100g: 89, unit: 'piece', defaultQty: 1 },

    // Rice & Grains
    { id: 11, name: 'White Rice', category: 'lunch', caloriesPer100g: 130, unit: 'g', defaultQty: 150 },
    { id: 12, name: 'Brown Rice', category: 'lunch', caloriesPer100g: 112, unit: 'g', defaultQty: 150 },
    { id: 13, name: 'Roti (Wheat)', category: 'lunch', caloriesPer100g: 297, unit: 'piece', defaultQty: 2 },
    { id: 14, name: 'Chapati', category: 'lunch', caloriesPer100g: 297, unit: 'piece', defaultQty: 2 },
    { id: 15, name: 'Naan', category: 'lunch', caloriesPer100g: 262, unit: 'piece', defaultQty: 1 },

    // Curries & Gravies
    { id: 16, name: 'Dal (Lentils)', category: 'lunch', caloriesPer100g: 93, unit: 'g', defaultQty: 150 },
    { id: 17, name: 'Paneer Curry', category: 'lunch', caloriesPer100g: 265, unit: 'g', defaultQty: 150 },
    { id: 18, name: 'Chicken Curry', category: 'lunch', caloriesPer100g: 180, unit: 'g', defaultQty: 150 },
    { id: 19, name: 'Mutton Curry', category: 'lunch', caloriesPer100g: 217, unit: 'g', defaultQty: 150 },
    { id: 20, name: 'Fish Curry', category: 'lunch', caloriesPer100g: 130, unit: 'g', defaultQty: 150 },
    { id: 21, name: 'Chole (Chickpeas)', category: 'lunch', caloriesPer100g: 164, unit: 'g', defaultQty: 150 },
    { id: 22, name: 'Rajma (Kidney Beans)', category: 'lunch', caloriesPer100g: 127, unit: 'g', defaultQty: 150 },
    { id: 23, name: 'Mixed Vegetables', category: 'lunch', caloriesPer100g: 65, unit: 'g', defaultQty: 150 },

    // Snacks
    { id: 24, name: 'Samosa', category: 'snack', caloriesPer100g: 252, unit: 'piece', defaultQty: 1 },
    { id: 25, name: 'Pakora', category: 'snack', caloriesPer100g: 250, unit: 'piece', defaultQty: 3 },
    { id: 26, name: 'Vada Pav', category: 'snack', caloriesPer100g: 286, unit: 'piece', defaultQty: 1 },
    { id: 27, name: 'Chips (Potato)', category: 'snack', caloriesPer100g: 536, unit: 'g', defaultQty: 30 },
    { id: 28, name: 'Biscuits', category: 'snack', caloriesPer100g: 450, unit: 'piece', defaultQty: 4 },
    { id: 29, name: 'Namkeen', category: 'snack', caloriesPer100g: 520, unit: 'g', defaultQty: 30 },
    { id: 30, name: 'Fruit Salad', category: 'snack', caloriesPer100g: 47, unit: 'g', defaultQty: 150 },
    { id: 31, name: 'Nuts Mix', category: 'snack', caloriesPer100g: 607, unit: 'g', defaultQty: 30 },
    { id: 32, name: 'Sandwich', category: 'snack', caloriesPer100g: 265, unit: 'piece', defaultQty: 1 },

    // Dinner
    { id: 33, name: 'Biryani', category: 'dinner', caloriesPer100g: 200, unit: 'g', defaultQty: 200 },
    { id: 34, name: 'Khichdi', category: 'dinner', caloriesPer100g: 120, unit: 'g', defaultQty: 200 },
    { id: 35, name: 'Pulao', category: 'dinner', caloriesPer100g: 150, unit: 'g', defaultQty: 200 },
    { id: 36, name: 'Fried Rice', category: 'dinner', caloriesPer100g: 163, unit: 'g', defaultQty: 200 },
    { id: 37, name: 'Pasta', category: 'dinner', caloriesPer100g: 131, unit: 'g', defaultQty: 150 },
    { id: 38, name: 'Pizza', category: 'dinner', caloriesPer100g: 266, unit: 'slice', defaultQty: 2 },
    { id: 39, name: 'Burger', category: 'dinner', caloriesPer100g: 295, unit: 'piece', defaultQty: 1 },
    { id: 40, name: 'Grilled Chicken', category: 'dinner', caloriesPer100g: 165, unit: 'g', defaultQty: 150 },

    // Common additions
    { id: 41, name: 'Yogurt (Curd)', category: 'all', caloriesPer100g: 60, unit: 'g', defaultQty: 100 },
    { id: 42, name: 'Salad', category: 'all', caloriesPer100g: 20, unit: 'g', defaultQty: 100 },
    { id: 43, name: 'Pickle', category: 'all', caloriesPer100g: 100, unit: 'g', defaultQty: 20 },
    { id: 44, name: 'Papad', category: 'all', caloriesPer100g: 372, unit: 'piece', defaultQty: 1 },
    { id: 45, name: 'Raita', category: 'all', caloriesPer100g: 55, unit: 'g', defaultQty: 100 },

    // Drinks
    { id: 46, name: 'Tea (with sugar)', category: 'all', caloriesPer100g: 30, unit: 'cup', defaultQty: 1 },
    { id: 47, name: 'Coffee (with sugar)', category: 'all', caloriesPer100g: 40, unit: 'cup', defaultQty: 1 },
    { id: 48, name: 'Milk', category: 'all', caloriesPer100g: 61, unit: 'ml', defaultQty: 200 },
    { id: 49, name: 'Fresh Juice', category: 'all', caloriesPer100g: 45, unit: 'ml', defaultQty: 200 },
    { id: 50, name: 'Soft Drink', category: 'all', caloriesPer100g: 41, unit: 'ml', defaultQty: 250 },
];

export const unitOptions = [
    { value: 'g', label: 'grams (g)' },
    { value: 'kg', label: 'kilograms (kg)' },
    { value: 'piece', label: 'piece' },
    { value: 'cup', label: 'cup' },
    { value: 'ml', label: 'milliliters (ml)' },
    { value: 'slice', label: 'slice' },
    { value: 'bowl', label: 'bowl' },
];

export const calculateCalories = (food, quantity, unit) => {
    let caloriesPerUnit = food.caloriesPer100g;

    // Convert quantity to grams equivalent
    let quantityInGrams = quantity;

    if (unit === 'kg') {
        quantityInGrams = quantity * 1000;
    } else if (unit === 'piece' || unit === 'slice' || unit === 'cup' || unit === 'bowl') {
        // For piece-based items, use the defaultQty as reference
        // Assuming 1 piece/slice/cup/bowl = 100g equivalent for calculation
        quantityInGrams = quantity * 100;
    } else if (unit === 'ml') {
        // Liquids: 1ml ≈ 1g
        quantityInGrams = quantity;
    }

    return Math.round((caloriesPerUnit * quantityInGrams) / 100);
};
