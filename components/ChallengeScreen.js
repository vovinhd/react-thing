import React from 'react';
import {Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge} from 'native-base';
import {SeasonPlanComponent} from "./SeasonView/SeasonPlanComponent";
import {SeasonComponent} from "./SeasonView/SeasonComponent";
import {HistoryComponent} from "./SeasonView/HistoryComponent";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

const ChallengeViewsNav = createMaterialBottomTabNavigator(
    {
        SeasonPlan: {
            screen: SeasonPlanComponent
        },
        Season: {
            screen: SeasonComponent
        },
        History: {
            screen: HistoryComponent
        }
    }, {}
)

class ChallengeScreen extends React.Component {
    static navigationOptions = {
        title: 'Challenge',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name='star' style={{fontSize: 20, color: tintColor}}/>
        ),
    };

    render() {
        return (
            <Container>
                <ChallengeViewsNav/>
            </Container>
        );
    }

};

export default ChallengeScreen;
