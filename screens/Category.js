import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';

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
                        <Image
                            source={require('../assets/images/search_ico.png')}
                            style={{ margin: 10}}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }, []);

    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.AdsBox}>
                <View style={styles.TitleContent}>
                    <Text style={styles.TitleTxtStyle}>프리미엄 서비스</Text>
                </View>
                <View style={styles.CategoryBtnBox}>
                    <TouchableOpacity style={styles.CategoryBtn} onPress={() => navigation.navigate('Premiums')}>
                        <View style={styles.CategoryIconBox}>
                            <Image
                            source={require('../assets/images/category_ico_premium.png')}
                            style={{width : 27, height : 27}}
                            />
                        </View>
                        <View style={styles.PremiumTitle}>
                            <Text style={styles.PremiumTxt}>프리미엄</Text>
                        </View>
                        <View style={styles.PremiumBtn}>
                            <Image source={require('../assets/images/right_arrow_ico_white.png')}
                            style={{width : 17, height : 17, alignContent:'flex-start'}}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.CategoryBox}>
                <View style={styles.TitleContent}>
                    <Text style={styles.TitleTxtStyle}>유흥업체 분류</Text>
                </View>
            </View>
            <CategoryList navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    RightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    AdsBox: {
        margin : 25,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    CategoryBox: {
        marginRight : 25,
        marginLeft : 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    TitleContent: {
        width: width,
        marginBottom : 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    TitleTxtStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    CategoryBtnBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CategoryBtn: {
        flex: 1,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor : 'rgba(0, 176, 183, 0.8)'
    },
    CategoryIconBox: {
        margin: 20,
        borderRadius : 45,
        width: 45,
        height: 45,
        backgroundColor : '#0d9da2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PremiumTitle : {
        flex : 6,
    },
    PremiumTxt : {
        fontSize : 15,
        fontWeight : '800',
        color : '#ffffff',
    },
    PremiumBtn : {
        flex : 1,
    }
})

export default CategoryScreen;