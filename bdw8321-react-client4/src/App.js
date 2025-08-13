import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodPlanner from './FoodPlanner';
import Headings from './Headings';
import { Container } from 'reactstrap';
import './App.css';
import './NutritionLabel.css'


class App extends Component {
  render() {
    return (
      <Container className='App'>
        <div className="container">
          <Headings />
          <FoodPlanner />
        </div>
      </Container>
    )
  }
}

export default App;
