import AddFood from "./AddFood";
import FoodList from "./FoodList";

function Profile (props) {

    return <div>
        <h2> User Details </h2>
        <div> Email:- {props.user.email} </div>
        <div> Name:- {props.user.name} </div>
        <AddFood/>
        <FoodList userID={props.user._id} />
    </div>

}

export default Profile;