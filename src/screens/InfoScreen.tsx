import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';

import { NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';

import { useDispatch, useSelector } from 'react-redux';
import { ChangePassword } from '../redux/module/user/user';
import { RootState } from '../redux/rootReducer';


interface InfoProps {
    route: { params: { email: string } };
    navigation: StackNavigationProp<NavigationParams, 'Info'>
}

const InfoSreen = ({ route: { params: { email } }, navigation }: InfoProps) => {
    const dispatch = useDispatch()
    const name = useSelector((state: RootState) => state.user.user?.displayName)
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirm] = useState('');

    const onSubmit = async () => {
        if (pass !== confirmPass || pass.length == 0) {
            Alert.alert('비밀번호를 확인해주세요');
        } else {
            dispatch(ChangePassword(pass));
            navigation.goBack();
        };
    }

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.name}>
                    ID:{email}
                </Text>
                <Text style={styles.name}>
                    닉네임:{name}
                </Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyContent}>

                    <TextInput
                        placeholder="비밀번호"
                        onChangeText={setPass}
                        value={pass}
                        style={styles.textContainer} />

                    <TextInput
                        placeholder="비밀번호 확인"
                        onChangeText={setConfirm}
                        value={confirmPass}
                        style={styles.textContainer} />
                    <TextInput
                        placeholder="닉네임"
                        style={styles.textContainer} />

                    <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
                        <Text>수정하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
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
    textContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        borderColor: 'black'
    },
})

export default InfoSreen;
