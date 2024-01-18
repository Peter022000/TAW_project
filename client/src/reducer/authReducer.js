import {CHANGE_PASSWORD_SUCCESS, EXPIRED, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../types/authTypes';

const initialState = {
    token: '',
    email: '',
    expirationTime: '',
    creationTime: '',
    role: '',
    isLogged: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                token: action.payload.token,
                email: action.payload.email,
                expirationTime: action.payload.expirationTime,
                creationTime: action.payload.creationTime,
                role: action.payload.role,
                isLogged: true
            };
        case LOGOUT_SUCCESS:
        case EXPIRED:
        case CHANGE_PASSWORD_SUCCESS:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
