import React, { useState, useEffect } from 'react';
import MealFoodModal from './MealFoodModal';
import './DietSection.css';

const DietSection = ({ dietData, onDietChange }) => {
    const [meals, setMeals] = useState({
        breakfast: dietData?.breakfast || [],
        lunch: dietData?.lunch || [],
        snack: dietData?.snack || [],
        dinner: dietData?.dinner || []
    });

    const [modalState, setModalState] = useState({
        isOpen: false,
        mealType: null
    });

    useEffect(() => {
        // Notify parent component of diet changes
        onDietChange(meals);
    }, [meals]);

    const openModal = (mealType) => {
        setModalState({ isOpen: true, mealType });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, mealType: null });
    };

    const addFoodToMeal = (food) => {
        const { mealType } = modalState;
        setMeals(prev => ({
            ...prev,
            [mealType]: [...prev[mealType], food]
        }));
    };

    const removeFoodFromMeal = (mealType, foodId) => {
        setMeals(prev => ({
            ...prev,
            [mealType]: prev[mealType].filter(food => food.id !== foodId)
        }));
    };

    const getMealCalories = (mealType) => {
        return meals[mealType].reduce((total, food) => total + food.calories, 0);
    };

    const getTotalCalories = () => {
        return Object.keys(meals).reduce((total, mealType) => {
            return total + getMealCalories(mealType);
        }, 0);
    };

    const mealConfig = [
        { type: 'breakfast', icon: '🍳', label: 'Breakfast', color: '#f59e0b' },
        { type: 'lunch', icon: '🍛', label: 'Lunch', color: '#10b981' },
        { type: 'snack', icon: '🍪', label: 'Snacks', color: '#8b5cf6' },
        { type: 'dinner', icon: '🍽️', label: 'Dinner', color: '#3b82f6' }
    ];

    return (
        <div className="diet-section">
            <h2>🍴 Diet & Meals <span className="required">*</span></h2>

            <div className="meals-grid">
                {mealConfig.map(meal => (
                    <div key={meal.type} className="meal-card">
                        <div className="meal-header" style={{ borderLeftColor: meal.color }}>
                            <div className="meal-title">
                                <span className="meal-icon">{meal.icon}</span>
                                <span className="meal-label">{meal.label}</span>
                            </div>
                            <button
                                className="add-food-btn"
                                onClick={() => openModal(meal.type)}
                                style={{ background: meal.color }}
                            >
                                + Add
                            </button>
                        </div>

                        {meals[meal.type].length > 0 ? (
                            <div className="food-items">
                                {meals[meal.type].map(food => (
                                    <div key={food.id} className="food-entry">
                                        <div className="food-details">
                                            <span className="food-entry-name">{food.name}</span>
                                            <span className="food-quantity">
                                                {food.quantity} {food.unit}
                                            </span>
                                        </div>
                                        <div className="food-actions">
                                            <span className="food-entry-calories">{food.calories} cal</span>
                                            <button
                                                className="remove-food-btn"
                                                onClick={() => removeFoodFromMeal(meal.type, food.id)}
                                                title="Remove"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="meal-total">
                                    <strong>Meal Total:</strong>
                                    <span className="meal-total-calories">
                                        {getMealCalories(meal.type)} cal
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="empty-meal">
                                <p>No items added yet</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Total Calories Summary */}
            <div className="total-calories-section">
                <div className="total-calories-card">
                    <span className="total-label">📊 Total Daily Calories</span>
                    <span className="total-value">{getTotalCalories()} cal</span>
                </div>
            </div>

            {/* Modal */}
            <MealFoodModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                onAddFood={addFoodToMeal}
                mealType={modalState.mealType}
            />
        </div>
    );
};

export default DietSection;
