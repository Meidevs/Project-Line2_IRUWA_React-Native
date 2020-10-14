import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import AUTHENTICATION from '../assets/dataSource/authModel';
const { width, height } = Dimensions.get('window');
function BannedListScreen({ navigation }) {
    const [bannedList, setBannedList] = useState([]);
    const [isLoaded, setIsLoad] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>차단 사용자 관리</Text>
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
            if (isLoaded) {
                var BANNED_LIST = await AUTHENTICATION.GET_BANNED_LIST();
                setBannedList(BANNED_LIST);
            }
        }
        setIsLoad(false);
        GET_BANNED_LIST();
    }, [isLoaded])

    const removeBanned = async (data) => {
        var REMOVE_RESULT = await AUTHENTICATION.REMOVE_BAN_USER(data);
        alert(REMOVE_RESULT.messages);
        setIsLoad(true);

    }
    if (bannedList.length > 0) {
        return (
            <SafeAreaView style={styles.Container}>
                <ScrollView>
                    {
                        bannedList.map((data, index) => {
                            return (
                                <View style={styles.ContentBox} key={index.toString()}>
                                    <View style={styles.LeftArea}>
                                        {
                                            data.cmp_name ? (
                                                <Image source={{ uri: data.uri }} style={styles.ImageContent} />
                                            ) : (
                                                    <Image source={require('../assets/images/defaultProfile.png')} style={styles.ImageContent} />
                                                )
                                        }
                                        {
                                            data.cmp_name ? (
                                                <Text style={styles.Name}>{data.cmp_name}</Text>
                                            ) : (
                                                    <Text style={styles.Name}>{data.user_name}</Text>
                                                )
                                        }
                                    </View>
                                    <View style={styles.RightArea} >
                                        <TouchableOpacity style={styles.BtnStyle} onPress={() => removeBanned(data.user_seq)}>
                                            <Text>차단 해제</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    } else {
        return null
    }
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
        backgroundColor: '#ffffff'
    },
    ContentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#f2f2f2'
    },
    LeftArea: {
        margin: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ImageContent: {
        width: 35,
        height: 35,
        borderRadius: 5,
        marginRight: 10,
    },
    Name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: -0.3
    },
    RightArea: {
        margin: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    BtnStyle: {
        borderRadius: 10,
        borderColor: '#f2f2f2',
        borderWidth: 1,
        padding: 10,
    }
})

export default BannedListScreen;