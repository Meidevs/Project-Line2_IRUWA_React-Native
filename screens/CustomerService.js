import { removeAllPushTokenListeners } from 'expo-notifications';
import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DATA_SOURCE from '../assets/dataSource/dataModel';

const { width, height } = Dimensions.get('window');

function NotificationScreen({ route, navigation }) {
    const [categories, setNotiCategories] = useState([]);
    const [questions, initQuestion] = useState([]);
    const [questionList, showQuestions] = useState([]);

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
            { id: 'a_2', question: 'Q. 업체 게시글 등록에 대해 알려주세요.', answer: 'A. 이루와 앱에 등록된 가맹점들은 승인과 동시에 템플릿 범위 내 자체 홍보글을 작성할 수 있습니다.' },
            { id: 'a_2', question: 'Q. 일반 홍보 등록 비용과 지역적인 프리미엄 광고비는 어떻게 부과하나요?', answer: 'A. 이루와 앱에서는 사업초기에 등록비와 광고비를 부과하지 않으며 추후 공지문을 통하여 광고 및 홍보 비용에 대하여 공지할 예정입니다.' },
            { id: 'a_2', question: 'Q. 광고에 특별한 금지어 및 사진이 있나요? ', answer: 'A. 이루와 앱의 가맹점 기본 정책은 사업자 정보가 필수 이며 사회적으로 문제가 되는 불법적인 이미지 및 합성 사진은 게재 불가 합니다. 또한 이슈가 되는 용어나 성문화와 관련 되는 용어를 리스트 할 경우 지속적으로 모니터링 하여 벌점을 부과 하거나 이를 어길시 영구적으로 가맹점을 취소할 예정입니다.' },
            { id: 'a_2', question: 'Q. 채팅은 어떤 경우에 하나요?', answer: 'A. 추후 이루와 에서는 가상번호를 가맹점 마다 부여할 예정이나 사용자와 가맹점주 간에 원할한 소통을 원하실 경우 채팅 기능을 부여 하였습니다.' },
            { id: 'a_2', question: 'Q. 가맹점 등록시 카테고리는 무엇을 뜻하나요?', answer: 'A. 예를 들어 가맹점 업체가 포차이면 포차 카테고리에 등록 하셔야 하며 단란주점인 경우 단란주점 카테고리에 정확하게 등록 하여 주셔야 사용자가 쉽게 해당 정보를 득할 수 있습니다.' },
            { id: 'a_2', question: 'Q. 위치 정보가 동작을 하지 않아요!', answer: 'A. 이 경우 당사에 연락 주시면 곧바로 수정 조치 하도록 하겠습니다.' },
            { id: 'a_2', question: 'Q. 게시글에 사진을 첨부 할 수 없어요.(사진이 안 올라감)', answer: 'A. 일부 블랙필터링 차원에서 24시간 회사에서 모니터링 하여 의도적인 사진이나 게시글을 올리지 못하게 하고 있습니다. 다만 문제가 없는 사진이 게재 불가 시에는 즉시 연락주시면 수정 하도록 하겠습니다.' },
            { id: 'a_3', question: 'Q. 탈퇴는 어떤 과정을 거치나요.', answer: 'A. 가맹점이나 사용자 모두 앱상 로그아웃 하거나 회사의 고객센터로 로그인 하여 요청을 하시면 영구적으로 삭제 해 드립니다.' },
            { id: 'a_2', question: 'Q. 게시물을 4개 이상 작성 할 수 없나요?', answer: 'A. 네 그렇습니다 상황을 지켜보고 좀더 홍보 할 수 있는 공간을 제공 하도록 하겠습니다.' },
            { id: 'a_2', question: 'Q. 카카오T와 T맵 작동은 어떻게 하나요?', answer: 'A. 이미 사용자의 핸드폰 앱 에 위 두가지중 하나만 다운로드 되어 있으면 즉시 실행 합니다.' },
            { id: 'a_2', question: 'Q. 광고 및 홍보 기간은 어떻게 설정 되나요?', answer: 'A. 이루와 앱 광고 정책은 매월 1일을 기준으로 1개월을  노출 해드립니다.' },
            { id: 'a_2', question: 'Q. 혹시 가맹점 업체들의 요청에 따라 업소 사진이나 홍보글을 대행 하여 주나요?', answer: 'A. 네 가능 합니다. 다만 지방은 당장 불가 하구요 서울과 경기 지방은 가능 합니다. 그럴 경우 과금이 발생 되기에 가급적 업체 측에서 올리시는 것이 경제적입니다.' },
            { id: 'a_1', question: 'Q. 개인정보 보호와 이용약관에 따라 철저하게 개인 신상을 보호하여 주시나요?', answer: 'A. 그렇습니다.' },
        ]
        for (var i = 0; i < Questions.length; i++) {
            Questions[i].visible = false;
        }
        initQuestion(Questions);
        showQuestions(Questions)
    }

    const GET_NOTICATE = useCallback(async () => {
        // const data = await DATA_SOURCE.GetNotifications();
        var NotisCate = [
            { id: 'a_1', name: '약관 및 정책' },
            { id: 'a_2', name: '이용안내' },
            { id: 'a_3', name: '회원정보' },
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

    const orderCSList = (data) => {
        var rawArray = new Array();
        rawArray = questions.filter((item) => item.id == data);
        showQuestions(rawArray)
    }

    const toggleAnswer = (data) => {
        questionList[data].visible = !questionList[data].visible;
        showQuestions([
            ...questionList,
        ]);
    }

    return (
        <SafeAreaView style={styles.Container}>
            {/* <View style={styles.SearchBox}>
                <View style={styles.TextInputBox}>
                    <TextInput
                        placeholder={'강서현님, 무엇을 도와드릴까요?'}
                        placeholderTextColor='#B4B4B4'
                    />
                </View>
            </View> */}
            <ScrollView>
                <View style={styles.ContentSelectBox}>
                    {
                        categories.map((data, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => orderCSList(data.id)}
                                    key={index.toString()}
                                    style={styles.ContentSelect}>
                                    <Text>{data.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.ContentListBox}>
                    <View style={styles.ListTitle}>
                        <Text>사용자들이 자주 묻는 질문을 확인해보세요.</Text>
                    </View>
                    {
                        questionList.map((data, index) => {
                            return (
                                <View style={styles.ListItem}>
                                    <TouchableOpacity
                                        style={styles.Questions}
                                        onPress={() => toggleAnswer(index)}
                                        key={index.toString()}
                                    >
                                        <Text>{data.question}</Text>
                                    </TouchableOpacity>

                                    {
                                        data.visible == true ?
                                            <View style={styles.Answer}>
                                                <Text>{data.answer}</Text>
                                            </View>
                                            :
                                            null
                                    }
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
        backgroundColor: '#ebebeb'
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
        marginTop: 10,
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
        backgroundColor: '#ebebeb',
    },
    ListTitle: {
        padding: 25,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ebebeb'
    },
    ListItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'rgba(238, 238, 238, 1)',
        backgroundColor: '#ffffff'
    },
    Questions : {
        padding : 15,
    },   
    Answer: {
        padding : 15,
        backgroundColor: '#ebebeb'
    },
    ContactBox: {
        height: height * 0.12,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    ContactText: {
        paddingTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ContactTextStyle: {
        padding: 10,
        fontWeight: '700',
    },
    TextStyle: {
        color: 'rgba(70, 146, 144, 1)'
    }
})

export default NotificationScreen;