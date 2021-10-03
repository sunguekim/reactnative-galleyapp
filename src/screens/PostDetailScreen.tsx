import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';
import { GalleryImage } from '../redux/module/gallery/type';
import StarRating from 'react-native-star-rating';
import { icon } from '../assets/icon';

const { height, width } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

interface ItemProps {
    route: { params: { data: GalleryImage } },
}


const PostDetailScreen = ({ route: { params: { data } } }: ItemProps) => {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.stretch} source={{ uri: data.imageUrl }} />
                <View style={styles.starContainer}>
                    <Text
                        style={{
                            color: '#ffffff',
                            fontSize: 24,
                            fontWeight: 'bold',
                            lineHeight: 28
                        }}
                    >Rating:</Text>
                    <StarRating
                        rating={data.rating}
                        disabled={true}
                        fullStarColor={'yellow'}
                        emptyStarColor={'transparent'}
                        starSize={20}
                        containerStyle={styles.starStyle}
                    />
                </View>
            </View>
            <View
                style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 20 }}
            >
                <Image style={{ width: 30, height: 30, paddingRight: 5 }} source={icon[data.category] ?? icon['defaultImg']} />
                <Image style={{ width: 30, height: 30 }} source={icon[data.time] ?? icon['defaultImg']} />

                <View style={{ flexDirection: 'column', paddingLeft: 6 }} >
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 24,
                            fontWeight: 'bold',
                            lineHeight: 28
                        }}
                    >
                        {data.title}
                    </Text>
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: 'bold',
                            lineHeight: 18
                        }}
                    >
                        {new Date(data.createdAt).toLocaleString("ko", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </Text>
                </View>
            </View>

            <ScrollView
                indicatorStyle='white'
                style={{
                    paddingHorizontal: 20,
                    backgroundColor: '#ffff',
                    borderColor: '#000',
                    borderWidth: 1,
                    borderRadius: 20
                }}
                contentContainerStyle={{ paddingVertical: 20 }}
            >
                <Text>
                    {data.description}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    stretch: {
        width: '100%',
        height: ITEM_HEIGHT,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    starContainer: {
        flexDirection: 'row',
        position: 'absolute',
        left: width / 3,
        alignItems: 'center',
        bottom: 0,
    },
    starStyle: {
        height: 20,
        width: 60
    }
})

export default PostDetailScreen;
