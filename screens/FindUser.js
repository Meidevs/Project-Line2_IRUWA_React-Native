import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import AUTHENTICATION from '../assets/dataSource/authModel';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

function FindUser({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ padding: 25, flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={'arrowleft'} size={32} />
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: null,
        })
    }, []);

    return (
        <View>

        </View>
    )
}

const styles = StyleSheet.create({

})

export default FindUser;