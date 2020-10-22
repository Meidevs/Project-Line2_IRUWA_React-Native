import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ProfileSetter = ({ hasComp, user, navigation }) => {
    const [infos, setUser] = useState([]);
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        const SET_USER_INFO = () => {
            if (user)
                setUser(user);
        }
        setIsLoad(true)
        SET_USER_INFO();
    }, [user]);

    if(isLoaded) {
        return (
            <View style={styles.ProfileBox}>
                <View style={styles.ProfileContent}>
                    <View style={styles.ProfileImageArea}>
                        <Image
                            source={require('../images/logged_in_ico.png')}
                            style={{ width: 16, height: 19 }}
                        />
                    </View>
                    {
                        hasComp == true ? (
                            <View style={styles.ProfileTextArea}>
                                <Text style={styles.NameTxt}>{infos.cmp_name}님, 안녕하세요</Text>
                                <Text style={styles.LocationTxt}>{infos.cmp_location}</Text>
                            </View>
                        ) : (
                                <View style={styles.ProfileTextArea}>
                                    <Text style={styles.NameTxt}>{infos.user_name}</Text>
                                    <Text style={styles.LocationTxt}>{infos.user_location}</Text>
                                </View>
    
                            )
                    }
                </View >
                <View style={styles.ProfileSettings}>
                    <TouchableOpacity style={styles.ProfilleSetBtn} onPress={() => navigation.navigate('Profile', {
                        user_seq: infos.user_seq,
                        hasComp: hasComp,
                    })}>
                        <Text style={styles.EditBtnTxt}>  개인정보수정  </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.Loading}>
                <ActivityIndicator
                    animating={true} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    ProfileBox: {
        margin: 25,
        borderRadius: 10,
        padding: 30,
        flexDirection: 'column',
        backgroundColor: '#000000',
    },
    ProfileSettings: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    ProfilleSetBtn: {
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 20,
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'rgba(180, 180, 180, 1)'
    },
    EditBtnTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
    },
    ProfileImageArea: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 15,
    },
    ProfileContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    ProfileTextArea: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    NameTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingBottom: 15,
    },
    LocationTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ffffff',
        paddingBottom: 15,
    },


})

export default ProfileSetter;
