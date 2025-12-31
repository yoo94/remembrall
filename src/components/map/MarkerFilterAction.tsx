import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActionSheet} from '../common/ActionSheet';
import {colors} from '@/constants/colors';
import useFilterStore from '@/store/filter';
import useThemeStore from '@/store/theme';
// CustomMarker를 import하세요. 경로는 실제 위치에 맞게 수정
import CustomMarker from '../common/CustomMarker';

interface MarkerFilterActionProps {
  isVisible: boolean;
  hideAction: () => void;
}

function MarkerFilterAction({isVisible, hideAction}: MarkerFilterActionProps) {
  const {theme} = useThemeStore();
  const [filterCondition, setFilterCondition] = useState('색상');
  const {filters, setFilters} = useFilterStore();

  const handleFilter = (name: string) => {
    setFilters({...filters, [name]: !filters[name]});
  };

  return (
    <ActionSheet
      isVisible={isVisible}
      hideAction={hideAction}
      animationType="fade">
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Title>마커 필터링</ActionSheet.Title>
          <ActionSheet.Divider />
          <View style={styles.filterContainer}>
            {['색상', '마커 모양'].map(condition => (
              <ActionSheet.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => setFilterCondition(condition)}>
                {condition}
              </ActionSheet.Filter>
            ))}
          </View>
          <ActionSheet.Divider />
          {filterCondition === '색상' && (
            <>
              {[
                colors[theme].PINK_400,
                colors[theme].YELLOW_400,
                colors[theme].GREEN_400,
                colors[theme].BLUE_400,
                colors[theme].PURPLE_400,
              ].map(color => (
                <ActionSheet.CheckBox
                  key={color}
                  isChecked={filters[color]}
                  onPress={() => handleFilter(color)}
                  icon={
                    <View style={[styles.marker, {backgroundColor: color}]} />
                  }
                />
              ))}
            </>
          )}
          {filterCondition === '마커 모양' && (
            <View style={styles.markerShapeContainer}>
              {['1', '2', '3', '4', '5'].map(score => (
                <ActionSheet.MarkerCheckBox
                  key={score}
                  isChecked={filters[score]}
                  onPress={() => handleFilter(score)}
                  icon={
                    <View>
                      <CustomMarker
                        color={colors[theme].ICON}
                        score={Number(score)}
                      />
                    </View>
                  }
                />
              ))}
            </View>
          )}
          <ActionSheet.Divider />
          <ActionSheet.Button onPress={hideAction}>완료</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  markerShapeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});
export default MarkerFilterAction;