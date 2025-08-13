import { Component } from "react";

class CalorieCounter extends Component {
    //Displays the current total calories
    render() {
        return (
            <div id="calories">
                Total Calories: <span id="total-calories">{this.props.calories}</span>
            </div>
        );
    }
}

export default CalorieCounter;
