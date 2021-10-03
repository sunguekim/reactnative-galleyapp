import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'



interface CameraOptions {
    mediaType: 'photo' | 'video';
    maxWidth?: number;
    maxHeight?: number;
    quality?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
    videoQuality?: 'low' | 'high';
    durationLimit?: number;
    cameraType?: 'back' | 'front';
    includeBase64?: boolean;
    saveToPhotos?: boolean;
}


const useCamera = () => {
    const [uri, setUri] = useState('')
    const navigation = useNavigation();

    const options: CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: false
    }

    const taketPicure = () => {
        launchCamera(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return Alert.alert('취소했습니다')
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
                return Alert.alert(`${response.errorMessage}`)
            } else {
                if (response.uri !== undefined) {
                    return navigation.navigate('Upload', { img: response.uri })
                } else {
                    return Alert.alert('취소했습니다')
                }
            }
        });
    };


    const takeImage = () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return Alert.alert('취소했습니다')
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
                return Alert.alert(`${response.errorMessage}`)
            } else {
                if (response.uri !== undefined) {
                    (function () {
                        navigation.navigate('Upload', { img: response.uri })
                    })()
                    // return navigation.navigate('Upload', { img: response.uri })
                } else {
                    return Alert.alert('취소했습니다')
                }
            }
        });
    };

    

    return { taketPicure, takeImage }
}

export default useCamera
