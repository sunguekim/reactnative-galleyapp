import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { icon } from '../assets/icon';

interface TimeProps {
    onTap: Function
}


const timeData = [
    {
        id: 1,
        title: '아침',
        icon: icon.breakfast,
        name: 'breakfast'
    },
    {
        id: 2,
        title: '점심',
        icon: icon.lunch,
        name: 'lunch'
    },
    {
        id: 3,
        title: '저녁',
        icon: icon.dinner,
        name: 'dinner'
    }
]

const DayTime = ({ onTap }: TimeProps) => {

    const [category, setSelectedCategory] = useState(null);

    const onPressAction = (item: any, onTap: Function) => {
        setSelectedCategory(item.id)
        console.log(item)
        onTap(item)
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={{
                padding: 10,
                paddingBottom: 0,
                backgroundColor: (category == item.id ? "#6c6afd" : "#2522f0"),
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
                data={timeData}
                horizontal
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 0
    }
})

export { DayTime }