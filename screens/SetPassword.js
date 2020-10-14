import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');

function SearchUser({ route, navigation }) {

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>비밀번호변경</Text>
                </View>
            ),
            headerRight: () => (
                <View></View>
            ),
        })
    }, []);

    return (
        <View style={styles.Container}>
            <View style={styles.ContentCard}>
                <View style={styles.ContentBorder}>
                    <View style={styles.ItemCard}>
                        <Text>기존 비밀번호</Text>
                        <TextInput
                            placeholder={'기존 비밀번호를 입력해 주세요.'}
                        />
                    </View>
                    <View style={styles.ItemCard}>
                        <Text>변경할 비밀번호</Text>
                        <TextInput
                            placeholder={'변경할 비밀번호를 입력해 주세요.'}
                        />
                    </View>
                    <View style={styles.ItemCard}>
                        <Text>변경할 비밀번호 확인</Text>
                        <TextInput
                            placeholder={'변경할 비밀번호를 다시 입력해 주세요.'}
                        />
                    </View>
                    <View style={styles.ItemCard}>
                        <TouchableOpacity>
                            <Text>변경</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
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
    Container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContentCard: {
        width: width * 0.8,
        height: height * 0.7,
    },
    ContentBorder: {
        flex: 1,
        borderRadius: 10,
        borderColor: '#ebebeb',
        borderWidth: 1,
        padding: 15,
    },
    ItemCard: {
        flex : 1,
        justifyContent: 'center'
    }
})

export default SearchUser;