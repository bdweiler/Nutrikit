import React, { Component } from 'react';
import CategorySelector from './CategorySelector';
import MenuItems from './MenuItems';
import SelectedItems from './SelectedItems';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import NutritionLabel from './NutritionLabel';
import { Container, Row, Col, Button, Input, Progress } from 'reactstrap';
import FoodModal from './FoodModal';

// Used for nutritional label formatting
const nutrientKeys = [
    'calories',
    'totalFat',
    'saturatedFat',
    'transFat',
    'protein',
    'carbohydrate'
];


class FoodPlanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: '', // Currnetly selected category
            foodList: [], //List of all the foods in the category
            selectedItems: [], //List of all the selected items
            selectedFoodIndex: null, //Index of the current item selected from the menu
            selectedItemIndex: null, //Index of current item selected from the selected items
            modalVisibile: false, // boolean for showing the modal
            foodItems: {}, //List of all the food data and can be updated with more user added data
            foodCategories: {}, // Categorizes the food based off the data
            editFood: null, // The food item that is being edited
            isEdit: false, //boolean to differenciate between adding new food or editing one
            calorieGoal: 2000, // Default calorie goal
        };
    }

    handleCategoryChange = (category) => {
        // Gets the value of the category
        const selectedCategory = category.target.value;
        //Gets the food list from the foods in the selected foodCategory or is empty
        const foodList = this.state.foodCategories[selectedCategory] || [];

        //Updates the state
        this.setState({
            selectedCategory,
            foodList,
            selectedFoodIndex: null,
            selectedItemIndex: null,
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

    // Saves a new food item in the database
    handleSaveFood = (foodItem) => {
        // Sends the post to the server
        fetch('http://localhost:4999/food_api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //Makes it JSON
            body: JSON.stringify(foodItem),
        })
            .then((response) => {
                //Checks for sucess or throws error
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to save food item');
                }
            })
            .then(() => {
                //Calls fetch to update the food data
                this.fetchFoodData();
                // Updates the modal state
                this.setState({ modalVisible: false });
            })
            .catch((error) => {
                console.error('Error saving food item:', error);
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

    // Updates a food item
    handleEditFood = (updatedFood) => {
        //Sends the put request to the server
        fetch(`http://localhost:4999/food_api`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // Makes the data JSON
            body: JSON.stringify(updatedFood),
        })
            .then((response) => {
                //Checks for sucess or throws error
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to update food item');
                }
            })
            .then((data) => {
                // Refresh the state after successful update
                this.fetchFoodData();
                //Updates the state to false
                this.setState({ modalVisible: false });
            })
            .catch((error) => {
                console.error('Error updating food item:', error);
            });
    };


    // Changes the calorie goal to the new inputed number on change
    handleCalorieGoalChange = (e) => {
        this.setState({ calorieGoal: Number(e.target.value) || 0 });
    };

    //Categorizes the food based off an array 
    categorizeFood = (data) => {
        if (!Array.isArray(data)) {
            console.error('Data should be an array.');
            return {};
        }
        // Loops over valeus in the data
        const categorizedData = data.reduce((categories, item) => {
            // Gets the category of the current food item
            const category = item[2];

            //Checks to see if the category already has an array started and if not creates one
            if (!categories[category]) {
                categories[category] = [];
            }
            //If it does it adds it to the category
            categories[category].push(item);
            return categories;
        }, {});
        return categorizedData;
    };

    // When compnets load calls the get function to populate the webpage with data
    componentDidMount() {
        this.fetchFoodData();
    }

    // Gets the food data from server to populate the webpage
    fetchFoodData = () => {
        fetch('http://localhost:4999/food_api')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("HTTP error:" + response.status + ":" + response.statusText);
                    return [];
                }
            })
            .then((jsonOutput) => {
                // Categorizing the data before updating it 
                const categorizedData = this.categorizeFood(jsonOutput);

                // Getting the currently selected category
                const { selectedCategory } = this.state;

                // Getting an updated food list after recategorizing the data and getting the selected category
                const updatedFoodList = categorizedData[selectedCategory] || [];

                // Updating the state with the new data
                this.setState({
                    foodItems: jsonOutput,
                    foodCategories: categorizedData,
                    foodList: updatedFoodList
                });
            })
            .catch((error) => {
                console.error('Error fetching food data:', error);

                // Update state if database fails for no server
                this.setState({
                    foodItems: [],
                    foodCategories: [],
                });
            });
    };

    // Handles sending a delete request to the server
    deleteFood = (foodItem) => {
        //Gets the id of the food to send 
        const foodId = foodItem[0];

        fetch(`http://localhost:4999/food_api`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: foodId }),
        })
            .then((response) => {
                if (response.ok) {
                    this.fetchFoodData();
                } else {
                    throw new Error('Failed to delete the food item');
                }
            })
            .catch((error) => {
                console.error('Error deleting food item:', error);
            });
    };



    render() {
        const { foodList, selectedItems, selectedCategory, selectedFoodIndex, selectedItemIndex, calorieGoal } = this.state;

        //Sets the selected food is the index exits
        const selectedFood = selectedFoodIndex !== null ? foodList[selectedFoodIndex] : null;

        //Gets the nutrition from the selected food 
        const totalNutrition = selectedItems.reduce((totals, item) => {
            // Splices off the non numeric values 
            const nutrients = item.slice(3);

            // Adds the numeric values 
            nutrients.forEach((value, index) => {
                totals[nutrientKeys[index]] = (totals[nutrientKeys[index]] || 0) + value;
            });

            return totals;
        }, {});


        // Calculate total calories and progress for the bar
        const totalCalories = selectedItems.reduce((total, item) => total + item[3], 0);
        const progress = Math.min((totalCalories / calorieGoal) * 100, 100);

        if (this.state.foodItems === null || this.state.foodItems.length === 0)
            return (<div><p>No data returned from server</p></div>)
        else {
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
                        <Col>
                            <Button color="danger" onClick={() => this.deleteFood(selectedFood)}>
                                Delete Food
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
                        handleSaveFood={this.handleSaveFood}
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
}

export default FoodPlanner;