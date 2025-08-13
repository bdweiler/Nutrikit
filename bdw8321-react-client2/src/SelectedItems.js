import { Component } from "react";

class SelectedItems extends Component {
    render() {
        return (
            <div className="control-group">
                <label htmlFor="selection-list">Selected Items:</label>
                <select
                    id="selection-list"
                    size="10"
                    value={this.props.selectedIndex}
                    //Changes the current item that is selected from the selected items when one is selected
                    onChange={(item) => this.props.onItemSelect(item.target.selectedIndex)}
                >
                    {this.props.selectedItems.map((item, index) => (
                        <option key={index} value={index}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default SelectedItems;

