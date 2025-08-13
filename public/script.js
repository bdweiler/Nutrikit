
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

function populateMenuItems() {
    const selectedCategory = document.getElementById('categories').value;
    const foodMenuItems = document.getElementById('food-list');

    foodMenuItems.innerHTML = '';

    if (selectedCategory && foodCategories[selectedCategory]) {
        foodCategories[selectedCategory].forEach(food => {
            const option = document.createElement('option');
            option.value = food.name;
            option.textContent = food.name;
            option.dataset.calories = food.calories;

            foodMenuItems.appendChild(option);
        });
    }
}

function addSelectedItem() {
    const foodMenuItems = document.getElementById('food-list');
    const foodSelection = document.getElementById('selection-list');
    const calorieCount = document.getElementById('total-calories');

    const selectedItem = foodMenuItems.options[foodMenuItems.selectedIndex];
    if (selectedItem) {
        const option = document.createElement('option');
        option.textContent = selectedItem.value;
        option.dataset.calories = selectedItem.dataset.calories;
        foodSelection.appendChild(option);

        calorieCount.textContent = parseInt(calorieCount.textContent) + parseInt(selectedItem.dataset.calories);

        const toggleButton = document.getElementById('toggle-button');
        toggleButton.textContent = '>>';
    }
}

function removeSelectedItem() {
    const foodSelection = document.getElementById('selection-list');
    const calorieCount = document.getElementById('total-calories');

    const selectedItem = foodSelection.options[foodSelection.selectedIndex];
    if (selectedItem) {
        calorieCount.textContent = parseInt(calorieCount.textContent) - parseInt(selectedItem.dataset.calories);
        foodSelection.removeChild(selectedItem);

        const toggleButton = document.getElementById('toggle-button');
        toggleButton.textContent = '<<';
    }
}

function handleButtonClick() {
    const foodMenuItems = document.getElementById('food-list');
    const foodSelection = document.getElementById('selection-list');

    if (foodSelection.selectedIndex !== -1) {
        removeSelectedItem();
    } else if (foodMenuItems.selectedIndex !== -1) {
        addSelectedItem();
    }
}