import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    Dimensions,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');

function UserTypeScreen({ route, navigation }) {
    const [status, SelectionStatus] = useState(0);
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text></Text>
                </View>
            ),
        })
    }, []);
    const UserSelection = (data) => {
        SelectionStatus(data)
    }

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView>
                <StatusBar />
                <View style={styles.UserTypeForm}>
                    <View style={styles.UserTypeTitle}>
                        <Text>가입자 유형</Text>
                    </View>
                    <View style={styles.SelectForm}>
                        <TouchableOpacity style={status == 0 ? styles.NormalSelectBtn : styles.NormalNonSelectBtn} onPress={() => UserSelection(0)}>
                            <Text style={styles.SelectTxt}>일반 사용자</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={status == 1 ? styles.CmpSelectBtn : styles.CmpNonSelectBtn} onPress={() => UserSelection(1)}>
                            <Text style={styles.SelectTxt}>업체 사용자</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View>
                <Text>다음</Text>
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    UserTypeForm: {
        width: width,
        flexDirection: 'column',
    },
    UserTypeTitle: {
        margin: 25,
    },
    SelectForm: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    NormalSelectBtn: {
        padding: 20,
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
        backgroundColor: '#15bac1'
    },
    NormalNonSelectBtn: {
        padding: 20,
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
        backgroundColor: '#074042'
    },
    CmpSelectBtn : {
        padding: 20,
        borderTopRightRadius : 10,
        borderBottomRightRadius : 10,
        backgroundColor: '#15bac1'
    },
    CmpNonSelectBtn: {
        padding: 20,
        borderTopRightRadius : 10,
        borderBottomRightRadius : 10,
        backgroundColor: '#074042'
    },
    SelectTxt : {
        fontSize : 15,
        fontWeight : '800',
        color : '#ffffff'
    }
})
export default UserTypeScreen;