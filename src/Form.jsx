import React, { Component } from 'react';
import Profile from './Profile';

class Form extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            password: '',
            user: {},
            isLoggedIn: false
        }
    }

    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    submitHandler = async (event) => {
        event.preventDefault()
        const {email, name, password} = this.state
        const {type} = this.props

        const userObj = {
            email,
            password,
            name
        }

        const response = await fetch(`http://localhost:8000/${type}`, {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedRes = await response.json()
        console.log("the user", parsedRes)
        if(response.status === 200) {
            this.setState({ isLoggedIn: true, user: parsedRes.client })
        }
    }
    

    render() {

        const {email, name, password, user, isLoggedIn} = this.state
        const {type} = this.props

        return (
            <div>
                {isLoggedIn ? 
                <Profile user={user} /> : 
                <> 
                    <h1> {type} Form </h1>
                    <form onSubmit={this.submitHandler} >
                        { type === 'signup' && <input type="text" value={name} onChange={this.nameChangeHandler} />}
                        <input type="email" value={email} onChange={this.emailChangeHandler} />
                        <input type="password" value={password} onChange={this.passwordChangeHandler} />
                        <button type='submit' > {type} </button>
                    </form>
                </>
                }
            </div>
        );
    }
}

export default Form;