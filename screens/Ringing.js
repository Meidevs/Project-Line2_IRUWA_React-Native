import React, { useEffect, useState, useCallback } from 'react';
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
import { HeaderBackButton } from '@react-navigation/stack';
import DATA_SOURCE from '../assets/dataSource/dataModel';

function RingingScreen({ route, navigation }) {
    console.log('route', route)
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>띵동 등록</Text>
                </View>
            ),
            headerRight: () => (
                <View></View>
            )
        })
    }, []);

    useEffect(() => {
        const GET_RINGING_LIST = async () => {
            await DATA_SOURCE.GET_RINGING_LIST();
        }
        GET_RINGING_LIST();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
})

export default RingingScreen;