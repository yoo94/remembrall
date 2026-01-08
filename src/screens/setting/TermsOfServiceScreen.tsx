import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

function TermsOfServiceScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView contentContainerStyle={{paddingBottom: insets.bottom + 20}}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Remembrall 서비스 이용약관</Text>
          <Text style={styles.updateDate}>최종 수정일: 2026년 1월 8일</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. 서비스 소개</Text>
            <Text style={styles.sectionContent}>
              Remembrall은 사용자가 지도 위에 개인의 추억을 기록하고, 해당 장소를 다시 방문할 때 자동으로 추억을 알림받는 위치 기반 일기 애플리케이션입니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. 이용약관의 효력 및 변경</Text>
            <Text style={styles.sectionContent}>
              본 이용약관은 사용자가 본 앱을 설치 및 이용하는 시점부터 효력이 발생합니다.이용약관을 개선하기 위해 예고 없이 변경할 수 있으며, 변경된 약관은 변경된 시점부터 효력이 발생합니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. 사용자의 의무</Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>
                • 사용자는 본인의 정보를 정확하게 제공해야 합니다
              </Text>
              <Text style={styles.listItem}>
                • 타인의 정보나 계정을 무단으로 사용할 수 없습니다
              </Text>
              <Text style={styles.listItem}>
                • 비정상적이거나 위법한 방법으로 서비스를 이용할 수 없습니다
              </Text>
              <Text style={styles.listItem}>
                • 타인에게 피해를 주는 행위는 금지됩니다
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. 서비스 이용 제한</Text>
            <Text style={styles.sectionContent}>
              회사는 다음과 같은 경우 사용자의 서비스 이용을 제한할 수 있습니다:
            </Text>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>
                • 본 이용약관을 위반하는 경우
              </Text>
              <Text style={styles.listItem}>
                • 법령 또는 공공질서에 위배되는 행위
              </Text>
              <Text style={styles.listItem}>
                • 서비스의 정상적인 운영을 방해하는 경우
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. 지적재산권</Text>
            <Text style={styles.sectionContent}>
              본 애플리케이션에 포함된 모든 콘텐츠의 저작권 및 소유권은 회사에 귀속됩니다. 사용자가 업로드한 콘텐츠는 서비스 제공 목적으로만 사용됩니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. 면책조항</Text>
            <Text style={styles.sectionContent}>
              회사는 본 서비스를 '있는 그대로' 제공하며, 명시적 또는 묵시적 보장을 제공하지 않습니다. 사용자의 서비스 이용으로 인한 손해에 대해 법이 허용하는 범위 내에서 책임을 지지 않습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. 준거법 및 관할</Text>
            <Text style={styles.sectionContent}>
              본 이용약관은 대한민국 법률에 따라 해석되며, 분쟁은 대한민국의 법원에서 해결합니다.
            </Text>
          </View>

          <Text style={styles.footer}>
            이 약관은 예고 없이 변경될 수 있습니다.
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

export default TermsOfServiceScreen;