import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';


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