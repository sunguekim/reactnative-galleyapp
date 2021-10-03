import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Badge {
    name: string;
    color: string;
    size: number
}

const IconWithBadge = (props: Badge) => {

    const { name,  color, size } = props
    return (
        <View style={styles.container}>
            <Ionicons name={name} size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
        margin: 5,
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default IconWithBadge;
