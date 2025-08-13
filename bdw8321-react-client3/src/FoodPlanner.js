import React, { Component } from 'react';
import CategorySelector from './CategorySelector';
import MenuItems from './MenuItems';
import SelectedItems from './SelectedItems';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import NutritionLabel from './NutritionLabel';
import { Container, Row, Col, Button, Input, Progress } from 'reactstrap';
import FoodModal from './FoodModal';

const foodData = {
    0: { id: 0, name: "steak", category: "Proteins", calories: 300, totalFat: 5.73, saturatedFat: 2.183, transFat: 0.182, protein: 29.44, carbohydrate: 0.0 },
    1: { id: 1, name: "ground beef", category: "Proteins", calories: 200, totalFat: 13.1, saturatedFat: 5.3, transFat: 0.6, protein: 15.18, carbohydrate: 0.0 },
    2: { id: 2, name: "chicken", category: "Proteins", calories: 100, totalFat: 9.3, saturatedFat: 2.5, transFat: 0.1, protein: 27.14, carbohydrate: 0.0 },
    3: { id: 3, name: "fish", category: "Proteins", calories: 80, totalFat: 6.34, saturatedFat: 1.0, transFat: 0.0, protein: 19.84, carbohydrate: 0.0 },
    4: { id: 4, name: "soy", category: "Proteins", calories: 50, totalFat: 19.94, saturatedFat: 2.884, transFat: 0.0, protein: 36.49, carbohydrate: 30.16 },
    5: { id: 5, name: "orange", category: "Fruits", calories: 300, totalFat: 0.12, saturatedFat: 0.0, transFat: 0.0, protein: 0.94, carbohydrate: 11.75 },
    6: { id: 6, name: "banana", category: "Fruits", calories: 200, totalFat: 0.33, saturatedFat: 0.0, transFat: 0.0, protein: 1.09, carbohydrate: 22.84 },
    7: { id: 7, name: "pineapple", category: "Fruits", calories: 100, totalFat: 0.12, saturatedFat: 0.0, transFat: 0.0, protein: 0.54, carbohydrate: 13.12 },
    8: { id: 8, name: "grapes", category: "Fruits", calories: 80, totalFat: 0.16, saturatedFat: 0.0, transFat: 0.0, protein: 0.72, carbohydrate: 18.1 },
    9: { id: 9, name: "blueberries", category: "Fruits", calories: 50, totalFat: 0.33, saturatedFat: 0.0, transFat: 0.0, protein: 0.74, carbohydrate: 14.49 },
    10: { id: 10, name: "romaine", category: "Vegetables", calories: 30, totalFat: 0.3, saturatedFat: 0.0, transFat: 0.0, protein: 1.2, carbohydrate: 3.3 },
    11: { id: 11, name: "green beans", category: "Vegetables", calories: 40, totalFat: 0.22, saturatedFat: 0.0, transFat: 0.0, protein: 1.83, carbohydrate: 6.97 },
    12: { id: 12, name: "squash", category: "Vegetables", calories: 100, totalFat: 0.2, saturatedFat: 0.0, transFat: 0.0, protein: 1.2, carbohydrate: 3.4 },
    13: { id: 13, name: "spinach", category: "Vegetables", calories: 50, totalFat: 0.4, saturatedFat: 0.0, transFat: 0.0, protein: 2.9, carbohydrate: 3.6 },
    14: { id: 14, name: "kale", category: "Vegetables", calories: 10, totalFat: 0.9, saturatedFat: 0.0, transFat: 0.0, protein: 4.3, carbohydrate: 8.8 },
    15: { id: 15, name: "milk", category: "Dairy", calories: 300, totalFat: 3.9, saturatedFat: 2.4, transFat: 0.0, protein: 3.2, carbohydrate: 4.8 },
    16: { id: 16, name: "yoghurt", category: "Dairy", calories: 200, totalFat: 5.0, saturatedFat: 0.0, transFat: 0.0, protein: 9.0, carbohydrate: 3.98 },
    17: { id: 17, name: "cheddar cheese", category: "Dairy", calories: 200, totalFat: 9.0, saturatedFat: 6.0, transFat: 0.0, protein: 7.0, carbohydrate: 0.0 },
    18: { id: 18, name: "skim milk", category: "Dairy", calories: 100, totalFat: 0.2, saturatedFat: 0.1, transFat: 0.0, protein: 8.3, carbohydrate: 12.5 },
    19: { id: 19, name: "cottage cheese", category: "Dairy", calories: 80, totalFat: 4.3, saturatedFat: 0.0, transFat: 0.0, protein: 11.12, carbohydrate: 3.38 },
    20: { id: 20, name: "bread", category: "Grains", calories: 200, totalFat: 1.1, saturatedFat: 0.0, transFat: 0.0, protein: 4.0, carbohydrate: 13.8 },
    21: { id: 21, name: "bagel", category: "Grains", calories: 300, totalFat: 1.7, saturatedFat: 0.1, transFat: 0.0, protein: 13.8, carbohydrate: 68 },
    22: { id: 22, name: "pita", category: "Grains", calories: 250, totalFat: 1.7, saturatedFat: 0.3, transFat: 0.0, protein: 6.3, carbohydrate: 35.2 },
    23: { id: 23, name: "naan", category: "Grains", calories: 210, totalFat: 3.3, saturatedFat: 0.1, transFat: 0.0, protein: 2.7, carbohydrate: 16.9 },
    24: { id: 24, name: "tortilla", category: "Grains", calories: 120, totalFat: 0.5, saturatedFat: 0.1, transFat: 0.0, protein: 1.1, carbohydrate: 8.5 }
}



const categorizeFood = (data) => {
    return Object.values(data).reduce((categories, item) => {
        if (!categories[item.category]) categories[item.category] = [];
        categories[item.category].push(item);
        return categories;
    }, {});
};


class FoodPlanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: '', // Currnetly selected category
            foodList: [], //List of all the foods in the category
            selectedItems: [], //List of all the selected items
            selectedFoodIndex: '', //Index of the current item selected from the menu
            selectedItemIndex: '', //Index of current item selected from the selected items
            modalVisibile: false, // boolean for showing the modal
            foodItems: { ...foodData }, //List of all the food data and can be updated with more user added data
            foodCategories: categorizeFood(foodData), // Categorizes the food based off the data
            editFood: null, // The food item that is being edited
            isEdit: false, //boolean to differenciate between adding new food or editing one
            calorieGoal: 2000, // Default calorie goal
        };
    }

    //Updates the current category on change
    handleCategoryChange = (category) => {
        //gets the selected category
        const selectedCategory = category.target.value;

        //gets the list of food from that category using or sets it to nothing if it does not exist
        const foodList = this.state.foodCategories[selectedCategory] || [];

        //Updates the state
        this.setState({
            selectedCategory, foodList, selectedFoodIndex: null, selectedItemIndex: null,
        });
    };

    //Sets the state to the current item selected from the menu
    handleFoodSelect = (index) => {
        this.setState({ selectedFoodIndex: index });
    };

    //Sets the state to the current item selected from the selected items
    handleSelectedItemSelect = (index) => {
        this.setState({ selectedItemIndex: index });
    };

    handleAddButton = () => {
        const {
            foodList,
            selectedItems,
            selectedFoodIndex,
        } = this.state;

        if (selectedFoodIndex !== null) {
            //gets the item to add from index
            const itemToAdd = foodList[selectedFoodIndex];

            //Updates the state with item added
            this.setState({
                selectedItems: [...selectedItems, itemToAdd],
            });
        }
    }

    handleRemoveButton = () => {
        const {
            selectedItems,
            selectedItemIndex,
        } = this.state;

        //If the item index is exists it means it is in the selected items and should be removed
        if (selectedItemIndex !== null && selectedItems.length > 0) {
            //filters all the items and removes the one that is the selected item
            const updatedItems = selectedItems.filter((_, i) => i !== selectedItemIndex);

            //Updates the state
            this.setState({
                selectedItems: updatedItems,
                selectedItemIndex: updatedItems.length > 0 ? Math.min(selectedItemIndex, updatedItems.length - 1) : null,
            });
        }
    }

    // Makes the modal appear
    toggleModal = () => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    };

    handleSaveFood = (foodItem) => {
        this.setState((prevState) => {
            // Calculate the new id based on the length of the current food items
            const newId = Object.keys(prevState.foodItems).length;

            // Add the new id to the food item
            const updatedFoodItem = { ...foodItem, id: newId };

            // Add the food item in the foodItems object
            const updatedFoodItems = {
                ...prevState.foodItems,
                [newId]: updatedFoodItem, // Use the new id as the key
            };

            // Reorder food categories based on the updated food items
            const updatedCategories = categorizeFood(updatedFoodItems);
            const updatedFoodList = updatedCategories[prevState.selectedCategory] || [];

            this.toggleModal()

            return {
                foodItems: updatedFoodItems,        // Update the state with new food items
                foodCategories: updatedCategories, // Update the categories
                foodList: updatedFoodList, //Updates the display
                modalVisibile: !this.props.modalVisibile, //Set to false so the modal disapears 
            };
        });
    };

    //Toggle for the editing modal 
    toggleEditModal = (foodItem = null) => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
            editFood: foodItem, // Pass the food item to be edited
            isEdit: !!foodItem, // Set isEdit to true if foodItem is provided
        }));
    };


    handleEditFood = (updatedFood) => {
        this.setState((prevState) => {
            // Update the existing food item in the foodItems object
            const updatedFoodItems = {
                ...prevState.foodItems,
                [updatedFood.id]: updatedFood,
            };

            // Reorganize categories based on the updated food items
            const updatedCategories = categorizeFood(updatedFoodItems);

            this.toggleEditModal()

            return {
                foodItems: updatedFoodItems,
                foodCategories: updatedCategories,
                foodList: updatedCategories[prevState.selectedCategory] || [],
                editFood: null, // Reset the editFood state after saving
                modalVisibile: !this.props.modalVisibile,
            };
        });
    };

    // Changes the calorie goal to the new inputed number on change
    handleCalorieGoalChange = (e) => {
        this.setState({ calorieGoal: Number(e.target.value) || 0 });
    };


    render() {
        const { foodList, selectedItems, selectedCategory, selectedFoodIndex, selectedItemIndex, calorieGoal } = this.state;

        //Sets the selected food is the index exits
        const selectedFood = selectedFoodIndex !== null ? foodList[selectedFoodIndex] : null;

        //Gets the nutrition from the selected food 
        const totalNutrition = selectedItems.reduce((amounts, item) => {
            Object.keys(item).forEach((key) => {
                if (!['name', 'id', 'category'].includes(key)) {
                    amounts[key] = (amounts[key] || 0) + item[key];
                }
            });
            return amounts;
        }, {});

        // Calculate total calories and progress for the bar
        const totalCalories = selectedItems.reduce((total, item) => total + item.calories, 0);
        const progress = Math.min((totalCalories / calorieGoal) * 100, 100);


        return (
            <Container>
                <Row className="controls">
                    <Col xs={12} md={4} className='category'>
                        <CategorySelector
                            selectedCategory={selectedCategory}
                            onCategoryChange={this.handleCategoryChange}
                        />
                    </Col>
                    <Col>
                        <MenuItems xs={12} md={4}
                            foodList={foodList}
                            selectedIndex={selectedFoodIndex}
                            onItemSelect={this.handleFoodSelect}
                        />
                    </Col>
                    <Col xs={12} md={4} className="buttons">
                        <AddButton onButtonClick={this.handleAddButton} />
                        <RemoveButton onButtonClick={this.handleRemoveButton} />
                    </Col>
                    <Col>
                        <SelectedItems xs={12} md={4}
                            selectedItems={selectedItems}
                            selectedIndex={selectedItemIndex}
                            onItemSelect={this.handleSelectedItemSelect}
                        />
                    </Col>
                    <Row>
                        <Col xs={12} md={4}>
                            <Input
                                type="number"
                                value={calorieGoal}
                                onChange={this.handleCalorieGoalChange}
                                placeholder="Set your calorie goal"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
                            <Progress value={progress} className="my-2">
                                {Math.round(progress)}%
                            </Progress>
                            <p>
                                Calories: {totalCalories} / {calorieGoal}
                            </p>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" onClick={this.toggleModal}>
                            Add New Food
                        </Button>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={() => this.toggleEditModal(selectedFood)}>
                            Edit Food
                        </Button>
                    </Col>
                </Row>
                <FoodModal
                    showHide={this.state.showModal}
                    name="Add New Food"
                    cancel={this.toggleModal}
                    handleSaveFood={this.handleSaveFood}
                />
                <FoodModal
                    showHide={this.state.showModal}
                    food={this.state.editFood}
                    handleSaveFood={this.handleSaveFood} // Ensure this function is passed
                    handleEditFood={this.handleEditFood}
                    cancel={this.toggleModal}
                    isEdit={this.state.isEdit}
                />
                <Row className="nutrition-labels-container">
                    <Col xs={12}>
                        {selectedFood && (
                            <NutritionLabel
                                title="Selected Food Nutrition"
                                nutritionData={selectedFood}
                            />
                        )}
                    </Col>
                    <Col xs={12}>
                        {selectedItems.length > 0 && (
                            <NutritionLabel
                                title="Total Nutrition"
                                nutritionData={totalNutrition}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default FoodPlanner;