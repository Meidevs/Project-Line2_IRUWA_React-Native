import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CategoryList from '../assets/components/Category/CategoryList';

const { width, height } = Dimensions.get('window');

function CategoryScreen({ route, navigation }) {

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>

                </View>
            ),
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>카테고리</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.RightHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Icon name="ios-search" size={28} color={'#000000'} style={{ padding: 10, }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, []);

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.AdsBox}>
                    <View style={styles.TitleContent}>
                        <Text style={styles.TitleTxtStyle}>프리미엄 서비스</Text>
                    </View>
                    <View style={styles.CategoryBtnBox}>
                        <TouchableOpacity style={styles.CategoryBtn}>
                            <View style={styles.CategoryIconBox}>

                            </View>
                            <View style={styles.CategoryText}>
                                <Text>프리미엄 광고 (이미지로 대체)</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.CategoryBox}>
                    <View style={styles.TitleContent}>
                        <Text style={styles.TitleTxtStyle}>유흥업체 분류</Text>
                    </View>
                    <View style={styles.CategoryContent}>
                        <CategoryList navigation={navigation} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ScrollView: {
    },
    AdsBox: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    CategoryBox: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    TitleContent: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    TitleTxtStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    CategoryContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    CategoryBtnBox: {
        height: height * 0.13,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CategoryBtn: {
        flex: 1,
        height : height * 0.1,
        borderRadius: 10,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    CategoryIconBox: {
        justifyContent: 'center',
        alignItems: 'center',
        margin : 10,
        width : width * 0.13,
        height : width * 0.13,
    },
    CategoryText : {
        flex : 5,
    },
    ImageContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    TxtContent: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})

export default CategoryScreen;