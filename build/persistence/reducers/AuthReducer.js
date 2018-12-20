var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CHECK_EMAIL_EXISTS, LOGIN, REGISTER } from "../actions/types";
const token = () => __awaiter(this, void 0, void 0, function* () { return yield AsyncStorage.getItem('token'); });
const initialState = (token => ({
    isAuthenticating: false,
    token: token ? token : null,
    emailExists: false,
    authErrorMessage: null
}))();
export default function (state = initialState, action) {
    switch (action.type) {
        case CHECK_EMAIL_EXISTS:
        case LOGIN:
        case REGISTER:
        default:
            return state;
    }
}
//# sourceMappingURL=AuthReducer.js.map