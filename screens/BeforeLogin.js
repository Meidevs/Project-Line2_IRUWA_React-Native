import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    StatusBar
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

function BeforeLoginScreen({ navigation }) {

    return (
        <ImageBackground source={require('../assets/images/BackgroundImage.jpg')} style={styles.ImageBackground}>
            <StatusBar
                barStyle="light-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor="rgba(0, 0, 0, 0)"
                //Background color of statusBar
                translucent={true}
                //allowing light, but not detailed shapes
                networkActivityIndicatorVisible={true}
            />
            <View style={styles.Container}>
                <View style={styles.SearchUserArea}>
                    <Text style={styles.SearchUserTxt}>아이디 비밀번호 찾기</Text>
                </View>
                <View style={styles.IntroTextArea}>
                    <View style={styles.IntroSub}>
                        <Text style={styles.IntroSubTxt}>주변에 어디에서 놀아야할지 모르겠다면?</Text>
                    </View>
                    <View style={styles.Intro}>
                        <Text style={styles.IntroTxt}>재미있게</Text>
                        <Text style={styles.IntroTxt}>놀고 싶으면</Text>
                        <Text style={styles.IntroTxt}>일루와</Text>
                    </View>
                </View>
                <View style={styles.BtnArea}>
                    <TouchableOpacity style={styles.LoginBtn} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.LoginTxt}>로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.RegisterBtn} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.RegisterTxt}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    ImageBackground: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    SearchUserArea: {
        flex: 1,
        paddingRight: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    SearchUserTxt: {
        color: 'rgba(205, 205, 205, 1)',
        fontWeight: '700',
        fontSize: 16,
    },
    IntroTextArea: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    IntroSub: {
        padding: 25,

    },
    IntroSubTxt: {
        fontSize: 14,
        color: 'rgba(205, 205, 205, 1)',
        fontWeight: '800'
    },
    Intro: {
        paddingLeft: 25,
        paddingBottom: 25,
    },
    IntroTxt : {
        fontSize : 36,
        color : 'rgba(245, 245, 245, 1)',
        fontWeight : 'bold'
    },
    BtnArea: {
        flex: 2,
        paddingRight : 25,
        paddingLeft : 25,
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    LoginBtn : {
        margin : 5,
        padding : 20,
        borderRadius : 10,
        width : width * 0.8,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'rgba(255, 255, 255, 1)'
    },
    LoginTxt : {
        fontSize : 18,
        color : 'rgba(21, 186, 193, 1)'
    },
    RegisterBtn : {
        margin : 5,
        padding : 20,
        borderRadius : 10,
        width : width * 0.8,
        justifyContent : 'center',
        alignItems : 'center',
        borderColor : 'rgba(255, 255, 255, 1)',
        borderWidth : 1,
    },
    RegisterTxt : {
        fontSize : 18,
        color : 'rgba(255, 255, 255, 1)'
    },
})

export default BeforeLoginScreen;