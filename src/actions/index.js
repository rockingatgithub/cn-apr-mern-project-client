import Cookies from "js-cookie"

export const userLogin = (user, userType, type) => {

    return async (dispatch, getState) => {
        const response = await fetch(`http://localhost:8000/${userType}/${type}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedRes = await response.json()
        console.log("the user", parsedRes)
        if(response.status === 200) {
            dispatch(setUser(parsedRes.client))
            document.cookie = 'user=' + parsedRes.token
        }
    }

}

export const userProfile = () => {
    return async (dispatch, getState) => {

        const token = Cookies.get('user')
        if (token) {
            const response = await fetch('http://localhost:8000/profile', {
                headers : {
                'Authorization': 'Bearer ' + Cookies.get('user') 
                }
            })
            const parsedResponse = await response.json()
            console.log("the response", parsedResponse)
            if(response.status === 200){
                dispatch(setUser(parsedResponse.user))
            }
        }

    }
}

export const fetchFood = () => {

    return async (dispatch, getState) => {

        const response = await fetch('http://localhost:8000/food/allFood')
        const parsedResponse = await response.json()

        if(response.status === 200) {
            dispatch(setFood(parsedResponse.foods))
        }

    }

}

export const setFood = (foods) =>  {
    return { type: 'SET_FOOD', data: {foods} }
} 

export const setUser = (user) =>  {
    return { type: 'SET_USER', data: {user, isLoggedIn: true} }
} 

export const multiply = (num) =>  {
    return { type: 'MUL', data: num }
} 

export const increment = (num) =>  {
    return { type: 'INC', data: num }
}