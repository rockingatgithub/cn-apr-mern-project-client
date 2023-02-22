const initialState = {
    counter: 0,
    isLoggedIn: false,
    user: {},
    foods: [],
}


function mainReducer (state=initialState, actions) {

    switch (actions.type) {
        case 'INC':
            return { ...state, counter: state.counter + actions.data }
        case 'DEC':
            return { ...state, counter: state.counter - actions.data }
        case 'MUL':
            return { ...state, counter: state.counter * actions.data }
        case 'SET_USER':
            return {...state, ...actions.data}
        
        case 'SET_FOOD':
            return {...state, ...actions.data}
    
        default:
            return { ...state }
    }

}

export default mainReducer