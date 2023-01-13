import React, { Component } from 'react';
import Form from './Form';
import Cookies from 'js-cookie'
import Profile from './Profile';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  loginHandler = user => {
    this.setState({isLoggedIn: true, user })
  }
  

  componentDidMount = async () => {
    const token = Cookies.get('user')
    if (token) {
      const response = await fetch('http://localhost:8000/profile', {
        headers : {
          'Authorization': 'Bearer ' + Cookies.get('user') 
        }
      })
      const parsedResponse = await response.json()
      console.log("the response", parsedResponse)
      if(response.status === 200){
        this.loginHandler(parsedResponse.user)
      }
    }
  }

  render() {
    const {user, isLoggedIn} = this.state
    return (
      <div>

        {isLoggedIn ? <Profile user={user} /> : <>
          <Form type="signup" loginHandler={this.loginHandler} />
          <Form type="signin" loginHandler={this.loginHandler} />
        </>}

        
      </div>
    );
  }
}

export default App;