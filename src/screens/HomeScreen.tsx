import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, SafeAreaView, Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/rootReducer';

import { GETIMAGESTART } from '../redux/module/gallery/gallery';
import CardInfo from '../components/CardInfo';
import { NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { GETUESERDATA } from '../redux/module/user/user';


export interface HomeNavigationProps {
    navigation: StackNavigationProp<NavigationParams, 'Home'>
}

const HomeScreen = ({ navigation }: HomeNavigationProps) => {

    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const user = useSelector((state: RootState) => state.user.user)
    const { images, isLoading } = useSelector((state: RootState) => state.gallery)


    useEffect(() => {
        dispatch(GETUESERDATA({ id: user?.uid }))
        if (!isLoading) {
            const uid = user?.uid;
            dispatch(GETIMAGESTART(uid));
        }

    }, []);

    const refresh = () => {
        if (user !== null) {
            dispatch(GETIMAGESTART(user.uid));
        }
    };

    const renderItem = ({ item }: any) => (
        <CardInfo item={item} navigation={navigation} />
    );

    return (
        <SafeAreaView style={style.container}>
            <View style={style.body}>
                <FlatList
                    data={images}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
                    }

                />
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 20
    },
    body: {
        flex: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
export default HomeScreen;
