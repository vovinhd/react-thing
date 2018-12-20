import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from "native-base";
class ChallengeScreen extends React.Component {
    render() {
        return (React.createElement(View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' } },
            React.createElement(Text, null, "ChallengeScreen")));
    }
}
ChallengeScreen.navigationOptions = {
    title: 'Challenge',
    tabBarIcon: ({ focused, tintColor }) => (React.createElement(Icon, { name: 'star', style: { fontSize: 20, color: tintColor } })),
};
;
export default ChallengeScreen;
//# sourceMappingURL=ChallengeScreen.js.map