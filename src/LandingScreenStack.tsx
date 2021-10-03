import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import SignupScreen from './screens/SignupScreen';

const Appstack = createStackNavigator();

export default function LandingScreenStack() {
    return (
        <NavigationContainer>
            <Appstack.Navigator
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    },
                    headerShown: false
                }}
                initialRouteName="Login"
            >
                <Appstack.Screen name="Login" component={LandingScreen} />
                <Appstack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: true, headerTitle: '회원가입' }} />
            </Appstack.Navigator>
        </NavigationContainer>
    )
}
