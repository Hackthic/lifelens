import React, { useState, useEffect } from 'react';
import { foodDatabase, unitOptions, calculateCalories } from '../../data/foodDatabase';
import './MealFoodModal.css';

const MealFoodModal = ({ isOpen, onClose, onAddFood, mealType }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('g');

    useEffect(() => {
        if (searchQuery.trim()) {
            const results = foodDatabase.filter(food =>
                food.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (food.category === mealType || food.category === 'all')
            );
            setFilteredFoods(results);
        } else {
            // Show relevant foods for this meal type
            const relevant = foodDatabase.filter(food =>
                food.category === mealType || food.category === 'all'
            );
            setFilteredFoods(relevant.slice(0, 10));
        }
    }, [searchQuery, mealType]);

    useEffect(() => {
        if (selectedFood) {
            setQuantity(selectedFood.defaultQty.toString());
            setUnit(selectedFood.unit);
        }
    }, [selectedFood]);

    const handleFoodSelect = (food) => {
        setSelectedFood(food);
    };

    const handleAddFood = () => {
        if (!selectedFood || !quantity || parseFloat(quantity) <= 0) {
            alert('Please select a food and enter a valid quantity');
            return;
        }

        const calories = calculateCalories(selectedFood, parseFloat(quantity), unit);

        onAddFood({
            ...selectedFood,
            quantity: parseFloat(quantity),
            unit,
            calories,
            id: Date.now() // Unique ID for this food entry
        });

        // Reset form
        setSelectedFood(null);
        setQuantity('');
        setSearchQuery('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* Search Box */}
                    <div className="search-section">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for food items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Food List */}
                    <div className="food-list">
                        {filteredFoods.length > 0 ? (
                            filteredFoods.map(food => (
                                <div
                                    key={food.id}
                                    className={`food-item ${selectedFood?.id === food.id ? 'selected' : ''}`}
                                    onClick={() => handleFoodSelect(food)}
                                >
                                    <div className="food-info">
                                        <span className="food-name">{food.name}</span>
                                        <span className="food-calories">{food.caloriesPer100g} cal/100g</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No food items found. Try different keywords.</p>
                            </div>
                        )}
                    </div>

                    {/* Quantity and Unit Selection */}
                    {selectedFood && (
                        <div className="quantity-section">
                            <h3>Selected: {selectedFood.name}</h3>
                            <div className="quantity-inputs">
                                <div className="input-group">
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        min="0"
                                        step="0.1"
                                        placeholder="Enter quantity"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Unit</label>
                                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                        {unitOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {quantity && parseFloat(quantity) > 0 && (
                                <div className="calorie-preview">
                                    <strong>Estimated Calories: </strong>
                                    <span className="calorie-value">
                                        {calculateCalories(selectedFood, parseFloat(quantity), unit)} cal
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button
                        className="btn-add"
                        onClick={handleAddFood}
                        disabled={!selectedFood || !quantity || parseFloat(quantity) <= 0}
                    >
                        Add Food
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealFoodModal;
