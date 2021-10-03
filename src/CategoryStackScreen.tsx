import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CatergoryScreen from './screens/CatergoryScreen';
import GalleryScreen from './screens/GalleryScreen';
const Appstack = createStackNavigator();

const CategoryStackScreen = () => {
    return (
        <Appstack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#f0f0f5'
                },
                headerShown: false
            }}
            initialRouteName="Category">
            <Appstack.Screen name="Category" component={CatergoryScreen} />
            <Appstack.Screen name="Gallery" component={GalleryScreen} options={{
                headerShown: true,
                headerTitle: '갤러리'
            }} />
        </Appstack.Navigator>
    );
}

export default CategoryStackScreen;
