import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { Text, Card, Input, Button } from 'galio-framework'

import { useDispatch, useSelector } from 'react-redux';
import { SIGNUP, SETERROR, SIGNIN } from '../redux/module/user/user'
import { RootState } from '../redux/rootReducer';

import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { SignUpRequest } from '../redux/module/user/type';
import { NavigationParams } from 'react-navigation';

interface LandingProps {
    navigation: StackNavigationProp<NavigationParams, 'Login'>
}

const LandingScreen = ({ navigation: { navigate } }: LandingProps) => {

    
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (error.length > 0) {
            Alert.alert('회원가입 실패', error, [{ text: 'OK', onPress: () => dispatch(SETERROR('')) }])
        }
    }, [error, dispatch])

    const onSignin = (values: { email: string; password: string; displayName: string; }) => {
        
        dispatch(SIGNIN({ email: values.email, password: values.password }));
        
    }

    const SingupSchema = Yup.object().shape({
        email: Yup.string().email('유효하지 않은 이메일입니다').required('입력을 완료해주세요'),
        password: Yup.string()
            .min(2, '2글자 이상 입력해주세요')
            .max(10, '10글자 이하로 입력해주세요')
            .required('입력을 완료해주세요'),
    })

    return (
        <Formik
            validationSchema={SingupSchema}
            initialValues={{ email: '', password: '', displayName: '' }}
            onSubmit={values => onSignin(values)}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <View style={style.container}>
                    <Input placeholder='Email' placeholderTextColor="#525050ef" value={values.email} onChangeText={handleChange('email')} />
                    {errors.email &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                    }
                    <Input placeholder="비밀번호" placeholderTextColor="#525050ef" value={values.password} onChangeText={handleChange('password')} password viewPass />
                    {errors.password &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                    }
                    <Button round uppercase color="#50C7C7" onPress={() => { handleSubmit() }} height={50} width={350} style={{ marginLeft: 0 }}>로그인</Button>
                    <TouchableOpacity onPress={() => navigate('SignUp')}>
                        <Text>
                            회원가입
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>

    );
}

const style = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default LandingScreen;
