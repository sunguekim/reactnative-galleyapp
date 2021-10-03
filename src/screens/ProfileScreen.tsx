import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SetProfie, SIGNOUT } from '../redux/module/user/user';
import { RootState } from '../redux/rootReducer';

import { NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';


import { launchImageLibrary } from 'react-native-image-picker'
import { defaultImg, icon } from '../assets/icon';

export interface ProfileNavigationProps {
    navigation: StackNavigationProp<NavigationParams, 'Profile'>
}


const ProfileScreen = ({ navigation: { navigate } }: ProfileNavigationProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user)

    const onSignout = () => {
        dispatch(SIGNOUT());
    }

    const onUpload = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
                return Alert.alert('오류가 발생했습니다.')
            } else {
                if (response.uri !== undefined) {
                    dispatch(SetProfie({ id: user?.uid, image: response.uri }))
                } else {
                    return console.log('취소')
                }
            }
        });
    }
    
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity style={styles.avatar} onPress={onUpload} >
                    <Image source={{ uri: user?.photoURL }} style={styles.image} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>{user?.email}</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => { navigate('Info', { email: user?.email }) }}>
                        <Text>내정보 수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => { navigate('Chart') }}>
                        <Text>통계</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={onSignout}>
                        <Text>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 63,
        alignSelf: 'center',
        borderWidth: 4,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name2: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
})


export default ProfileScreen;
