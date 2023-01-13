import React, { Component, useState } from 'react';


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
    <span>{food.name}</span>
    Price:- <span>{food.price}</span>

    <input type="number" value={quantity}  onChange={(event) => setQuantity(event.target.value)} />

    <button onClick={() => orderFoodHandler(food._id)} > Order  </button>
     </li>

} 

class FoodList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foods: [],
        }
    }

    componentDidMount = async () => {
        const response = await fetch('http://localhost:8000/food/allFood')
        const parsedResponse = await response.json()

        if(response.status === 200) {
            this.setState({ foods: parsedResponse.foods})
        }
    }
    
    

    render() {

        const {foods} = this.state

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

export default FoodList;