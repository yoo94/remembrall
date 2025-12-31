import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface TutorialModalProps {
  isVisible: boolean;
  hide: () => void;
}

const tutorialPages = [
  {
    title: '지도에서 메모 추가',
    description: '지도를 1초간 길게 터치하고 + 버튼을 누르면 메모를 추가할 수 있습니다.',
    image: require('@/assets/tutorial_map.png'), // 예시 이미지, 없으면 생략
  },
  {
    title: '알람 설정',
    description: '메모에서 알람 설정을 누르고 미터를 입력하면, 해당 거리 내 접근 시 알람이 울립니다.',
    image: require('@/assets/tutorial_alarm.png'), // 예시 이미지, 없으면 생략
  },
];

function TutorialModal({isVisible, hide}: TutorialModalProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [page, setPage] = useState(0);

  const handlePrev = () => setPage(p => (p > 0 ? p - 1 : p));
  const handleNext = () => setPage(p => (p < tutorialPages.length - 1 ? p + 1 : p));

  const hideAction = () => {
    hide();
    setPage(0); // 모달이 닫힐 때 페이지를 처음으로 초기화
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.background}>
        <View style={styles.cardContainer}>
          <View style={styles.arrowContainer}>
            <Pressable onPress={handlePrev} disabled={page === 0}>
              <Ionicons
                name="chevron-back"
                size={30}
                color={page === 0 ? colors[theme].GRAY_300 : colors[theme].BLACK}
              />
            </Pressable>
            <Pressable onPress={handleNext} disabled={page === tutorialPages.length - 1}>
              <Ionicons
                name="chevron-forward"
                size={30}
                color={page === tutorialPages.length - 1 ? colors[theme].GRAY_300 : colors[theme].BLACK}
              />
            </Pressable>
          </View>
          <View style={styles.contentContainer}>
            {/* 이미지가 있으면 표시 */}
            {tutorialPages[page].image && (
              <Image source={tutorialPages[page].image} style={styles.image} resizeMode="contain" />
            )}
            <Text style={styles.titleText}>{tutorialPages[page].title}</Text>
            <Text style={styles.descText}>{tutorialPages[page].description}</Text>
          </View>
          <Pressable style={styles.closeButton} onPress={hideAction}>
            <Text style={styles.closeText}>닫기</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    cardContainer: {
      backgroundColor: colors[theme].WHITE,
      borderRadius: 15,
      padding: 24,
      width: 320,
      alignItems: 'center',
    },
    arrowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 16,
    },
    contentContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    image: {
      width: 220,
      height: 220,
      marginBottom: 16,
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
      marginBottom: 8,
    },
    descText: {
      fontSize: 15,
      color: colors[theme].GRAY_700,
      textAlign: 'center',
    },
    closeButton: {
      marginTop: 8,
      paddingVertical: 8,
      paddingHorizontal: 24,
      backgroundColor: colors[theme].GRAY_200,
      borderRadius: 8,
    },
    closeText: {
      color: colors[theme].BLACK,
      fontWeight: 'bold',
    },
  });

export default TutorialModal;