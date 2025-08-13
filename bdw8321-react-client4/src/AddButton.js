import { Component } from "react";
import { Button } from "reactstrap";

class AddButton extends Component {

    //componet for the add selected button
    render() {
        return (
            <Button color="primary" id="toggle-button" onClick={this.props.onButtonClick}>
                Add Selected
            </Button>
        )
    }
}

export default AddButton;