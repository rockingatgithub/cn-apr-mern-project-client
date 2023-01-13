import React, { Component } from 'react';

class Form extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
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

    phoneChangeHandler = (event) => {
        this.setState({phone: event.target.value})
    }

    submitHandler = async (event) => {
        event.preventDefault()
        const {email, name, password, userType, phone} = this.state
        const {type} = this.props

        const userObj = {
            email,
            password,
            name,
            phone
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
            this.props.loginHandler(parsedRes.client)
            document.cookie = 'user=' + parsedRes.token
        }
    }
    

    render() {

        const {email, name, password, phone} = this.state
        const {type} = this.props

        return (
                
                <> 
                    <h1> {type} Form </h1>
                    <form onSubmit={this.submitHandler} >
                        { type === 'signup' && <>Name:-<input type="text" value={name} onChange={this.nameChangeHandler} /></>}
                        Email:<input type="email" value={email} onChange={this.emailChangeHandler} />
                        <br/>
                        Password:-<input type="password" value={password} onChange={this.passwordChangeHandler} />
                        {type === 'signup' && <>Phone:-<input type="tel" value={phone} onChange={this.phoneChangeHandler} /></>}
                        <div>
                            UserType:- 
                            Client<input type="radio" name='userType' value="client" onChange={this.userTypehandler} />
                            Customer<input type="radio" name='userType' value="customer" onChange={this.userTypehandler} />
                        </div>

                        <button type='submit' > {type} </button>
                    </form>
                </>
        );
    }
}

export default Form;