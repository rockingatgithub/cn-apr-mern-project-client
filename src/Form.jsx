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
            isLoggedIn: false,
            userType: 'customer'
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

    userTypehandler = (event) => {
        this.setState({userType: event.target.value})
    }

    submitHandler = async (event) => {
        event.preventDefault()
        const {email, name, password, user, userType} = this.state
        const {type} = this.props

        const userObj = {
            email,
            password,
            name
        }

        const response = await fetch(`http://localhost:8000/${userType}/${type}`, {
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
            document.cookie = 'user=' + parsedRes.token
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
                        { type === 'signup' && <>Name:-<input type="text" value={name} onChange={this.nameChangeHandler} /></>}
                        Email:<input type="email" value={email} onChange={this.emailChangeHandler} />
                        <br/>
                        Password:-<input type="password" value={password} onChange={this.passwordChangeHandler} />
                        <div>
                            UserType:- 
                            Client<input type="radio" name='userType' value="client" onChange={this.userTypehandler} />
                            Customer<input type="radio" name='userType' value="customer" onChange={this.userTypehandler} />
                        </div>

                        <button type='submit' > {type} </button>
                    </form>
                </>
                }
            </div>
        );
    }
}

export default Form;