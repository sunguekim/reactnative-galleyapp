import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { GalleryImage } from '../redux/module/gallery/type';
import { NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import StarRating from 'react-native-star-rating';



import { icon } from '../assets/icon';

interface CardProps {
    item: GalleryImage
    navigation: StackNavigationProp<NavigationParams, 'Home'>
}



let width = Dimensions.get('window').width * 0.9;

const CardInfo = ({ item, navigation: { navigate } }: CardProps) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate('Detail', { data: item })}>
                <View key={Date.now()} style={styles.card} >
                    <Image style={styles.stretch} source={{ uri: item.imageUrl }} />

                    <View style={styles.cardInfo}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.subText}>
                                        시간대:{item.time}
                                    </Text> 
                                </View>
                                <Image style={{ width: 30, height: 30 }} source={icon[item.category] ?? icon['defaultImg']} />
                            </View>

                            <View style={{ flexDirection: 'column', paddingLeft: 6 }}>
                                <Text style={styles.titleText}>{item.description.substring(0, 9) + '....'}</Text>
                                <Text style={styles.subText}>{new Date(item.createdAt).toLocaleString("ko", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
                                <StarRating
                                    rating={item.rating}
                                    disabled={true}
                                    fullStarColor={'yellow'}
                                    emptyStarColor={'transparent'}
                                    starSize={20}
                                    containerStyle={styles.starStyle}
                                />
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20,
        paddingLeft: 0,
        paddingRight: 0
    },
    card: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: width,
        height: width * 0.9,
        paddingLeft: 0,
        borderRadius: 10,
    },
    cardInfo: {
        position: 'absolute',
        bottom: 20,
        left: 10
    },
    stretch: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        height: width * 0.9,
    },
    titleText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 28
    },
    subText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 18
    },
    starStyle: {
        height: 20,
        width: 60
    }
})

export default CardInfo;
