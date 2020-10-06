import React, { useEffect, useState } from 'react';
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
import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

function RingingScreen({ route, navigation }) {
    const [phoneList, setPhoneList] = useState([]);
    const [name, setName] = useState(null);
    const [position, setPosition] = useState(null);
    const [phone, setPhone] = useState(null);
    const [isLoaded, setIsLoad] = useState(true);
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
            var RINGING_LIST = await DATA_SOURCE.GET_RINGING_LIST();
            if (isLoaded)
                setPhoneList(RINGING_LIST);
        }
        GET_RINGING_LIST();
        setIsLoad(false)
    }, [isLoaded]);

    const RegisterPhone = async () => {
        var data = new Object();
        if (name == null | phone == null | position == null) return alert('정보를 모두 입력해 주세요.')
        data.name = name;
        data.phone = phone;
        data.position = position;
        var INSERT_RESPONSE = await DATA_SOURCE.INSERT_RINGING_LIST(data);
        if (INSERT_RESPONSE.flags == 0) {
            setIsLoad(true);
            setName(null);
            setPosition(null);
            setPhone(null);
        } else {
            alert(INSERT_RESPONSE.messages)
        }
    }

    const DELETE_PHONE = async (phone_seq) => {
        var DELETE_RESPONSE = await DATA_SOURCE.DELETE_RINGING_LIST(phone_seq);
        if (DELETE_RESPONSE.flags == 0) {
            setIsLoad(true);
        } else {
            alert(DELETE_RESPONSE.messages)
        }
    }

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <View style={styles.ContentArea}>
                    <View style={styles.IntroArea}>
                        <Text style={styles.IntroTxt}>띵동은 최대 6개까지 등록 가능합니다.</Text>
                    </View>
                    <View style={styles.RegisterArea}>
                        <View style={styles.NameSpace}>
                            <TextInput
                                value={name}
                                placeholder={'이름'}
                                onChangeText={text => setName(text)}
                            />
                        </View>
                        <View style={styles.PositionSpace}>
                            <TextInput
                                value={position}
                                placeholder={'직책'}
                                onChangeText={text => setPosition(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.RegisterArea}>
                        <View style={styles.PhoneSpace}>
                            <TextInput
                                value={phone}
                                placeholder={'전화번호'}
                                onChangeText={text => setPhone(text)}
                            />
                        </View>
                        <TouchableOpacity style={styles.BtnSpace} onPress={() => RegisterPhone()}>
                            <Text style={styles.RegisterBtnTxt}>등록</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.IntroArea}>
                        <Text style={styles.CmpNameTxt}>{route.params.cmp_name}의 연락처</Text>
                    </View>
                    {
                        phoneList.map((data, index) => {
                            return (
                                <View style={styles.PhoneList} key={index.toString()}>
                                    <View style={styles.LeftArea}>
                                        <Text style={styles.PositionResultTxt}>{data.position}</Text>
                                        <View style={styles.ResultArea}>
                                            <Image source={require('../assets/images/profile_info_ico.png')}
                                                style={{ width: 16, height: 16 }}
                                            />
                                            <Text style={styles.NameResultTxt}>{data.name}</Text>
                                        </View>
                                        <View style={styles.ResultArea}>
                                            <Text style={styles.PositionResultTxt}>전화. </Text>
                                            <Text style={styles.NameResultTxt}>{data.phone}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.CancelBtn} onPress={() => DELETE_PHONE(data.phone_seq)}>
                                        <Image source={require('../assets/images/close_button.png')}
                                            style={{ width: 15, height: 15, }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
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
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    ContentArea: {
        width: width,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    IntroArea: {
        margin: 25,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    CmpNameTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
    },
    IntroTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        letterSpacing: -0.22,
    },
    RegisterArea: {
        marginBottom: 15,
        marginRight: 25,
        marginLeft: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    NameSpace: {
        flex: 2,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: '#ebebeb',
        padding: 10,
        marginRight: 15,
    },
    PositionSpace: {
        flex: 2,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: '#ebebeb',
        padding: 10,
    },
    PhoneSpace: {
        flex: 4,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: '#ebebeb',
        padding: 10,
        marginRight: 15,
    },
    BtnSpace: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15bac1'
    },
    RegisterBtnTxt: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ffffff'
    },
    PhoneList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ebebeb',
        padding: 20,
    },
    LeftArea: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ResultArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PositionResultTxt: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a2a2a2',
        marginBottom: 5,
    },
    NameResultTxt: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '800',
        color: '#000000',
        marginBottom: 5,
    },
    CancelBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
})

export default RingingScreen;