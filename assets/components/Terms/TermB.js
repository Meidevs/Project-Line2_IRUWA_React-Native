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
} from 'react-native';

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
                        <Text style={styles.TitleTxt}>회원 이용 약관</Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={styles.TermsTitleTxt}>
                        1) 제 1 조 (목적)
                    </Text>
                    <Text style={styles.TermsTitleTxt}>2) 본 약관은 2호선(이하 &quot;회사&quot;)와 이용고객(이하 “이용자”)간에 회사가 제공하는 서비스(이하
                    &quot;서비스&quot;라고 합니다)를 이용하면서 회사와 이용자의 권리·의무 및 책임 사항을 규정함을 목적으로
                    합니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        3) 제 2 조 (이용약관의 효력 및 변경)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. 본 약관은 서비스를 이용하고자 하는 모든 이용자가 약관에 동의하고 회사가 정한 소정의 절차에 따라 이용자로
                        등록함으로써 효력이 발생합니다. 여기에서 이용자라 함은 계정을 생성한 이용자(회원) 및 계정을 생성하지 않은
                        이용자(비회원)도 포함됩니다.
                         2. 이용자가 온라인에서 본 약관의 &quot;동의하기&quot;를 선택하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히
                        이해하였으며, 그 적용에 동의한 것으로 봅니다.
                         3. 회사는 위치정보의 보호 및 이용 등에 관한 법률, 콘텐츠산업 진흥법, 전자상거래 등에서의 소비자보호에 관한 법률,
                        소비자 기본법 약관의 규제에 관한 법률 등 관련법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
                         4. 회사가 약관을 개정할 경우에는 적용일자, 개정사유를 명시하여 적용일 10일 전부터 공지합니다. 개정 내용이
                        이용자에게 불리한 경우에는 적용일 30일 전부터 공지하고 이를 서비스 홈페이지에 게시하거나 이용자에게 전자적
                        형태(전자우편, SMS 등)로 약관 개정 사실을 발송하여 고지합니다. 단, 이용자의 연락처 미기재, 변경 후 미수정
                        등으로 인하여 개별 통지가 어려운 경우 공지를 개별 통지로 간주합니다
                         5. 회사가 전항에 따라 이용자에게 통지하면서 공지 또는 공지ㆍ고지일로부터 개정약관 시행일 7일 후까지 거부의사를
                        표시하지 아니하면 이용약관에 승인한 것으로 봅니다. 이용자가 개정약관에 동의하지 않을 경우 이용자는 이용계약을
                        해지할 수 있습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        4) 제 3 조 (서비스의 내용)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         회사가 제공하는 서비스는 아래와 같습니다.
                         1. 서비스 명 : 이루와
                         2. 서비스 내용 : 전국 놀이문화 및 음식점 위치정보를 제공하는 스마트폰 어플리케이션 서비스로, 내주변 업체 검색 시
                        사용자의 현재위치 주변 업체의 정보를 제공합니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        5) 제 4 조 (서비스 이용요금)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. 회사가 제공하는 서비스는 무료입니다. 단, 별도의 유료 서비스의 경우 해당 서비스에 명시된 요금을 지불하여야 사용
                        가능합니다.

                         2. 무선 서비스 이용 시 발생하는 데이터 통신료는 별도이며 가입한 각 이동통신사의 정책에 따릅니다.
                         3. MMS 등으로 게시물을 등록할 경우 발생하는 요금은 이동통신사의 정책에 따릅니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        6) 제 5 조 (서비스내용변경 통지 등)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         회사가 서비스 내용을 변경하거나 종료하는 경우 회사는 서비스의 공지사항 등을 통하여 서비스 내용의 변경 사항 또는
                        종료를 통지할 수 있습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        7) 제 6 조 (서비스이용의 제한 및 중지)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. 회사는 아래 각 호에 해당하는 사유가 발생한 경우에는 이용자의 서비스 이용을 제한하거나 중지시킬 수 있습니다.
                        o 1) 이용자가 회사 서비스의 운영을 고의 또는 중과실로 방해하는 경우
                        o 2) 서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우
                        o 3) 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우
                        o 4) 국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 때
                        o 5) 기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우
                        o 6) 만 14세 미만의 아동이 신청할 경우
                         2. 회사는 전항의 규정에 의하여 서비스의 이용을 제한하거나 중지한 때에는 그 사유 및 제한기간 등을 이용자에게
                        알려야 합니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        8) 제 7 조 (정보제공 및 광고의 게제)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. &quot;회사&quot;는 &quot;이용자&quot;가 &quot;서비스&quot; 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편 등의 방법으로
                        &quot;이용자&quot;에게 제공할 수 있습니다. 다만, &quot;이용자&quot;는 관련법에 따른 거래관련 정보 및 고객문의 등에 대한 답변 등을
                        제외하고는 언제든지 전자우편에 대해서 수신 거절을 할 수 있습니다.
                         2. 제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는 경우에는 &quot;이용자&quot;의 사전 동의를 받아서
                        전송합니다. 다만, &quot;이용자&quot;의 거래관련 정보 및 고객문의 등에 대한 회신에 있어서는 제외됩니다.
                         3. &quot;회사&quot;는 &quot;서비스&quot;의 운영과 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고를 게재할 수 있습니다. 광고가
                        게재된 전자우편을 수신한 &quot;이용자&quot;는 수신거절을 &quot;회사&quot;에게 할 수 있습니다.

                         4. &quot;이용자(회원, 비회원 포함)&quot;는 회사가 제공하는 서비스와 관련하여 게시물 또는 기타 정보를 변경, 수정, 제한하는
                        등의 조치를 취하지 않습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        9) 제 8 조 (게시물의 저작권)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. &quot;이용자&quot;가 &quot;서비스&quot; 내에 게시한 &quot;게시물&quot;의 저작권은 해당 게시물의 저작자에게 귀속됩니다.
                         2. &quot;이용자&quot;가 &quot;서비스&quot; 내에 게시하는 &quot;게시물&quot;은 검색결과 내지 &quot;서비스&quot; 및 관련 프로모션 등에 노출될 수 있으며,
                        해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법
                        규정을 준수하며, &quot;이용자&quot;는 언제든지 고객센터를 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를
                        요구할 수 있습니다.
                         3. &quot;회사&quot;는 제2항 이외의 방법으로 &quot;이용자&quot;의 &quot;게시물&quot;을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해
                        사전에 &quot;이용자&quot;의 동의를 얻어야 합니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        10) 제 9 조 (게시물의 관리)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. &quot;이용자&quot;의 &quot;게시물&quot;이 &quot;정보통신망법&quot; 및 &quot;저작권법&quot;등 관련법에 위반되는 내용을 포함하는 경우, 권리자는
                        게시중단 및 삭제 등을 요청할 수 있으며, &quot;회사&quot;는 관련법에 따라 조치를 취하여야 합니다.
                         2. &quot;회사&quot;는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및
                        관련법에 위반되는 경우에는 관련법에 따라 해당 &quot;게시물&quot;에 대해 임시조치 등을 취할 수 있습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        11) 제 10 조 (권리의 귀속)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. &quot;서비스&quot;에 대한 저작권 및 지적재산권은 &quot;회사&quot;에 귀속됩니다. 단, &quot;이용자&quot;의 &quot;게시물&quot; 및 제휴계약에 따라 제공된
                        저작물 등은 제외합니다.
                         2. &quot;회사&quot;는 서비스와 관련하여 &quot;이용자&quot;에게 &quot;회사&quot;가 정한 이용조건에 따라 계정, &quot;아이디&quot;, 콘텐츠, &quot;포인트&quot; 등을
                        이용할 수 있는 이용권만을 부여하며, &quot;이용자&quot;는 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        12) 제 11 조 (개인정보의 보호 및 사용)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. 회사는 이용자의 개인정보를 보호하기 위하여 정보통신망법 및 개인정보 보호법 등 관계 법령에서 정하는 바를
                        준수합니다.
                         2. 회사는 이용자의 개인정보를 보호하기 위하여 개인정보처리방침을 제정, 서비스 초기화면에 게시합니다. 다만,
                        개인정보처리방침의 구체적 내용은 연결화면을 통하여 볼 수 있습니다.

                         3. 회사는 개인정보처리방침, 위치정보이용약관에 따라 이용자의 개인정보 및 개인위치정보를 최대한 보호하기
                        위하여 노력합니다.
                         4. 회사의 공식 사이트 이외의 링크된 사이트에서는 회사의 개인정보처리방침이 적용되지 않습니다. 링크된 사이트 및
                        구매 상품이나 서비스를 제공하는 제3자의 개인정보 취급과 관련하여는 해당 사이트 및 제3자의 개인정보처리방침을
                        확인할 책임이 회원에게 있으며, 회사는 이에 대하여 책임을 부담하지 않습니다.
                         5. 회사는 다음과 같은 경우에 법이 허용하는 범위 내에서 이용자의 개인정보를 제3자에게 제공할 수 있습니다.
                        o 1) 수사기관이나 기타 정부기관으로부터 정보제공을 요청 받은 경우
                        o 2) 이용자의 법령 또는 약관의 위반을 포함하여 부정행위 확인 등의 정보보호 업무를 위해 필요한 경우
                        o 3) 기타 법률에 의해 요구되는 경우
                        o 4) “이벤트”시 제3자에게 이벤트 업무에 필요한 이용자의 동의를 득한 최소한의 이용자의 정보(성명, 연락처)를
                        알려주는 경우
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        13) 제 12조 (쿠폰)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. 쿠폰은 회사가 유상 또는 무상으로 발행하는 쿠폰으로 발행대상, 발행경로, 사용대상 등에 따라 구분될 수 있으며,
                        쿠폰의 세부구분, 할인금액(할인율), 사용방법, 사용기간 및 제한에 대한 사항은 쿠폰 또는 서비스 화면에 표시됩니다.
                        쿠폰의 종류 및 내용과 발급여부에 관하여는 회사의 영업정책에 따라 달라질 수 있습니다.
                         2. 쿠폰은 현금으로 교환될 수 없으며, 쿠폰에 표시된 사용기간이 만료되거나 이용계약이 종료되면 소멸합니다.
                         3. 이용자(회원)은 회사가 별도로 명시한 경우를 제외하고는 쿠폰을 제3자 또는 다른 아이디로 양도 할 수 없으며
                        유상으로 거래하거나 현금으로 전환 할 수 없습니다. 만일 이용자(회원)가 회사가 승인하지 않은 부정한 방법으로
                        쿠폰을 획득/이용한 사실이 확인될 경우 회사는 이용자(회원)의 쿠폰을 취소 및 회수하거나 회원 자격을 정지 또는
                        해지할 수 있습니다.
                         4. 쿠폰 관련 회사의 정책은 회사의 영업정책에 따라 변동될 수 있습니다. 이용자(회원)에게 불리한 변경인 경우에는
                        제2조의 규정에 따라 공지 또는 통지하며 서비스 계속 이용시 동의한 것으로 간주됩니다.
                        14) 제 13조 (별정통신 서비스에 관한 사업자 공지 사항)
                         제휴업체와 통화를 위해 사용되는 050 서비스는 추후 제공(제휴)할 예정입니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        15) 제 15조 (책임제한)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. “회사”는 “서비스제공자”와 “이용자”간의 상품거래를 중개하는 플랫폼 서비스만을 제공할 뿐, 판매 당사자가 아니며,
                        “서비스”에 대한 예약, 결제, 손실 등에 대한 책임은 “서비스제공자”에게 있습니다.
                         2. 회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여 이용자에게 발생한 손해에 대해서는 책임을
                        부담하지 않습니다.
                        o 1) 천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우
                        o 2) 서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우
                        o 3) 이용자의 귀책사유로 서비스 이용에 장애가 있는 경우
                        o 4) 서비스에 대한 접속 및 서비스의 이용과정에서 발생하는 개인적인 손해
                        o 5) 서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인 이용으로 부터 발생하는 손해
                        o 6) 서버에 대한 전송 또는 서버로 부터의 전송에 대한 제3자의 모든 불법적인 방해 또는 중단행위로부터 발생하는
                        손해
                        o 7) 제3자가 서비스를 이용하여 불법적으로 전송, 유포하거나, 전송, 유포되도록 한 모든 바이러스, 스파이웨어 및
                        기타 악성 프로그램으로 인한 손해
                        o 8) 전송된 데이터의 오류 생략, 누락 파괴 등으로 발생되는 손해
                        o 9) 이용자간의 이용자 상태정보 등록 및 서비스 이용 과정에서 발생하는 명예훼손 기타 불법행위로 인한 각종
                        민형상 책임
                        o 10) 제1호 내지 제3호를 제외한 기타 회사의 고의ㆍ과실이 없는 사유로 인한 경우
                         3. 회사는 서비스 및 서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 보증을 하지 않으며 이로 인해
                        발생한 이용자의 손해에 대하여는 책임을 부담하지 아니합니다.
                         4. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대한 책임을 지지 않으며, 이용고객 상호간 및
                        이용고객과 제3자간의 서비스를 매개로 발생한 분쟁에 대해 개입할 의무 및 배상의 책임을 지지 않습니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        16) 제 16조 (규정의 준용)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. 본 약관은 대한민국법령에 의하여 규정되고 이행됩니다.
                         2. 본 약관은 신의성실의 원칙에 따라 공정하게 적용하며, 본 약관에 명시되지 아니한 사항에 대하여는 관계법령 또는
                        상관례에 따릅니다.
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        17) 제 17조 (회사의 연락처)
                    </Text>
                    <Text style={styles.TermsTxt}>
                         회사의 상호 및 주소 등은 다음과 같습니다.
                         1. 상호 : ㈜2호선
                         2. 주소 : 서울특별시 구로구 디지털로 26길 123, 지플러스타워 1302호
                         3. 대표전화 : 02-867-5559
                        18) 4. 이메일 주소 : iruwa77@gmail.com
                    </Text>
                    <Text style={styles.TermsTitleTxt}>
                        19) 부 칙
                    </Text>
                    <Text style={styles.TermsTxt}>
                         1. (공지일) 본 약관은 2020년 10월 01일에 공지되었습니다.
                         2. (시행일) 본 약관은 2020년 10월 01일부터 시행합니다.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </Modal>
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
        margin: 25,
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