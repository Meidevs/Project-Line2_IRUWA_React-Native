import React, { useState, useEffect } from 'react';
import {
    View,
    Modal,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

const ModalBox = ({ visible, callback }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(visible)
    }, [visible])

    const setModealStatus = () => {
        setModalVisible(false)
        callback(false)
    }

    return (
        <Modal
            animated
            animationType="fade"
            visible={modalVisible}
        >
            <SafeAreaView style={styles.Container}>
                <View style={styles.HeaderForm}>
                    <TouchableOpacity style={styles.BackBtn} onPress={() => setModealStatus(false)}>
                        <Image source={require('../../images/close_button.png')}
                            style={{ width: 15, height: 15, }}
                        />
                    </TouchableOpacity>
                    <View style={styles.HeaderTitle}>
                        <Text style={styles.TitleTxt}>개인정보 처리방침</Text>
                    </View>
                </View>
                <ScrollView style={styles.TermsForm}>
                    <Text style={styles.TermsTitleTxt}>
                        제 1 조 (목적)
                        </Text>
                    <Text style={styles.TermsTxt}>
                        • 2호선(이하&quot;회사&quot;)는 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있으며,
                        이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장합니다. 회사는
                        정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정,
                        가이드라인을 준수하고 있습니다. 개인정보처리방침&#39;이란 이용자의 소중한 개인정보를
                        보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을
                        의미합니다.
                        </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 2 조 (개인정보 수집에 대한 동의 및 수집 방법)
                        </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 회사는 이용자가 회사의 개인정보처리방침 또는 이용약관의 내용에 대해 ‘동의함’ 또는
                        ‘동의하지 않음’을 선택할 수 있는 절차를 마련하여 ‘동의함’을 선택하면 개인정보 수집에 대해
                        동의한 것으로 봅니다.
                        • 2. 개인 정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를
                        구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.
                        • 1) 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고
                        직접 정보를 입력하는 경우
                        • 2) 제휴 서비스 또는 단체 등으로부터 개인정보를 제공받은 경우
                        • 3) 고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등
                        • 4) 온·오프라인에서 진행되는 이벤트/행사 등 참여
                        </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 3 조 (개인정보 수집∙이용 목적 및 수집항목 등)
                        </Text>
                    <Text style={styles.TermsTxt}>
                        • 이용자는 별도의 회원가입 절차 없이 대부분의 컨텐츠에 자유롭게 접근할 수 있습니다.
                        그러나 회사는 회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나
                        프로그램 등을 통해 아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고
                        있습니다. 회사의 제공을 위하여 수집되는 정보는 아래와 같습니다.
                        </Text>
                    <View style={{width : width, padding : 20, flexDirection : 'row'}}>
                        <Image source={require('../../images/terms.jpg')}
                            resizeMode={'contain'}
                            style={{flex : 1,}}
                        />
                    </View>
                    <Text style={styles.TermsTitleTxt}>
                        제 4 조 (장기 미이용회원)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 장기미이용 회원은 2호선 최종 이용 후 1년 동안 이용 기록이 없는 회원을 말합니다.
                        • 2. 이 회원의 개인정보는 즉시 탈퇴 처리되며, 이메일을 등록한 회원에 한해 탈퇴 처리일
                        기준 최소 30일 이전 이메일로 안내해드리겠습니다.
                        • 3. 장기미이용 회원이 탈퇴 처리 전에 2호선 서비스를 계속 이용하시고자 하는 경우,
                        서비스에 로그인하시기를 요청드립니다.
                        • 4. 회원가입 시 장기 미접속시에도 계정 유지를 선택한 회원은 장기미이용 회원이 되더라도
                        탈퇴 처리되지 않으며, 최대 3년까지 계정이 유지됩니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 5 조 (개인정보 자동수집 장치의 설치∙운영 및 그 거부에 관한 사항)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 쿠키(cookie)는 웹사이트가 회원의 브라우저(인터넷 익스플로러, 크롬, 파이어폭스, 기타
                        모바일 브라우저)로 전송하는 소량의 정보입니다. 회사는 회원에 대한 정보를 저장하고 수시로
                        찾아내는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 회원의 컴퓨터 또는 모바일 기기는 식별하지만
                        회원을 개인적으로 식별하지는 않습니다. 또한 회원은 쿠키에 대한 선택권이 있습니다.
                        • 1) 웹브라우저 상단의 도구 &gt;인터넷옵션 탭(option tab)에서 모든 쿠키를 다
                        받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키를 거부할
                        수 있는 선택권을 가질 수 있습니다.
                        • 2) 모바일 기기의 경우에도 ‘설정’ 메뉴나 또는 각 모바일 브라우저의 설정 메뉴에서
                        쿠키에 대한 선택을 제어할 수 있습니다. 다만, 쿠키를 거부할 경우 로그인이 필요한
                        서비스 이용에 일부 제약이 있을 수 있습니다.
                        • 2. 회사의 쿠키(cookie) 운용
                        • 1) 개인의 관심 분야에 따라 차별화된 정보를 제공
                        • 2) 회원과 비회원의 접속빈도 또는 머문 시간 등을 분석하여 이용자의 취향과
                        관심분야를 파악하여 타겟(target) 마케팅에 활용
                        • 3) 클릭한 정보들에 대한 세부정보와 관심 있게 둘러본 정보들에 대한 자취를
                        분석하여 다음 번 접속 때 개인 맞춤 서비스를 제공
                        • 4) 유료서비스 이용 시 이용기간 안내
                        • 5) 회원들의 습관을 분석하여 서비스 개편 등의 척도로 이용
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 6 조 (개인정보의 제3자 제공에 대한 동의)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 회사는 회원의 개인정보를 제3조(개인정보수집∙이용 목적 및 수집항목 등)에서 고지한
                        범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업, 기관에 제공하지
                        않습니다. 개인정보를 제3자에게 제공해야 하는 경우에는 반드시 사전에 이용자에게 해당

                        사실을 알리고 동의를 받은 내용만을 제공하겠습니다.
                        • 2. 다만 다음의 경우는 예외로 하고, 이용자의 사전 동의없이 이용자 정보를 제공 할 수
                        있습니다.
                        • 1) 관계법령에 의하여 수사 등의 목적으로 관계기관으로부터 제공 요구가 있을 경우
                        • 2) 통계작성, 학술연구나 시장조사를 위하여 특정 개인을 식별할 수 없는 형태로
                        광고주 협력사나 연구단체 등에 제공하는 경우
                        • 3) 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 7 조 (개인정보의 위탁처리)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 회사는 서비스 제공에 있어 필요한 업무 중 일부를 외부 업체가 수행하도록 개인정보를
                        위탁하고 있습니다. 그리고 위탁받은 업체가 관계 법령을 준수하도록 관리·감독하고 있습니다.
                        회사의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.
                        • (주)가비아 : SMS발송
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 8 조 (개인정보의 열람, 정정)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 이용자는 언제든지 등록되어 있는 본인의 개인정보를 열람하거나 정정할 수 있습니다.
                        개인정보 열람 및 정정을 하고자 할 경우에는 “내정보&gt;내정보수정”을 선택하여 직접 열람
                        또는 정정하거나, 개인정보보호책임자 및 담당자에게 서면, 전화 또는 E-mail로 연락하시면
                        지체 없이 조치하겠습니다.
                        • 2. 이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 당해
                        개인 정보를 이용 또는 제공하지 않습니다.
                        • 3. 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체
                        없이 통지하여 정정하도록 조치하겠습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 9 조 (이용자 및 법정대리인의 권리와 행사)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 회원가입 등을 통해 개인정보의 수집, 이용, 제공에 대해 회원이 동의한 내용을 회원은
                        언제든지 철회하실 수 있습니다. 동의철회는 “내정보&gt;내정보수정&gt;회원탈퇴”를 선택하거나
                        개인정보보호책임자에게 팩스, 우편, 고객센터, 전화 등으로 연락하시면 개인정보의 삭제 등
                        필요한 조치를 하겠습니다. 동의 철회를 하고 개인정보를 파기하는 등의 조치를 취한 경우에는
                        그 사실을 귀하께 지체 없이 통지하도록 하겠습니다.
                        • 2. 회사는 개인정보의 수집에 대한 동의철회(회원탈퇴)를 개인정보를 수집하는 방법보다
                        쉽게 할 수 있도록 필요한 조치를 취하겠습니다.
                        • 3. 만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정할 권리,
                        수집 및 이용 동의를 철회할 권리를 가집니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 10 조 (개인정보보호를 위한 기술 및 관리적 대책)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 회사는 이용자의 개인정보를 안전하게 관리하기 위하여 최선을 다하며, 개인정보가 분실,
                        도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 방법으로
                        개인정보를 보호하고 있습니다.
                        • 1. 개인정보를 암호화 하여 저장하고 있습니다.
                        • 2. 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안 장치(SSL)를 채택하고
                        있습니다.
                        • 3. 해킹등 외부 침입에 대비하여 각 서버마다 침입차단시스템 및 접근자 모니터링 시스템을
                        이용하여 보안에 만전을 기하고 있습니다.
                        • 4. 개인정보를 처리하는 직원을 최소한으로 관리하며, 전 직원의 보안서약서를 통하여
                        사람에 의한 정보유출 가능성을 줄이고 있습니다.
                        • 5. 회사는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해
                        책임을 지지 않습니다. 회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의 아이디와
                        비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다.
                        • 6. 그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조,
                        훼손이 유발될 경우 회사는 즉각 귀하께 사실을 알리고 적절한 대책과 보상을 강구할
                        것입니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 11 조 (개인정보의 파기)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 이용자의 개인정보는 동의를 받은 개인정보의 수집 및 이용목적이 달성되면 법령 또는
                        내부 방침에 의해 보전할 필요가 없는 경유를 제회하고는 지체 없이 파기됩니다.
                        • 2. 이외에 법령에 따라 일정기간 보관해야 하는 개인정보 및 해당 법령은 아래와 같습니다.
                        • ㆍ보존 항목 : 계약 또는 청약철회 등에 관한 기록
                        • ㆍ 근거 법령 : 전자상거래 등에서의 소비자보호에 관한 법률
                        • ㆍ 보존 기간 : 5년
                        •
                        ㆍ 보존 항목 : 대금결제 및 재화 등의 공급에 관한 기록
                        • ㆍ 근거 법령 : 전자상거래 등에서의 소비자보호에 관한 법률
                        • ㆍ 보존 기간 : 5년
                        •
                        ㆍ 보존 항목 : 소비자의 불만 또는 분쟁처리에 관한 기록
                        • ㆍ 근거 법령 : 전자상거래 등에서의 소비자보호에 관한 법률
                        • ㆍ 보존 기간 : 3년
                        •
                        ㆍ 보존 항목 : 표시/광고에 관한 기록
                        • ㆍ 근거 법령 : 전자상거래 등에서의 소비자보호에 관한 법률
                        • ㆍ 보존 기간 : 6개월
                        •
                        ㆍ 보존 항목 : 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류
                        • ㆍ 근거 법령 : 국세기본법

                        • ㆍ 보존 기간 : 5년
                        •
                        ㆍ 보존 항목 : 전자금융 거래에 관한 기록
                        • ㆍ 근거 법령 : 전자금융거래법
                        • ㆍ 보존 기간 : 5년
                        •
                        ㆍ 보존 항목 : 서비스 방문기록
                        • ㆍ 근거 법령 : 통신비밀보호법
                        • ㆍ 보존 기간 : 3개월
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 12 조 (개인정보보호 책임자)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 회사는 개인정보를 적절히 관리·보호하고, 이용자의 불만을 원활히 처리할 수 있도록
                        실질적인 책임을 질 수 있는 지위에 있는 자를 개인정보 보호책임자로 지정해 운영하고
                        있으며, 개인정보 보호책임자의 성명과 연락처는 아래와 같습니다.
                        • 1. 소속 : 관리팀
                        • 2. 성명 : 이상길
                        • 3. 연락처 : 02-867-5559
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        제 13 조 (개인정보 처리방침의 개정과 고지 의무)
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 1. 본 개인정보처리방침이 변경이 되는 경우 회사는 변경 사항을 최소 10일 전에 회사의
                        홈페이지 등 기타 공지사항 페이지를 통해 게시합니다.
                        • 2. 단, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이
                        발생할 때에는 최소 30일 전에 공지하며, 필요 시 이용자 동의를 다시 받겠습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        부 칙
                    </Text>
                    <Text style={styles.TermsTxt}>
                        • 공고일자 : 2020년 10월 01일
                        • 시행일자 : 2020년 10월 01일
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </Modal >
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    HeaderForm: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
        shadowOffset: {
            height: 1,
        }
    },
    BackBtn: {
        padding : 25,
    },
    HeaderTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    TitleTxt: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
    },
    TermsForm : {
        padding : 10,
    },
    TermsTitleTxt: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000',
        letterSpacing: -0.3,
        marginBottom: 10,
    },
    TermsTxt: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
        letterSpacing: -0.3,
        marginBottom: 10,
    }
})


export default ModalBox;