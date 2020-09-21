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

const ProfileSetter = ({ hasComp, user, profile }) => {
    const [infos, setUser] = useState(user);
    const [isLoaded, setIsLoad] = useState(false);
    useEffect(() => {
        if (user) {
            const SET_USER_INFO = () => {
                setUser(user);
            }
            setIsLoad(true)
            SET_USER_INFO();
        }
    }, [user]);

    if (isLoaded) {
        return (
            <View style={styles.ProfileContent}>
                <View style={styles.ProfileImageArea}>
                    {profile == null ? (
                        <Image source={require('../images/defaultProfile.png')} resizeMode={'contain'} style={{ width: width * 0.1, height: width * 0.1 }} />
                    ) : (
                            <Image source={{ uri: profile }} 
                            borderRadius={30}
                            resizeMode={'contain'} 
                            style={{ width: width * 0.1, height: width * 0.1 }} />
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
        margin: 10,
    },
})

export default ProfileSetter;
