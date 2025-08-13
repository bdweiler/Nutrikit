import { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

class SelectedItems extends Component {
    render() {
        return (
            <FormGroup className="control-group">
                <Label for="selection-list">SelectedItems:</Label>
                <Input
                    type="select"
                    id="selection-list"
                    size="10"
                    value={this.props.selectedIndex}
                    onChange={(item) => this.props.onItemSelect(item.target.selectedIndex)}
                >
                    {this.props.selectedItems.map((item, index) => (
                        <option key={index} value={index}>
                            {item.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>
        );
    }
}

export default SelectedItems;

