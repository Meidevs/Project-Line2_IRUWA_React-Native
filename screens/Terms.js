import { HeaderBackButton } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import TermA from '../assets/components/Terms/TermA';
import TermB from '../assets/components/Terms/TermB';
import TermC from '../assets/components/Terms/TermC';

const { width, height } = Dimensions.get('window');

function UserTypeScreen({ route, navigation }) {
    const [isTermA, setIsTermA] = useState(false);
    const [isTermB, setIsTermB] = useState(false);
    const [isTermC, setIsTermC] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton
                    tintColor={'#ffffff'}
                    onPress={() => navigation.goBack()}
                />
            ),
            headerTitle: () => (
                <View>
                    <Text></Text>
                </View>
            ),
            headerStyle: {
                backgroundColor: '#15bac1',
                elevation: 0,
            }
        })
    }, []);

    const callbackA = (ChildFrom) => {
        setIsTermA(ChildFrom)
    }
    const callbackB = (ChildFrom) => {
        setIsTermB(ChildFrom)
    }
    const callbackC = (ChildFrom) => {
        setIsTermC(ChildFrom)
    }
    return (
        <View style={styles.Container}>
            <View style={styles.RegisterCard}>
                <View style={styles.RegisterCardIcon}>
                    <Image source={require('../assets/images/agreement_terms_ico.png')}
                        style={{ width: 30, height: 30, }}
                    />
                </View>
                <View>
                    <View style={styles.AgreementTerms}>
                        <TouchableOpacity style={styles.Terms} onPress={() => setIsTermA(true)}>
                            <Text>개인정보 처리방침</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>확인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.AgreementTerms}>
                        <TouchableOpacity style={styles.Terms} onPress={() => setIsTermB(true)}>
                            <Text>이루와 회원 이용 약관</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>확인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.AgreementTerms}>
                        <TouchableOpacity style={styles.Terms} onPress={() => setIsTermC(true)}>
                            <Text>표준 위치기반서비스 이용약관</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.NextBtn}>
                    <Image source={require('../assets/images/long_right_arrow_ico.png')}
                        style={{ width: 55, height: 27.5 }}
                    />
                </TouchableOpacity>
            </View>
            <TermA visible={isTermA} callback={callbackA} />
            <TermB visible={isTermB} callback={callbackB} />
            <TermC visible={isTermC} callback={callbackC} />
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#15bac1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    RegisterCard: {
        padding: 25,
        paddingTop: 60,
        paddingBottom: 60,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        elevation: 2,
        shadowOffset: {
            height: 1,
        }
    },
    AgreementTerms: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Terms: {
        padding: 15,
        borderRadius: 20,
        borderColor: '#17C8CF',
        borderWidth: 1,
        marginRight: 15,
    },
    RegisterCardIcon: {
        position: 'absolute',
        top: -30,
        padding: 10,
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowOffset: {
            height: 2,
        },
        alignItems: 'center',
        justifyContent: 'center'
    },
    NextBtn: {
        position: 'absolute',
        bottom: -30,
        padding: 10,
        width: 120,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#15bac1',
        elevation: 2,
        shadowOffset: {
            height: 2,
        },
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default UserTypeScreen;