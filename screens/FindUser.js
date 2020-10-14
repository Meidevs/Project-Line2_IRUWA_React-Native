import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Keyboard,
    Animated
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";

import TermA from '../assets/components/Terms/TermA';
import TermB from '../assets/components/Terms/TermB';
import TermC from '../assets/components/Terms/TermC';
import CategoryPicker from '../assets/components/Category/CategoryPicker';
import CmpAddressSearchBox from '../assets/components/CmpAddressSearchBox';
import AUTHENTICATION from '../assets/dataSource/authModel';
import ROADAPI from '../assets/dataSource/roadAPI';
import PASSWORD_CHECK from '../assets/components/PasswordMatch';

const { width, height } = Dimensions.get('window');

function UserTypeScreen({ route, navigation }) {
    const [pageCount, setPageCount] = useState(0);
    const [isTermA, setIsTermA] = useState(false);
    const [isTermB, setIsTermB] = useState(false);
    const [isTermC, setIsTermC] = useState(false);
    const [confirmA, setConfirmA] = useState(false);
    const [confirmB, setConfirmB] = useState(false);
    const [confirmC, setConfirmC] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, SelectionStatus] = useState(0);
    const [recommendation, setRecommendation] = useState(null);
    const [user_id, setUserID] = useState(null);
    const [user_pw, setPassword] = useState(null);
    const [password_again, setPassword_Again] = useState(null);
    const [password_boolean, setPassword_Boolean] = useState(false);
    const [user_name, setUserName] = useState(null);
    const [user_phone, setUserPhone] = useState(null);
    const [user_email, setUserEmail] = useState(null);
    const [email_duplication, setEmailDuplicate] = useState(true);
    const [user_location, setUserLocation] = useState(null);
    const [cmp_name, setCompanyName] = useState('');
    const [cmp_phone, setCompanyPhone] = useState('');
    const [cmp_location, setCompanyLocation] = useState('');
    const [cmp_detail_location, setCompanyDLocation] = useState('');
    const [lat, setCompanyLat] = useState('');
    const [lon, setCompanyLon] = useState('');
    const [cmp_certificates, setImage] = useState({
        id: null,
        uri: null
    });
    const [category_seq, setCompanyCate] = useState('');
    const keyboardHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    pageCount > 0 ? (
                        <HeaderBackButton
                            tintColor={'#ffffff'}
                            onPress={() => PrevPage()}
                        />
                    ) : (
                            <HeaderBackButton
                                tintColor={'#ffffff'}
                                onPress={() => navigation.goBack()}
                            />
                        )
                )
            },
            headerTitle: () => (
                <View>
                    <Text></Text>
                </View>
            ),
            headerStyle: {
                backgroundColor: '#15bac1',
                elevation: 0,
                shadowOffset: {
                    height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
            }
        })
    }, [pageCount]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', (event) => {
                keyboardDidShow(event)
            } // or some other action
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', (event) => keyboardDidHide(event) // or some other action
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const keyboardDidShow = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                useNativeDriver: false,
                duration: e.duration,
                toValue: e.endCoordinates.height / 1.5,
            }),
        ]).start();
    }
    const keyboardDidHide = (e) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                useNativeDriver: false,
                duration: e.duration,
                toValue: 0,
            }),
        ]).start();
    }

    const NextPage = () => {
        switch (pageCount) {

        }
    }
    const PrevPage = () => {
        setPageCount(pageCount => pageCount - 1);
    }

    return (
        <Animated.View style={[styles.Container, { bottom: Platform.OS == 'ios' ? keyboardHeight : null }]}>
            <View style={styles.SearchCard}>
                <View style={styles.SearchContent}>
                    <View style={styles.Search}>
                        <View style={styles.Title}>
                            <Text>아이디 찾기</Text>
                        </View>
                        <View style={styles.Content}>
                            <TextInput
                                placeholder={'이메일을 입력해주세요.'}
                            />
                        </View>
                        <View style={styles.Button}>
                            <TouchableOpacity>
                                <Text>찾기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.Search}>
                        <View style={styles.Title}>
                            <Text>비밀번호 찾기</Text>
                        </View>
                        <View style={styles.Content}>
                            <TextInput
                                placeholder={'이메일을 입력해주세요.'}
                            />
                        </View>
                        <View style={styles.Button}>
                            <TouchableOpacity>
                                <Text>찾기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View >
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#15bac1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    SearchCard: {
        width: width * 0.8,
        height: height * 0.6,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 1,
        shadowOffset: {
            height: 1,
        },
        shadowRadius: 1,
        shadowOpacity: 0.3,
    },
    SearchContent: {
        flex: 1,
        padding: 15,
        justifyContent : 'center',
        alignItems : 'flex-start'
    },
    Search : {
        flex : 1,
        flexDirection : 'column',
        marginBottom : 10,
    },
    Title : {
        flex : 1,
        margin : 10,
    },
    Content : {
        flex : 1,
        margin : 10,
    },
    Button : {
        flex : 1,
        margin : 10,
    }
})
export default UserTypeScreen;