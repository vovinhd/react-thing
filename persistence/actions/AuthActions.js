import {
    CHECK_EMAIL_EXISTS,
    REGISTER,
    LOGIN
} from "./types";

export function checkEmailExists () {
    return {
        types: ['CHECK_EMAIL_EXISTS'],
        payload: {
            request:{
                url:'/checkEmail'
            }
        }
    }
}