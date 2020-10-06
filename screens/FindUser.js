import React, { useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

function FindUser({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ padding: 25, flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/back_button.png')} />
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