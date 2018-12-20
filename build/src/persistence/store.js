var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { applyMiddleware, createStore } from "redux";
import axios from 'axios';
import axiosMiddleWare from 'redux-axios-middleware';
import rootReducer from './reducers';
import { AsyncStorage } from 'react-native';
const token = () => __awaiter(this, void 0, void 0, function* () { return yield AsyncStorage.getItem('token'); });
const client = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',
    responseType: 'json',
    headers: token() ? {
        common: {
            'Authorization': "bearer " + token()
        }
    } : {}
});
const initialState = {};
const middleware = [axiosMiddleWare(client)];
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
export default store;
//# sourceMappingURL=store.js.map