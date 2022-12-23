import React, { Component } from 'react';
import Form from './Form';

class App extends Component {

  render() {
    return (
      <div>

        <Form type="signup" />
        <Form type="signin" />

        
      </div>
    );
  }
}

export default App;