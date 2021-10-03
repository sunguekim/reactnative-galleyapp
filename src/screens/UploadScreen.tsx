import React, { useState, useEffect } from 'react'
import { Alert, Image, View, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native'
import { Rating, SwipeRatingProps } from 'react-native-ratings';
import { Input, Button } from 'galio-framework'
import { useDispatch, useSelector } from 'react-redux';
import { ADDIMAGE } from '../redux/module/gallery/gallery';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { Category } from '../components/Category';
import { DayTime } from '../components/DayTime';

interface Images {
    route: { params: { img: string } },
}


const { width, height } = Dimensions.get('window')

export default function UploadScreen({ route: { params: { img } } }: Images) {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const navigation = useNavigation();
    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('');
    const [rating, setRating] = useState(2.5);
    const [category, setCategory] = useState('');
    const [time, setTime] = useState('')

    const onSubmit = async () => {
        if (time.length === 0 || category.length === 0 || title.length === 0) {
            Alert.alert('선택을 완료해주세요')
        } else {
            dispatch(ADDIMAGE({
                payload: {
                    imageUrl: img,
                    title: title,
                    category: category,
                    rating: rating,
                    description: caption,
                    time: time,
                    id: user.user?.uid,
                    createdAt: new Date().getTime()
                }
            }));
            (function () {
                navigation.navigate('Home')
            })()
        }

    }

    // console.log("Upload!!!!!!!!!!!!!:" + img)
    return (

        <ScrollView style={styles.container}>
            <View style={styles.image}>
                <Image
                    style={styles.stretch}
                    source={{ uri: img }} />
            </View>
            <TextInput style={styles.input}
                placeholder='제목을 입력해주세요'
                onChangeText={setTitle} />
            <TextInput style={styles.input}
                multiline={true}
                numberOfLines={10}
                placeholder='글을 입력해주세요'
                onChangeText={setCaption} />
            <Rating
                type='star'
                showRating
                onFinishRating={(value: number) => { setRating(value) }}
                fractions
                ratingBackgroundColor='#FFF'
            />
            <View style={{ paddingBottom: 0 }}>
                <DayTime
                    onTap={(item: { name: React.SetStateAction<string>; }) => setTime(item.name)}
                />

            </View>
            <Category
                onTap={(item: { name: React.SetStateAction<string>; }) => setCategory(item.name)}
            />
            <View style={styles.btnFlex}>
                <TouchableOpacity style={styles.touchabelBtn} onPress={onSubmit}>
                    <Text style={styles.btnText}>작성하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffffff2',
    },
    image: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 8,
        width: width,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 16
    },
    stretch: {
        width: '100%',
        height: height - 500,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    btnFlex: {
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchabelBtn: {
        padding: 10,
        borderRadius: 7,
        shadowColor: 'gray',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.5,
        elevation: 5,
        backgroundColor: 'purple',
        width: 200,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    uploadBtn: {

    }
})
