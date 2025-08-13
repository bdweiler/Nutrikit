import React, { Component } from 'react';
import CategorySelector from './CategorySelector';
import MenuItems from './MenuItems';
import SelectedItems from './SelectedItems';
import CalorieCounter from './CalorieCounter';

const foodCategories = {
    proteins: [
        { name: "steak", calories: 300 },
        { name: "ground beef", calories: 200 },
        { name: "chicken", calories: 100 },
        { name: "fish", calories: 80 },
        { name: "soy", calories: 50 }
    ],
    fruits: [
        { name: "orange", calories: 300 },
        { name: "banana", calories: 200 },
        { name: "pineapple", calories: 100 },
        { name: "grapes", calories: 80 },
        { name: "blueberries", calories: 50 }
    ],
    vegetables: [
        { name: "romaine", calories: 30 },
        { name: "green beans", calories: 40 },
        { name: "squash", calories: 100 },
        { name: "spinach", calories: 50 },
        { name: "kale", calories: 10 }
    ],
    dairy: [
        { name: "milk", calories: 300 },
        { name: "yoghurt", calories: 200 },
        { name: "cheddar cheese", calories: 200 },
        { name: "skim milk", calories: 100 },
        { name: "cottage cheese", calories: 80 }
    ],
    grains: [
        { name: "bread", calories: 200 },
        { name: "bagel", calories: 300 },
        { name: "pita", calories: 250 },
        { name: "naan", calories: 210 },
        { name: "tortilla", calories: 120 }
    ]
};

class FoodPlanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: '', // Currnetly selected category
            foodList: [], //List of all the foods in the category
            selectedItems: [], //List of all the selected items
            totalCalories: 0, //Total number of calories in the selected items
            selectedFoodIndex: null, //Index of the current item selected from the menu
            selectedItemIndex: null, //Index of current item selected from the selected items
        };
    }

    //Updates the current category on change
    handleCategoryChange = (category) => {
        //gets the selected category
        const selectedCategory = category.target.value;

        //gets the list of fod from that category using or sets it to nothing if it does not exist
        const foodList = foodCategories[selectedCategory] || [];

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

    //handles the click of the button to add or remove from the selected items
    handleButtonClick = () => {
        const {
            foodList,
            selectedItems,
            selectedFoodIndex,
            selectedItemIndex,
            totalCalories,
        } = this.state;

        //If the item index is exists it means it is in the selected items and should be removed
        if (selectedItemIndex !== null) {
            //gets that item to remove
            const itemToRemove = selectedItems[selectedItemIndex];
            //filters all the items adn removes the one that is the selected item
            const updatedItems = selectedItems.filter((_, i) => i !== selectedItemIndex);

            //Updates the state
            this.setState({
                selectedItems: updatedItems,
                totalCalories: totalCalories - itemToRemove.calories,
                selectedItemIndex: null,
            });
            //If there is an item selected and it is not null add it to the list
        } else if (selectedFoodIndex !== null) {
            //gets the item to add from index
            const itemToAdd = foodList[selectedFoodIndex];

            //Updates the state with item added
            this.setState({
                selectedItems: [...selectedItems, itemToAdd],
                totalCalories: totalCalories + itemToAdd.calories,
                selectedFoodIndex: null,
            });
        }
    };




    render() {
        //Removes having to do this.state. for every variable
        const { foodList, selectedItems, totalCalories, selectedCategory, selectedFoodIndex, selectedItemIndex } = this.state;

        return (
            <>
                <div className="controls">
                    <CategorySelector
                        selectedCategory={selectedCategory}
                        onCategoryChange={this.handleCategoryChange}
                    />
                    <MenuItems
                        foodList={foodList}
                        selectedIndex={selectedFoodIndex}
                        onItemSelect={this.handleFoodSelect}
                    />
                    <div className="buttons">
                        <button id="toggle-button" onClick={this.handleButtonClick}>
                            {selectedItemIndex !== null ? '<<' : '>>'}
                        </button>
                    </div>
                    <SelectedItems
                        selectedItems={selectedItems}
                        selectedIndex={selectedItemIndex}
                        onItemSelect={this.handleSelectedItemSelect}
                    />
                </div>
                <CalorieCounter calories={totalCalories} />
            </>
        );
    }
}

export default FoodPlanner;