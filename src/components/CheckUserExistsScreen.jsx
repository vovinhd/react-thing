"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var native_base_1 = require("native-base");
var expo_1 = require("expo");
var api_1 = require("../network/api");
var CheckUserExistsScreen = /** @class */ (function (_super) {
    __extends(CheckUserExistsScreen, _super);
    function CheckUserExistsScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.componentWillMount = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expo_1.default.Font.loadAsync({
                            Roboto: require("native-base/Fonts/Roboto.ttf"),
                            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
                        })];
                    case 1:
                        _a.sent();
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.checkUserExists = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("check " + this.state.email);
                console.log(this.state);
                api_1.default.checkEmailExists(this.state.email, function (res) {
                    console.log(res.data.status == true);
                    if (res.status === 200) {
                        _this.props.navigation.navigate(res.data.status === "true" ? 'LoginScreen' : 'SignUpScreen', { email: _this.state.email });
                    }
                }, function (err) {
                    console.error(err);
                });
                return [2 /*return*/];
            });
        }); };
        _this.state = {
            loading: true,
            email: '',
        };
        return _this;
    }
    CheckUserExistsScreen.prototype.render = function () {
        var _this = this;
        if (this.state.loading) {
            return (<expo_1.default.AppLoading />);
        }
        return (<native_base_1.Container style={{ paddingTop: expo_1.Constants.statusBarHeight }}>
                <native_base_1.Form>
                    <native_base_1.Item floatingLabel>
                        <native_base_1.Label>Email</native_base_1.Label>
                        <native_base_1.Input onChangeText={function (text) { return _this.setState({ email: text }); }} value={this.state.email}/>
                    </native_base_1.Item>
                    <native_base_1.Button full primary style={{ paddingBottom: 4 }} onPress={function () { return _this.checkUserExists(); }}>
                        <native_base_1.Text> Next </native_base_1.Text>
                    </native_base_1.Button>
                </native_base_1.Form>
            </native_base_1.Container>);
    };
    ;
    CheckUserExistsScreen.navigationOptions = {
        title: 'Please sign in'
    };
    return CheckUserExistsScreen;
}(react_1.Component));
exports.default = CheckUserExistsScreen;
