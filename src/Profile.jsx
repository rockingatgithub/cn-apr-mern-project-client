function Profile (props) {

    return <div>
        <h2> User Details </h2>
        <div> Email:- {props.user.email} </div>
        <div> Name:- {props.user.name} </div>

    </div>

}

export default Profile;