import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';

let height = Dimensions.get('screen').height

interface CategoryProps {
    navigation: StackNavigationProp<NavigationParams, 'Category'>
}

const CatergoryScreen = ({ navigation: { navigate } }: CategoryProps) => {
    const user = useSelector((state: RootState) => state.user.user)
    const { images, isLoading } = useSelector((state: RootState) => state.gallery)

    return (
        <SafeAreaView style={styles.background}>
            <TouchableOpacity onPress={() => navigate('Gallery', { date: 'breakfast', item: images })}>
                <View style={styles.card}>
                    <ImageBackground source={require("../images/morningfood.jpeg")} style={styles.bgImage}>
                        <View style={styles.bfText}>
                            <Text style={styles.Text}>
                                Breakfast
                            </Text>
                        </View>
                    </ImageBackground >
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('Gallery', { date: 'lunch',item: images })}>
                <View style={styles.card}>
                    <ImageBackground source={require("../images/lunchfood.jpg")} style={styles.bgImage}>
                        <View style={styles.lcText}>
                            <Text style={styles.Text}>
                                Lunch
                            </Text>
                        </View>
                    </ImageBackground >
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('Gallery', { date: 'dinner',item: images })}>
                <View style={styles.card}>
                    <ImageBackground source={require("../images/dinnerfood.jpg")} style={styles.bgImage}>
                        <View style={styles.diText}>
                            <Text style={styles.Text}>
                                Dinner
                            </Text>
                        </View>
                    </ImageBackground >
                </View>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#000000'
    },
    container: {
        backgroundColor: '#fff'
    },
    card: {
        height: height / 3.67,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: 0,
        marginTop: 0,
    },
    bgImage: { marginTop: 0, marginBottom: 0, width: '100%', height: '98%', justifyContent: 'center' },
    bfText: {
        alignSelf: 'flex-end',
        right: 20
    },
    lcText: {
        left: 60
    },
    diText: {
        alignItems: 'center',
    },
    Text: {
        fontSize: 40
    }
})

export default CatergoryScreen;
