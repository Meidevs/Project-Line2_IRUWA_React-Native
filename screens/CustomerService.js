import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

function NotificationScreen({ route, navigation }) {
    const [categories, setNotiCategories] = useState([]);
    const [questions, setQuestion] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.TitleHeader}>
                    <Text style={styles.TitleHeaderTxtStyle}>고객센터</Text>
                </View>
            ),
        })
    }, []);

    const GET_QUESTIONS = async () => {
        var Questions = [
            { id: 'a_1', question: '업체 게시글 등록에 대해 알려주세요,' },
            { id: 'a_2', question: '프리미엄 광고 비용은 얼마인가요?' },
            { id: 'a_3', question: '광고에 들어가면 안되는 금지어는 무엇이 있나요?' },
            { id: 'a_4', question: '채팅은 어떻게 해야하나요?' },
            { id: 'a_5', question: '기존 카테고리 외의 다른 업체는 어떻게 해야하나요?' },
            { id: 'a_6', question: '위치 정보가 동작을 하지 않아요!' },
            { id: 'a_7', question: '게시글에 사진을 첨부할 수 없어요. (사진이 안 올라가요)' },
            { id: 'a_8', question: '탈퇴는 어떻게 해야하나요?' },
            { id: 'a_9', question: '게시물을 4개 이상 작성할 수는 없나요?' },
            { id: 'a_10', question: '게시물을 수정하려면 어떻게 해야하나요?' },
            { id: 'a_11', question: '친구를 초대했는데 쿠폰이 생기지가 않아요.' },
            { id: 'a_12', question: '특정 업체를 검색할 수 있나요?' },
            { id: 'a_13', question: '업체를 신고할 수는 없나요?' },
        ]
        setQuestion(Questions);
    }

    const GET_NOTICATE = useCallback(async () => {
        // const data = await DATA_SOURCE.GetNotifications();
        var NotisCate = [
            { id: 'a_1', name: '운영정책' },
            { id: 'a_2', name: '계정/인증' },
            { id: 'a_3', name: '구매/판매' },
            { id: 'a_4', name: '거래 품목' },
            { id: 'a_5', name: '거래 매너' },
            { id: 'a_6', name: '이벤트/초대' },
            { id: 'a_7', name: '업체홍보' },
        ]
        if (NotisCate.length % 3 != 0) {
            for (var i = 0; i < NotisCate.length % 3; i++) {
                NotisCate.push([]);
            }
        }
        setNotiCategories(NotisCate);
    }, [])

    useEffect(() => {
        GET_QUESTIONS();
    }, [])


    useEffect(() => {
        GET_NOTICATE();
    }, [GET_NOTICATE])

    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.SearchBox}>
                <View style={styles.TextInputBox}>
                    <TextInput
                        placeholder={'강서현님, 무엇을 도와드릴까요?'}
                        placeholderTextColor='#B4B4B4'
                    />
                </View>
            </View>
            <ScrollView>
                <View style={styles.ContentSelectBox}>
                    {
                        categories.map((data) => {
                            return (
                                <View key={data.id} style={styles.ContentSelect}>
                                    <Text>{data.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.ContentListBox}>
                    <View style={styles.ListTitle}>
                        <Text>사용자들이 자주 묻는 질문을 확인해보세요.</Text>
                    </View>
                    {
                        questions.map((data) => {
                            return (
                                <View key={data.id} style={styles.ListItem}>
                                    <Text>Q. {data.question}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.ContactBox}>
                    <View style={styles.ContactText}>
                        <Text style={styles.ContactTextStyle}>그래도 해결이 안되시나요?</Text>
                        <Text style={styles.TextStyle}>고객센터에 문의하기</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TitleHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    TitleHeaderTxtStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    Container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
    SearchBox: {
        height: height * 0.08,
        width: width,
        backgroundColor: 'rgba(130, 130, 130, 1)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    TextInputBox: {
        borderRadius: 3,
        height: height * 0.05,
        width: width * 0.9,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    ContentSelectBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginBottom: 10,
    },
    ContentSelect: {
        width: width * 0.33,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContentListBox: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom : 10,
    },
    ListTitle : {
        paddingBottom : 15,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    ListItem : {
        paddingTop : 10,
        paddingBottom : 10,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderColor : 'rgba(238, 238, 238, 1)'
    },
    ContactBox : {
        height : height * 0.12,
        width : width,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'rgba(255, 255, 255, 1)'
    },
    ContactText : {
        paddingTop : 10,
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center'
    },
    ContactTextStyle : {
        padding : 10,
        fontWeight : '700',
    },
    TextStyle : {
        color : 'rgba(70, 146, 144, 1)'
    }
})

export default NotificationScreen;