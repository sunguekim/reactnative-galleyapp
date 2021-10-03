import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, TouchableOpacity, Button, RefreshControl } from 'react-native';
import CardInfo from '../components/CardInfo';
import { Category } from '../components/Category';
import { GalleryImage } from '../redux/module/gallery/type';

import { NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';

interface CategoryProps {
    route: { params: { date: string, item: GalleryImage[] } },
    navigation: StackNavigationProp<NavigationParams, 'Home'>
}


const GalleryScreen = ({ route: { params: { date, item } }, navigation }: CategoryProps) => {
    const [category, setCategory] = useState('')

    console.log(category)


    const listItem = category ? item.filter(a => a.time == date).filter(b => b.category == category) : item.filter(a => a.time == date)

    const renderItem = ({ item }: any) => (
        <CardInfo item={item} navigation={navigation} />
    )

    return (
        <SafeAreaView>
            <Category onTap={(item: { name: React.SetStateAction<string>; }) => { setCategory(item.name) }} />
            <View>
                <FlatList
                    data={listItem}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}

export default GalleryScreen;
