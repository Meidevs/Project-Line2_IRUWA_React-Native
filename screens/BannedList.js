import React, { useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import AUTHENTICATION from '../assets/dataSource/authModel';
const { width, height } = Dimensions.get('window');

function BannedListScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.HeaderTitleBox}>
                    <Text style={[styles.HeaderTitleTxt]}>차단 사용자 관리</Text>
                </View>
            ),
            headerRight: () => (
                <View>
                </View>
            ),
        })
    }, []);

    useEffect(() => {
        const GET_BANNED_LIST = async () => {
            var BANNED_LIST = await AUTHENTICATION.GET_BANNED_LIST();
        }
        GET_BANNED_LIST();
    }, [user_seq])

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.ScrollView}>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default BannedListScreen;