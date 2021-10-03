import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import LeftIcon from 'react-native-vector-icons/Entypo';
import RightIcon from 'react-native-vector-icons/AntDesign';

import useCamera from './camera/useCamera';



const Header = () => {

    const { takeImage, taketPicure } = useCamera()

    return (
        <View style={styles.header}>
            <LeftIcon name='camera' size={28} style={styles.leftSide} onPress={taketPicure} />
            <RightIcon name='form' size={28} style={styles.rightSide} onPress={takeImage} />
            <View>
                <Text style={styles.headerText}>Home</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: 1,
    },
    leftSide: {
        position: 'absolute',
        paddingLeft: 0,
        paddingRight: 0,
        left: 6
    },
    rightSide: {
        position: 'absolute',
        paddingLeft: 0,
        paddingRight: 0,
        right: 0
    }
})

export default Header;
