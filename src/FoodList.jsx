import { connect } from 'react-redux';
import React, { Component, useState } from 'react';
import { fetchFood } from './actions';
import { Theme } from './App';


const FoodItem = ({ food, userID, foodId  }) => {

    const [quantity, setQuantity] = useState(1)

    const orderFoodHandler = async () => {

        const orderObj = {
            food: foodId,
            quantity,
            customer: userID
        }

        const response = await fetch('http://localhost:8000/order/foodOrder', {
            method: 'post',
            body: JSON.stringify(orderObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedRes = await response.json()
        alert("food ordered succssfully")


    }

    return <li> 

    <Theme.Consumer>{value=><div>{value}</div>}</Theme.Consumer>

    <span>{food.name}</span>
    Price:- <span>{food.price}</span>

    <input type="number" value={quantity}  onChange={(event) => setQuantity(event.target.value)} />

    <button onClick={() => orderFoodHandler(food._id)} > Order  </button>
     </li>

} 

class FoodList extends Component {

    componentDidMount = async () => {
        this.props.dispatch(fetchFood())
    }

    render() {

        const {foods} = this.props.main

        return (
            <div>
                <h2>Foods available:-</h2>
                <ul>
                    { foods.map(food => <FoodItem food={food} userID={this.props.userID} foodId={food._id} /> )  }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { main: state }
}

export default connect(mapStateToProps)(FoodList);