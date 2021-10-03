import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationActions, StackActions } from 'react-navigation';

import LandingScreen from './screens/LandingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';



import ProfileScreen from './screens/ProfileScreen';

import CategoryStackScreen from './CategoryStackScreen';
import HomeStackScreen from './HomeStackScreen';
import SearchScreen from './screens/SearchScreen';

import { useDispatch, useSelector } from 'react-redux';
import { SETUSER } from './redux/module/user/user';
import SignupScreen from './screens/SignupScreen';
import LandingScreenStack from './LandingScreenStack';
import { RootState } from './redux/rootReducer';
import UploadScreen from './screens/UploadScreen';
import InfoStackScreen from './InfoStackScreen';
import SearchStackScreen from './SearchStackScreen';


const Appstack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Routes = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);


    const tabBarListeners = ({ navigation, route }: any) => ({
        tabPress: () => navigation.navigate(route.name),
    });

    useEffect(() => {
        auth().onAuthStateChanged(userState => {
            setUser(userState);
            if (userState !== null) {
                console.log(userState.providerData)
                dispatch(SETUSER({ displayName: userState?.displayName, email: userState.email, uid: userState.uid }))
            };
            if (loading) {
                setLoading(false);
            };
        });
    }, []);

    if (loading) {
        return (
            <>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>Loading.....</Text>
                </View>
            </>
        )
    };

    return (
        <>
            {user ?
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            swipeEnabled: true,
                            tabBarIcon: ({ focused, color, size }) => {
                                let IconComponent = Ionicons
                                let iconName = '';
                                if (route.name === 'Home') {
                                    iconName = 'ios-home';
                                } else if (route.name === 'Category') {
                                    iconName = 'ios-albums-outline';
                                } else if (route.name === 'Profile') {
                                    iconName = 'ios-body-outline';
                                } else if (route.name === 'Search') {
                                    iconName = 'ios-search-outline';
                                };
                                return (
                                    <IconComponent
                                        name={iconName}
                                        size={focused ? 20 : 25}
                                        color={color}
                                    />
                                )
                            }
                        })}
                        tabBarOptions={{
                            activeTintColor: 'white',
                            inactiveTintColor: 'gray',
                            style: {
                                backgroundColor: 'black'
                            }
                        }}
                    >
                        <Tab.Screen name="Home" component={HomeStackScreen} listeners={tabBarListeners} options={{ tabBarLabel: '홈' }} />
                        <Tab.Screen name="Category" component={CategoryStackScreen} listeners={tabBarListeners} options={{ tabBarLabel: '카테고리' }} />
                        <Tab.Screen name="Search" component={SearchStackScreen} listeners={tabBarListeners} options={{ tabBarLabel: '검색' }} />
                        <Tab.Screen name="Profile" component={InfoStackScreen} listeners={tabBarListeners} options={{ tabBarLabel: '프로필' }} />
                    </Tab.Navigator>
                </NavigationContainer > :
                <LandingScreenStack />
            }
        </>
    )

    // if (!user) {
    //     return (
    //         <NavigationContainer>
    //              <LandingScreenStack /> 
    //         </NavigationContainer>
    //     )
    // };
    // if (user) {
    //     return (
    //         <>
    //             <NavigationContainer>
    //                 <Tab.Navigator
    //                     screenOptions={({ route }) => ({
    //                         swipeEnabled: true,
    //                         tabBarIcon: ({ focused, color, size }) => {
    //                             let IconComponent = Ionicons
    //                             let iconName = '';
    //                             if (route.name === 'Home') {
    //                                 iconName = 'ios-home';
    //                             } else if (route.name === 'Category') {
    //                                 iconName = 'ios-albums-outline';
    //                             } else if (route.name === 'Profile') {
    //                                 iconName = 'ios-body-outline';
    //                             } else if (route.name === 'Search') {
    //                                 iconName = 'ios-search-outline';
    //                             };
    //                             return (
    //                                 <IconComponent
    //                                     name={iconName}
    //                                     size={focused ? 20 : 25}
    //                                     color={color}
    //                                 />
    //                             )
    //                         }
    //                     })}
    //                     tabBarOptions={{
    //                         activeTintColor: 'white',
    //                         inactiveTintColor: 'gray',
    //                         style: {
    //                             backgroundColor: 'black'
    //                         }
    //                     }}
    //                 >
    //                     <Tab.Screen name="Home" component={HomeStackScreen} listeners={tabBarListeners} />
    //                     <Tab.Screen name="Category" component={CategoryStackScreen} listeners={tabBarListeners} />
    //                     <Tab.Screen name="Search" component={SearchStackScreen} listeners={tabBarListeners} />
    //                     <Tab.Screen name="Profile" component={InfoStackScreen} listeners={tabBarListeners} />
    //                 </Tab.Navigator>
    //             </NavigationContainer >
    //         </>
    //     )
    // };
};


export default Routes;
