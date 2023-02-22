import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from './actions';

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

        this.myRef = React.createRef()
        this.passowrd = null
        this.setPasswordRef = ele => {
            this.passowrd = ele
        }
    }

    componentDidMount = () => {
        const node = this.myRef.current;
        // node.focus()
        // this.passowrd.focus()
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
        this.props.dispatch(userLogin(userObj, userType, type))
    }
    

    render() {

        const {email, name, password, phone} = this.state
        const {type} = this.props

        return (
                
                <> 
                    <h1> {type} Form </h1>
                    <form onSubmit={this.submitHandler} >
                        { type === 'signup' && <>Name:-<input type="text" value={name} onChange={this.nameChangeHandler} /></>}
                        Email:<input type="email" value={email} onChange={this.emailChangeHandler} ref={this.myRef} />
                        <br/>
                        Password:-<input type="password" value={password} onChange={this.passwordChangeHandler} ref={this.setPasswordRef} />
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

const mapStateToProps = (state) => {
    return {main: state}
}

export default  connect(mapStateToProps)(Form);