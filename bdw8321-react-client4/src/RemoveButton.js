import { Component } from "react";
import { Button } from "reactstrap";

class RemoveButton extends Component {

    render() {
        return (
            <Button id="toggle-button" onClick={this.props.onButtonClick}>
                Remove
            </Button>
        )

    }

}

export default RemoveButton;