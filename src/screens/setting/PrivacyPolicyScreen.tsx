import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

function PrivacyPolicyScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}>
        <View style={styles.contentContainer}>
          {/* 제목 */}
          <Text style={styles.title}>Remembrall 개인정보처리방침</Text>
          <Text style={styles.updateDate}>최종 수정일: 2026년 1월 8일</Text>

          {/* 1. 수집하는 개인정보 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. 수집하는 개인정보</Text>
            <Text style={styles.sectionContent}>
              Remembrall은 다음과 같은 개인정보를 수집합니다:
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>
                • 위치정보(GPS 좌표): 마커 생성 및 근처 알림 기능
              </Text>
              <Text style={styles.listItem}>
                • 주소정보: 위치 주소 표시
              </Text>
              <Text style={styles.listItem}>
                • 사진/이미지: 마커와 함께 저장된 추억 이미지
              </Text>
              <Text style={styles.listItem}>
                • 마커 정보: 색상, 점수, 설명, 방문날짜
              </Text>
              <Text style={styles.listItem}>
                • 알림 설정: 근처 도착 시 알림 거리
              </Text>
              <Text style={styles.listItem}>
                • 계정정보: 이메일, 로그인 정보
              </Text>
            </View>
          </View>

          {/* 2. 수집 목적 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. 개인정보 수집 목적</Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>
                • 지도에 마커 표시 및 위치 기반 서비스 제공
              </Text>
              <Text style={styles.listItem}>
                • 근처 도착 시 알림 기능 제공
              </Text>
              <Text style={styles.listItem}>
                • 사용자 추억 기록 관리 및 저장
              </Text>
              <Text style={styles.listItem}>
                • 앱 서비스 개선 및 사용자 경험 개선
              </Text>
              <Text style={styles.listItem}>
                • 부정 사용 방지 및 보안
              </Text>
            </View>
          </View>

          {/* 3. 보유 및 이용 기간 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. 보유 및 이용 기간</Text>
            <Text style={styles.sectionContent}>
              개인정보는 원칙적으로 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 단, 사용자가 계정을 유지하는 동안 서비스 제공을 위해 필요한 정보는 계정 삭제 시까지 보유합니다.
            </Text>
          </View>

          {/* 4. 개인정보 보안 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. 개인정보 보안 조치</Text>
            <Text style={styles.sectionContent}>
              Remembrall은 사용자의 개인정보 보호를 위해 다음과 같은 보안 조치를 취합니다:
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>
                • 로그인 인증을 통한 접근 제어
              </Text>
              <Text style={styles.listItem}>
                • 정기적인 보안 점검
              </Text>
              <Text style={styles.listItem}>
                • 최소 필요 정보만 수집 원칙 준수
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. 사용자의 권리</Text>
            <Text style={styles.sectionContent}>
              사용자는 다음의 권리를 가집니다:
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>
                • 개인정보 열람 및 확인
              </Text>
              <Text style={styles.listItem}>
                • 개인정보 수정 및 변경
              </Text>
              <Text style={styles.listItem}>
                • 개인정보 삭제 요청
              </Text>
              <Text style={styles.listItem}>
                • 개인정보 처리 정지 요청
              </Text>
            </View>
            <Text style={styles.sectionContent}>
              위 권리를 행사하려면 jaeseok9405@gmail.com  메일을 통해 문의해주시기 바랍니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. 위치정보 이용약관</Text>
            <Text style={styles.sectionContent}>
                Remembrall은 위치정보를 다음 목적으로만 사용합니다:
            </Text>
            <View style={styles.listContainer}>
                <Text style={styles.listItem}>
                • 사용자가 추가한 마커의 위치 저장 및 서버 동기화
                </Text>
                <Text style={styles.listItem}>
                • 백그라운드 위치 추적을 통한 근처 알림 기능
                </Text>
                <Text style={styles.listItem}>
                • 현재 위치 표시 및 지도 기능
                </Text>
            </View>
            <Text style={styles.sectionContent}>
                위치정보는 마커 생성 시 서버에 저장되며, 근처 알림을 위해 실시간 위치정보가 서버로 전송됩니다. 위치정보는 Remembrall 서비스 제공 목적으로만 사용되며 제3자와 공유되지 않습니다. 언제든지 앱 설정에서 위치정보 수집을 거부할 수 있습니다.
            </Text>
        </View>

          {/* 7. 문의 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. 문의</Text>
            <Text style={styles.sectionContent}>
              개인정보처리방침에 대한 문의나 불만이 있으신 경우, jaeseok9405@gmail.com 으로 메일 보내주시면 신속히 답변드리겠습니다.
            </Text>
          </View>

          <Text style={styles.footer}>
            이 방침은 예고 없이 변경될 수 있습니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
      marginBottom: 5,
    },
    updateDate: {
      fontSize: 12,
      color: colors[theme].GRAY_500,
      marginBottom: 20,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
      marginBottom: 10,
    },
    sectionContent: {
      fontSize: 13,
      color: colors[theme].GRAY_700,
      lineHeight: 20,
      marginBottom: 10,
    },
    listContainer: {
      marginLeft: 5,
      gap: 8,
    },
    listItem: {
      fontSize: 13,
      color: colors[theme].GRAY_700,
      lineHeight: 20,
    },
    footer: {
      fontSize: 11,
      color: colors[theme].GRAY_500,
      textAlign: 'center',
      marginTop: 30,
      paddingTop: 20,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
    },
  });

export default PrivacyPolicyScreen;