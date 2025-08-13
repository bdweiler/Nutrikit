import { Component } from "react";

class MenuItems extends Component {
    //Displays the menu items 
    render() {
        return (
            <div className="control-group">
                <label htmlFor="food-list">Menu Items:</label>
                <select
                    id="food-list"
                    size="5"
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
            </div>
        );
    }
}

export default MenuItems;
