const common = {
  PINK_200: '#fae6ebff',
  PINK_400: '#fba0bbff',
  PINK_500: '#f79db8ff',
  PINK_700: '#fa84a7ff',
  RED_300: '#ec7e7eff',
  RED_500: '#e17070ff',
  BLUE_400: '#acc4d6ff',
  BLUE_500: '#91c0ebff',
  GREEN_400: '#CCE6BA',
  YELLOW_400: '#f4e6b9ff',
  YELLOW_500: '#f4dc7cff',
  PURPLE_400: '#C4C4E7',
  UNCHANGE_WHITE: '#fff',
  UNCHANGE_BLACK: '#000',
};

const colors = {
  light: {
    WHITE: '#FFF',
    GRAY_100: '#F8F8F8',
    GRAY_200: '#E7E7E7',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#000',
    ...common,
  },
  dark: {
    WHITE: '#161616',
    GRAY_100: '#202124',
    GRAY_200: '#3C4043',
    GRAY_300: '#5e5e5e',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#F8F8F8',
    BLACK: '#FFF',
    ...common,
  },
};

export {colors};
