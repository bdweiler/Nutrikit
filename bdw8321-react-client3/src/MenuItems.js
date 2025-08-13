import { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

class MenuItems extends Component {
    //Displays the menu items 
    render() {
        return (
            <FormGroup className="control-group">
                <Label for="food-list">Menu Items:</Label>
                <select
                    id="food-list"
                    size="8"
                    value={this.props.selectedIndex}
                    //Changes the current item that is selected from the menu when one is selected
                    onChange={(item) => this.props.onItemSelect(item.target.selectedIndex)}
                >
                    {this.props.foodList.map((item, index) => (
                        <option key={index} value={index}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </FormGroup>
        );
    }
}

export default MenuItems;
