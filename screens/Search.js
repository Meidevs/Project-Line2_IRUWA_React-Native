import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryListUp from '../assets/components/CategoryListUp';
import DATA_SOURCE from '../assets/dataSource/dataModel';
const { width, height } = Dimensions.get('window');

function SearchScreen({ navigation }) {
    const [findStatus, findItemStatus] = useState(false);
    const [touchStatus, setInputStatus] = useState(false);

    const PrevSearchList = async () => {
        try {
            await DATA_SOURCE.GET_PREV_SEARCH_LIST();
        } catch (err) {
            console.log(err);
        }
        setInputStatus(!touchStatus);
    }
    const SET_PREV_SEARCH = async () => {
        try {

        } catch (err) {
            
        }
    }
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.SearchBox}>
                    <TouchableOpacity style={styles.SearchContent}>
                        <TextInput
                            style={styles.SeachInput}
                            placeholder={'인근 지역 검색'}
                            placeholderTextColor='#B4B4B4'
                            pointerEvents='none'
                            onTouchStart={() => PrevSearchList()}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={styles.SearchBtn}>
                    <Icon name={'ios-search'} size={30} />
                </TouchableOpacity>
            )
        })
    })
    const componentJSX = () => {
        if (touchStatus)
            return (
                <View style={styles.PrevSearch}>
                    <View style={styles.PrevContent}>
                        <Text>최근 검색</Text>
                        <TouchableOpacity>
                            <Text>전체 삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }
    return (

        <SafeAreaView style={styles.Container}>
            {
                componentJSX()
            }
            <ScrollView
                onTouchStart={() => {
                    if(touchStatus) {
                        setInputStatus(!touchStatus)
                    }
                }}
                >
                <View style={styles.CategoryBox}>
                    <View style={styles.CategoryTitle}>
                        <Text style={styles.CategoryTitleTxtStyle}>카테고리</Text>
                    </View>
                    <CategoryListUp />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SearchBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    SearchContent: {
        flex: 1,
        borderRadius: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(248, 249, 251, 1)',
    },
    SeachInput: {
        paddingLeft: 10,
        flex: 1,
    },
    SearchBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 0.8,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 1)'
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)',
    },
    PrevSearch: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 5,
        width: width,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },

    PrevContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    CategoryBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CategoryTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        borderBottomWidth: 2,
        borderColor: 'rgba(50, 50, 50, 1)',
        height: 50,
    },
    CategoryTitleTxtStyle: {
        fontSize: width * 0.05,
        fontWeight: 'bold'
    },

    HeaderStyle: {
        flexDirection: 'column',
    },
    IconText: {
    }
})

export default SearchScreen;