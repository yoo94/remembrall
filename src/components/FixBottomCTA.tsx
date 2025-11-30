import {StyleSheet, View} from 'react-native';
import CustomButton from '@/components/CustomButton';
import {colors} from '@/constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface FixBottomCTAProps {
  label: string;
  onPress: () => void;
}

function FixBottomCTA({label, onPress}: FixBottomCTAProps) {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingBottom: inset.bottom || 12}]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
  },
});

export default FixBottomCTA;
