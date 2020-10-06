import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

function SearchUser({ route, navigation }) {
    const [user_id, setUserid] = useState('');
    const [user_pw, setUserpw] = useState('');

    

    return (
        <View style={styles.Container}>
            <Text>This is Search UserScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SearchUser;