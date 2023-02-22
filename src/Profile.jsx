import { connect } from "react-redux";
import AddFood from "./AddFood";
import FoodList from "./FoodList";

function Profile (props) {

    return <div>
        <h2> User Details </h2>
        <div> Email:- {props.main.user?.email} </div>
        <div> Name:- {props.main.user?.name} </div>
        <AddFood/>
        <FoodList userID={props.main.user?._id} />
    </div>

}

const mapStateToProps = (state) => {
    return {main: state}
}

export default connect(mapStateToProps)(Profile);