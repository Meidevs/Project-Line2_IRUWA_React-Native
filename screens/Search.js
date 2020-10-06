import React, { useEffect, useState } from 'react';
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
            uri: items.uri,
            ads_type: items.ads_type,

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
                <Text style={styles.ItemName}>{data.item_name}</Text>
                <Text style={styles.CmpLocation}>{data.cmp_location}</Text>
                <Text style={styles.Time_Gap}>{time_gap}</Text>
            </View>
            {
                data.ads_type == 1 ? (
                    <View style={styles.AdsType}>
                        <Image
                            source={require('../assets/images/category_ico_premium_green.png')}
                            style={{ width: 18, height: 18 }}
                        />
                    </View>
                ) : (
                        null
                    )
            }
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
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <Text style={[styles.HeaderTitleTxt]}>검색</Text>
                </View>
            ),
            headerRight: () => (
                <View>
                </View>
            ),
        })
    }, []);

    useEffect(() => {
        const GET_USER_INFOs = async () => {
            var USER_INFOs = await AUTHENTICATION.GET_USER_INFOs();
            setCurrentUser(USER_INFOs.user_seq)
        }
        GET_USER_INFOs();
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
                        <Image source={require('../assets/images/search_ico.png')} />
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
    HeaderTitleBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    HeaderTitleTxt: {
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold'
    },
    Container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    SearchForm: {
        width: width,
        height: height * 0.1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchBox: {
        flex: 1,
        margin: 25,
        padding: 10,
        height: height * 0.06,
        backgroundColor: '#f2f2f2',
        borderColor: '#cecece',
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
    },
    ContentBox: {
        marginTop: 5,
        margin: 20,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elevation: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0.5
        }
    },
    LeftArea: {
        flex: 1,
        justifyContent: 'center'
    },
    ImageContent: {
        resizeMode: 'contain',
        borderRadius: 100,
        width: 80,
        height: 80,
    },
    RightArea: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    ItemName: {
        flex: 1,
        fontSize: 15,
        fontWeight: '800',
        color: '#000000'
    },
    CmpLocation: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600',
        color: '#000000'
    },
    Time_Gap: {
        flex: 1,
        fontSize: 10,
        fontWeight: '600',
        color: '#a2a2a2',
        letterSpacing: -0.2,
    },
    AdsType: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
})

export default SearchScreen;