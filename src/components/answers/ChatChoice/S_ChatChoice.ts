import { StyleSheet } from 'react-native'

export const ChatChoiceStyles = StyleSheet.create({
  main: {
    height: 100,
    width: '100%',
    padding: 16,
  },
  checkboxBlock: {
    marginLeft: 4,
    marginVertical: 6,
    height: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
    textAlign: 'center',
  },
  checkboxText: {
    marginLeft: 11,
    fontSize: 18,
  },
  scrollPickerWrapper: {
    height: 100,
    alignItems: 'center',
  },
  scrollPickerText: {
    fontFamily: 'Circe-Regular',
    fontSize: 20,
  },
})
