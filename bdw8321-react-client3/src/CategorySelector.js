import { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

//Componet for the category selector
class CategorySelector extends Component {
    render() {
        return (
            <FormGroup className="control-group">
                <Label for="categories">Categories:</Label>
                <Input
                    type="select"
                    id="categories"
                    name="categories"
                    value={this.props.selectedCategory}
                    onChange={this.props.onCategoryChange}
                >
                    <option value="">Select a category</option>
                    <option value="Proteins">Proteins</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Grains">Grains</option>
                </Input>
            </FormGroup>
        );
    }
}

export default CategorySelector;