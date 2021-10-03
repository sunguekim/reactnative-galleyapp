import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './screens/HomeScreen'
import UploadScreen from './screens/UploadScreen';
import Header from './components/Header';
import { createFluidNavigator } from "react-navigation-fluid-transitions";
import PostDetailScreen from './screens/PostDetailScreen';
import SearchScreen from './screens/SearchScreen';

const Appstack = createStackNavigator();


const SearchStackScreen = () => {

    return (
        <Appstack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#f0f0f5'
                },
            }}
            initialRouteName="SearchHome"
        >
            <Appstack.Screen
                name="SearchHome"
                component={SearchScreen} />
            <Appstack.Screen
                name='Detail'
                component={PostDetailScreen}
            />
        </Appstack.Navigator>
    )
}

export default SearchStackScreen;
