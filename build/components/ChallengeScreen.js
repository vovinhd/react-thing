import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { StyleSheet } from "react-native";
import { Constants } from "expo";
class ChallengeScreen extends Component {
    render() {
        return (React.createElement(Container, null,
            React.createElement(Header, null),
            React.createElement(Content, null),
            React.createElement(Footer, null,
                React.createElement(FooterTab, null,
                    React.createElement(Button, { vertical: true },
                        React.createElement(Icon, { name: "apps" }),
                        React.createElement(Text, null, "Apps")),
                    React.createElement(Button, { vertical: true },
                        React.createElement(Icon, { name: "camera" }),
                        React.createElement(Text, null, "Camera")),
                    React.createElement(Button, { vertical: true, active: true },
                        React.createElement(Icon, { active: true, name: "navigate" }),
                        React.createElement(Text, null, "Navigate")),
                    React.createElement(Button, { vertical: true },
                        React.createElement(Icon, { name: "person" }),
                        React.createElement(Text, null, "Contact"))))));
    }
}
ChallengeScreen.navigationOptions = {
    title: 'Challenge',
    tabBarIcon: ({ focused, tintColor }) => (React.createElement(Icon, { name: 'star', style: { fontSize: 20, color: tintColor } })),
};
;
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        height: 54 + Constants.statusBarHeight,
    },
    fillparent: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    }
});
export default ChallengeScreen;
//# sourceMappingURL=ChallengeScreen.js.map