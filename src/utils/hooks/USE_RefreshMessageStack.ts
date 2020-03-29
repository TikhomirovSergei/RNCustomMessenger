/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {TUseChatMiddleware} from './USE_ChatMiddleware';
import shortid from 'shortid';

export const useRefreshMessageStack = (chatMiddleware: TUseChatMiddleware) => {
  const [index, setIndex] = React.useState(0);
  const {
    setAnswerFieldVisible,
    currentChatBotQuestion: {botMessage},
    messages,
  } = chatMiddleware;
  const isTyping = messages.length < botMessage.length;

  React.useEffect(() => {
    const isLastMessageTypedMe =
      messages.length && messages[messages.length - 1].sender === 'me';
    if (isLastMessageTypedMe) {
      const waitingTime = messages[messages.length - 1].text!.length * 90;
      const timer = setTimeout(() => setIndex(0), waitingTime);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const addedNewMessageInStack = React.useCallback(() => {
    const timeToShowNextMessage = botMessage[index].text.length * 90;
    const toShowNextMessage = setTimeout(() => {
      setIndex(currentIndex => currentIndex + 1);
      chatMiddleware.refreshMessages(currentStack => [
        ...currentStack,
        {
          id: shortid.generate(),
          sender: 'chatBot',
          text: botMessage[index].text,
        },
      ]);
    }, timeToShowNextMessage);
    return () => clearTimeout(toShowNextMessage);
  }, [index]);

  React.useEffect(() => {
    if (index < botMessage.length) {
      addedNewMessageInStack();
      return () => {};
    }
    const answerFieldShowByTime = setTimeout(() => {
      setAnswerFieldVisible(true);
    }, 3000);
    return () => clearTimeout(answerFieldShowByTime);
  }, [index]);

  return {messages, isTyping};
};
