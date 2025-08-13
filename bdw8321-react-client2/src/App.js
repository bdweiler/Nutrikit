import React, { Component } from 'react';
import './App.css';
import FoodPlanner from './FoodPlanner';
import Headings from './Headings';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="container">
          <Headings />
          <FoodPlanner />
        </div>
      </div>
    )
  }
}

export default App;
