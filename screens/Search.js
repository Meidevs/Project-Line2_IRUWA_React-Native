import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Image,
    VirtualizedList
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AUTHENTICATION from '../assets/dataSource/authModel';
import DATA_SOURCE from '../assets/dataSource/dataModel';
import PrevSearch from '../assets/components/Search/PrevSearch';
import TimeGap from '../assets/components/TimeGap';
const { width, height } = Dimensions.get('window');

const getItem = (data, index) => {
    const items = data[index];
    if (data[index] != undefined) {
        return {
            items_seq: items.items_seq,
            item_name: items.item_name,
            cmp_location: items.cmp_location,
            reg_date: items.reg_date,
            cmp_seq: items.cmp_seq,
            uri: items.uri
        }
    }
}

const getItemCount = (data) => {
    var cnt = data.length;
    return cnt;
}

const Item = ({ data, user, navigation }) => {
    var time_gap = TimeGap(data.reg_date);
    return (
        <TouchableOpacity style={styles.ContentBox} onPress={() => navigation.navigate('Detail', {
            items_seq: data.items_seq,
            cmp_seq: data.cmp_seq,
            user_seq: user
        })}>
            <View style={styles.LeftArea}>
                <Image source={{ uri: data.uri[0] }} style={styles.ImageContent} />
            </View>
            <View style={styles.RightArea}>
                <Text>{data.item_name}</Text>
                <Text>{data.cmp_location}</Text>
                <Text>{time_gap}</Text>
            </View>
        </TouchableOpacity>
    );
}

function SearchScreen({ navigation, route }) {
    const [showPrev, showPrevSearch] = useState(false);
    const [searchText, setText] = useState(null);
    const [prevItem, setPrevItem] = useState(null);
    const [items, setItems] = useState([]);
    const [user_seq, setCurrentUser] = useState(null);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View></View>
            ),
            headerTitle: () => (
                <View>
                    <Text>검색</Text>
                </View>
            ),
        })
    });

    useEffect(() => {
        const GET_USER_INFOs = async () => {
            var USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
            setCurrentUser(USER_INFOs.user_seq)
        }
        GET_USER_INFOs()
    }, [])

    const toggleSearchHistory = () => {
        showPrevSearch(!showPrev);
    }

    const Callback = async (FromChild) => {
        var ITEM_LIST = await DATA_SOURCE.GET_ITEMS_ON_KEYWORD(FromChild);
        setItems(ITEM_LIST.content);
        showPrevSearch(false);
        setText(null);
    }

    const SearchItem = async () => {
        try {
            if (searchText !== null) {
                setPrevItem(searchText)
                var ITEM_LIST = await DATA_SOURCE.GET_ITEMS_ON_KEYWORD(searchText);
                setItems(ITEM_LIST.content);
            }
            showPrevSearch(false);
            setText(null);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.SearchForm}>
                <View style={styles.SearchBox}>
                    <TextInput
                        value={searchText}
                        placeholderTextColor={'rgba(140, 140, 140, 1)'}
                        placeholder={'키워드를 입력해주세요'}
                        style={styles.Input}
                        onChangeText={text => setText(text)}
                        onTouchStart={() => toggleSearchHistory()}
                    />
                    <TouchableOpacity onPress={() => SearchItem()}>
                        <Icon name={'search1'} size={28} color={'rgba(140, 140, 140, 1)'} />
                    </TouchableOpacity>
                </View>
            </View>
            <PrevSearch status={showPrev} newData={prevItem} callback={Callback} />
            <VirtualizedList
                data={items}
                initialNumToRender={10}
                renderItem={({ item }) => <Item data={item} user={user_seq} navigation={navigation} />}
                keyExtractor={(item, index) => JSON.stringify(index)}
                getItemCount={getItemCount}
                getItem={getItem}
                onTouchStart={() => showPrevSearch(false)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    SearchForm: {
        width: width,
        height: height * 0.1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchBox: {
        flex: 1,
        margin: 25,
        padding: 10,
        height: height * 0.06,
        backgroundColor: 'rgba(242, 242, 242, 1)',
        borderColor: 'rgba(230, 230, 230, 1)',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Input: {
        flex: 1,
        paddingLeft: 10,
    },
    ResultForm: {
        flex: 1,
    }
})

export default SearchScreen;