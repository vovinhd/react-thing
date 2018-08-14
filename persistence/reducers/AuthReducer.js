import {
    CHECK_EMAIL_EXISTS,
    LOGIN,
    REGISTER
} from "../actions/types";

const token = async() => await AsyncStorage.getItem('token');


const initialState = (token => ({
    isAuthenticating: false,
    token: token ? token : null,
    emailExists: false,
    authErrorMessage: null
}))();

export default function (state = initialState, action) {
    switch (action.type){
        default:
            return state;
    }
}