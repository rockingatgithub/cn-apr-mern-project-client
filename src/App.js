import React, { Component, useState } from 'react';
import Form from './Form';
import Cookies from 'js-cookie'
import Profile from './Profile';
import { connect } from 'react-redux';
import { decrement, increment, multiply, userProfile } from './actions';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import UserForm from './Hooks';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
// import Auth from './Firebase-auth'
import FireBaseDB from './Firebase-db';

export const Theme = React.createContext('light')

const GoogleLoginFunction = () => {

  const [ accessToken, setAccessToken ] = useState('')

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      setAccessToken(tokenResponse.access_token) 
    }
  });

  return <button onClick={() => login()}>
  Sign in with Google 🚀
</button>
}



class App extends Component {

  state = {
    hooksToggle: true
  }

  componentDidMount = async () => {
    this.props.dispatch(userProfile())
  }

  toggleHook = () => {
    this.setState( (prevState) => ({hooksToggle: !prevState.hooksToggle}))
  }

  incrementHandler = (num) => {
    this.props.dispatch(increment(3))
  }

  multiplyHandler = (num) => {
    this.props.dispatch(multiply(3))
  }

  render() {

    console.log(this.props.main)
    const {user, isLoggedIn} = this.props.main
    return (
      <div>

        <button onClick={this.toggleHook} > Show Hook </button>

        {/* {isLoggedIn ? <Profile /> : <>
          <Form type="signup" />
          <Form type="signin" />
        </>} */}

    
        {/* <GoogleLoginFunction/> */}

        { this.state.hooksToggle && <UserForm/>}

        
        {/* <Auth type="signup" />
        <Auth type="signin" /> */}

        {/* <FireBaseDB/> */}

        <nav>
          Example of React router
        </nav>

        <Routes>
          <Route path='/signin' element={<Form type="signin" />} />
          <Route path='/signup' element={<Form type="signup" />} />
          <Route path='/profile' element={ <Theme.Provider value='grey'> <Profile />  </Theme.Provider>} />
        </Routes>

        <div>
          <Link to='/signin' >Login</Link>
          <Link to='/signup'>Signup</Link>
          <Link to='/profile'>Profile</Link>
        </div>

        {isLoggedIn && <Navigate to="/profile" replace={true} />}

        {/* <div> {this.props.main.counter} </div>
        <button onClick={this.incrementHandler} >Increment Counter</button>
        <button onClick={this.multiplyHandler} >Multiply Counter</button>         */}



      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    main: state
  }
}

export default  connect(mapStateToProps)(App);