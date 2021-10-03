import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { icon } from '../assets/icon';

interface Category {
    onTap: Function;
}

const categoryData = [
    {
        id: 1,
        title: '한식',
        icon: icon.riceBowl,
        name: 'riceBowl'
    },
    {
        id: 2,
        title: '일식',
        icon: icon.sushi,
        name: 'sushi'

    },
    {
        id: 3,
        title: '중식',
        icon: icon.noodle,
        name: 'noodle'
    },
    {
        id: 4,
        title: '양식',
        icon: icon.westernFood,
        name: 'noodle'
    },
    {
        id: 5,
        title: '패스트푸드',
        icon: icon.hamburger,
        name: 'hamburger'
    },
    {
        id: 6,
        title: '카페',
        icon: icon.drink,
        name: 'drink'
    }
]

const Category = ({ onTap }: Category) => {

    const [category, setSelectedCategory] = useState(null)

    const renderItem = ({ item }: any) => {

        const onPressAction = (item: any, onTap: Function) => {
            setSelectedCategory(item.id)
            onTap(item)
        }

        return (
            <TouchableOpacity style={{
                padding: 10,
                paddingBottom: 0,
                backgroundColor: (category == item.id ? "#81ddfc" : "#00BFFF"),
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
            }} onPress={() => onPressAction(item, onTap)}>
                <View
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: (category == item.id) ? "#FFF" : "#F5F5F6"
                    }}
                >
                    <Image source={item.icon}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </View>
                <Text style={{
                    fontSize: 14,
                    marginTop: 10,
                    color: (category == item.id) ? "#FFF" : "#1E1F20"
                }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={categoryData}
                horizontal
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 20 }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 0,
        padding: 20,
        paddingBottom: 0
    },
})

export { Category }