import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, Card, Input, Button } from 'galio-framework'

import { useDispatch, useSelector } from 'react-redux';
import { SIGNUP, SETERROR } from '../redux/module/user/user'
import { RootState } from '../redux/rootReducer';

import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { SignUpRequest } from '../redux/module/user/type';



const LandingScreen = () => {


    const [title, setTitle] = useState('로그인');
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (error.length > 0) {
            Alert.alert('회원가입 실패', error, [{ text: 'OK', onPress: () => dispatch(SETERROR('')) }])
        }
    }, [error, dispatch])

    const onSignup = (values: { email: string; password: string; displayName: string; }) => {
        dispatch(SIGNUP({ email: values.email, password: values.password, displayName: values.displayName }));
    }

    const SingupSchema = Yup.object().shape({
        email: Yup.string().email('유효하지 않은 이메일입니다').required('입력을 완료해주세요'),
        password: Yup.string()
            .min(2, '2글자 이상 입력해주세요')
            .max(10, '10글자 이하로 입력해주세요')
            .required('입력을 완료해주세요'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다"),
        displayName: Yup.string()
            .min(3, '3글자 이상입력해주세요')
            .max(6, '6글자 이하로 입력해주세요')
            .required('입력을 완료해주세요')
    })

    return (
        <Formik
            validationSchema={SingupSchema}
            initialValues={{ email: '', password: '', confirmPassword: '', displayName: '' }}
            onSubmit={values => onSignup(values)}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <View style={style.container}>
                    <Input placeholder='Email' placeholderTextColor="#525050ef" value={values.email} onChangeText={handleChange('email')} />
                    {errors.email &&
                        <Text style={style.txtStyle}>{errors.email}</Text>
                    }
                    <Input placeholder="비밀번호" placeholderTextColor="#525050ef" value={values.password} onChangeText={handleChange('password')} password viewPass />
                    {errors.password &&
                        <Text style={style.txtStyle}>{errors.password}</Text>
                    }
                    <Input placeholder="비밀번호 확인" placeholderTextColor="#525050ef" value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} password viewPass />
                    {errors.confirmPassword &&
                        <Text style={style.txtStyle}>{errors.confirmPassword}</Text>
                    }
                    <Input placeholder="이름" placeholderTextColor="#525050ef" value={values.displayName} onChangeText={handleChange('displayName')} />
                    {errors.displayName &&
                        <Text style={style.txtStyle}>{errors.displayName}</Text>
                    }
                    {loading ?
                        <Text>
                            loading....
                        </Text> :
                        <Button round uppercase color="#50C7C7"  onPress={() => { handleSubmit() }} height={50} width={350} style={{ marginLeft: 0 }}>가입하기</Button>}
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
    },
    txtStyle:{
        fontSize: 12,
         color: '#FF0D10'
    }
})
export default LandingScreen;
