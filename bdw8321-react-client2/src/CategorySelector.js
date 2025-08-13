import { Component } from "react";

class CategorySelector extends Component {
    render() {
        return (
            <div className="control-group">
                <label htmlFor="categories">Categories:</label>
                <select
                    id="categories"
                    name="categories"
                    value={this.props.selectedCategory}
                    onChange={this.props.onCategoryChange}
                >
                    <option value="">Select a category</option>
                    <option value="proteins">Proteins</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="dairy">Dairy</option>
                    <option value="grains">Grains</option>
                </select>
            </div>
        );
    }
}

export default CategorySelector;
