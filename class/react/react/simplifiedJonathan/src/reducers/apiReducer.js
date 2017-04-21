

const apiReducer = (state = {loading: 1}, action) => {

    switch (action.type) {
        case 'SET_API_DATA':
            state = {
                ...state,
                data: action.payload
            };
            break;
        case 'STOP_LOADING':
            state = {
                ...state,
                loading: 0
            };
            break;
        default:
            break;
    }
    return state;

}

export default apiReducer;