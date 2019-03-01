import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  screenHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'visible',
    zIndex: 1
  },
  raceCard: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  raceCardUnderlay: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  cardBorderRadiusLeft: {
    borderBottomLeftRadius: 25,
  },
  cardBorderRadiusRight: {
    borderTopRightRadius: 25,
  },
  speakerChip: {
    marginHorizontal: 5,
    marginRight: 10,
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  raceIcon: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    height: 36,
    width: 36,
  },
});

export default Style;
