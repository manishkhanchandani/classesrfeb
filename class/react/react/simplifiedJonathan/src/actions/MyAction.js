import MC from '../constants/MyConstant.js';

export const setApiData = (data) => {
    return {
        type: MC.SET_API_DATA,
        payload: data
    };
};

export const setLoading = (number) => {
    return {
        type: MC.SET_LOADING,
        payload: number
    };
};

