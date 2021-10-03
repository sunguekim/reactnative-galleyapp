import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import InfoScreen from './screens/InfoScreen';
import ChartScreen from './screens/ChartScreen';
const Appstack = createStackNavigator();

const InfoStackScreen = () => {
    return (
        <Appstack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#f0f0f5'
                },
                headerShown: false
            }}
            initialRouteName="Profile">
            <Appstack.Screen name="Profile" component={ProfileScreen} />
            <Appstack.Screen name="Info" component={InfoScreen} options={{
                headerShown: true,
                headerTitle: '정보수정'
            }} />
            <Appstack.Screen name="Chart" component={ChartScreen} options={{
                headerShown: true,
                headerTitle: '통계'
            }} />
        </Appstack.Navigator>
    );
}

export default InfoStackScreen;
