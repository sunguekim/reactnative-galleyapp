import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './screens/HomeScreen'
import UploadScreen from './screens/UploadScreen';
import Header from './components/Header';
import { createFluidNavigator } from "react-navigation-fluid-transitions";
import PostDetailScreen from './screens/PostDetailScreen';

const Appstack = createStackNavigator();


const HomeStackScreen = () => {

    return (
        <Appstack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#f0f0f5'
                },
            }}
            initialRouteName="Home"
        >
            <Appstack.Screen name="Home"
                options={{
                    headerTitle: () => <Header />,
                }}

                component={Homescreen} />
            <Appstack.Screen name="Upload"
                options={{
                    title: 'Upload'
                }}
                component={UploadScreen}
            />
            <Appstack.Screen
                name='Detail'
                component={PostDetailScreen}
                options={{
                    headerShown: false
                }}
            />
        </Appstack.Navigator>
    )
}

export default HomeStackScreen;
