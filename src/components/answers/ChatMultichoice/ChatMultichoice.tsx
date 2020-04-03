import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ChatMultichoiceStyles} from './S_ChatMultichoice';
import {TChatProps} from '../../../types';
import {ButtonComponent} from '../../shared/buttons/ButtonComponent';
import CheckBox from 'react-native-check-box';

const ChatMultichoice: FC<TChatProps> = React.memo(
  ({libraryInputData, chatMiddleware}) => {
    const [selected, refreshSelected] = React.useState<string[]>([]);
    const values = chatMiddleware!.currentChatBotQuestion!.myAnswer!
      .MULTICHOICE!.checkboxTitles!;

    const {answerFieldColor, buttonColor} = libraryInputData.viewStyles;

    const onValueChange = (title: string) => {
      if (selected.some(elem => elem === title)) {
        refreshSelected(currentValues =>
          currentValues.filter(value => value !== title),
        );
      } else {
        refreshSelected(currentValues => [...currentValues, title]);
      }
    };

    const onPress = React.useCallback(() => {
      chatMiddleware.sendAnswer(selected);
    }, [chatMiddleware, selected]);
    return (
      <View style={ChatMultichoiceStyles.main}>
        {values.map(title => (
          <View key={title} style={ChatMultichoiceStyles.checkboxBlock}>
            <CheckBox
              onClick={() => onValueChange(title)}
              isChecked={selected.some(elem => elem === title)}
              disabled={false}
              checkedCheckBoxColor={buttonColor}
              uncheckedCheckBoxColor={'#797979'}
            />
            <Text style={ChatMultichoiceStyles.checkboxText}>{title}</Text>
          </View>
        ))}
        <ButtonComponent
          title={'ОК'}
          fontFamily="Roboto"
          mainColor={buttonColor}
          secondColor={answerFieldColor}
          onPress={onPress}
          type="light"
        />
      </View>
    );
  },
);

export default ChatMultichoice;
