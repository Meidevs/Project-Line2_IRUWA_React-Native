import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Directory from './Directory';
import AUTHENTICATION from '../dataSource/authModel';
const { width, height } = Dimensions.get('window');

const ProfileSetter = ({ hasComp, user }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [infos, setUser] = useState(user);
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        if (user) {
            const GET_PROFILE_IMAGE = async () => {
                var PROFILE_IMAGE_LOCAL_URI = await Directory.GET_PROFILE_IMAGE();
                if (PROFILE_IMAGE_LOCAL_URI) {
                    setProfileImage(PROFILE_IMAGE_LOCAL_URI)
                }
            }
            const SET_USER_INFO = () => {
                setUser(user);
            }
            setIsLoad(true)
            SET_USER_INFO();
            GET_PROFILE_IMAGE();
        }
    }, [user]);

    if (isLoaded) {
        return (
            <View style={styles.ProfileContent}>
                <View style={styles.ProfileImageArea}>
                    {profileImage == null ? (
                        <Image source={require('../images/defaultProfile.png')} resizeMode={'contain'} style={{ width: width * 0.1, height: width * 0.1 }} />
                    ) : (
                            <Image source={{ uri: profileImage }} />
                        )
                    }
                </View>
                {
                    hasComp == true ? (
                        <View style={styles.ProfileTextArea}>
                            <Text>{infos.cmp_name}</Text>
                            <Text>{infos.cmp_location}</Text>
                        </View>
                    ) : (
                            <View style={styles.ProfileTextArea}>
                                <Text>{infos.user_name}</Text>
                                <Text>{infos.user_location}</Text>
                            </View>

                        )
                }
            </View >
        )
    } else {
        return (
            null
        )
    }
}

const styles = StyleSheet.create({
    ProfileContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    ProfileTextArea: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    ProfileImageArea: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: 30,
        margin: 10,
    },
})

export default ProfileSetter;
