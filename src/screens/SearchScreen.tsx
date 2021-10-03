import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CardInfo from '../components/CardInfo';
import { SearchBar } from '../components/SearchBar'
import { SearchStart } from '../redux/module/gallery/gallery';
import { RootState } from '../redux/rootReducer';
import { NavigationParams } from 'react-navigation';
import { StackNavigationProp } from '@react-navigation/stack';

export interface SearchNavigationProps {
    navigation: StackNavigationProp<NavigationParams, 'Home'>
}

const SearchScreen = ({ navigation }: SearchNavigationProps) => {

    const dispatch = useDispatch();
    const { navigate } = useNavigation()
    const [word, setWord] = useState('')

    const { searchResult } = useSelector((state: RootState) => state.gallery)

    const renderItem = ({ item }: any) => {
        return (
            <CardInfo item={item} navigation={navigation} />
        )
    }

    const onSearch = () => {
        dispatch(SearchStart(word))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigation}>
                <SearchBar didTouch={() => {
                }} onTextChange={(text: React.SetStateAction<string>) => { setWord(text) }} autoFocus={true} onSubmit={() => onSearch()} />
            </View>
            <View style={styles.body}>
                {searchResult.length > 0 ?
                    <FlatList
                        data={searchResult}
                        renderItem={renderItem}
                    /> :
                    <Text>
                        이미지 검색
                    </Text>
                }
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    navigation: {
        flex: 1,
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },


})

export default SearchScreen;
