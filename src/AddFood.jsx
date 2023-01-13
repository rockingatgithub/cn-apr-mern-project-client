import Cookies from "js-cookie";
import React, { Component } from "react";

class AddFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: ''
        }
    }

    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    } 

    priceChangeHandler = (event) => {
        this.setState({
            price: event.target.value
        })
    }

    addFoodHandler = async (event) => {
        event.preventDefault()
        const {name, price} = this.state
        const food = {
            price : Number(price),
            name,
        }

        const response = await fetch('http://localhost:8000/food/addFood', {
            method: 'POST',
            body: JSON.stringify(food),
            headers : {
                'Authorization': 'Bearer ' + Cookies.get('user'),
                'Content-Type': 'application/json'
            }
        })
        const parsedRes = await response.json()

        console.log(parsedRes)

    }

    render() {

        return <div>
            <form onSubmit={this.addFoodHandler} >
                <input type="text" value={this.state.name} onChange={this.nameChangeHandler} />
                <input type="price" value={this.state.price} onChange={this.priceChangeHandler} />
                <button type="submit" >Add food</button>
            </form>
        </div>

    }
    

}

export default AddFood