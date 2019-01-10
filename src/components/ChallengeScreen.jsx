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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_base_1 = require("native-base");
var ChallengeScreen = /** @class */ (function (_super) {
    __extends(ChallengeScreen, _super);
    function ChallengeScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChallengeScreen.prototype.render = function () {
        return (<react_native_1.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <react_native_1.Text>ChallengeScreen</react_native_1.Text>
            </react_native_1.View>);
    };
    ChallengeScreen.navigationOptions = {
        title: 'Challenge',
        tabBarIcon: function (_a) {
            var focused = _a.focused, tintColor = _a.tintColor;
            return (<native_base_1.Icon name='star' style={{ fontSize: 20, color: tintColor }}/>);
        },
    };
    return ChallengeScreen;
}(react_1.default.Component));
;
exports.default = ChallengeScreen;
