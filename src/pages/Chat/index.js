import React, { useEffect, useCallback, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoImg from '../../assets/logo.png';

const firebaseConfig = {
  apiKey: 'AIzaSyA_0hhUEBwVVGv4MnwTzvqsDwLw1aJT8hQ',
  authDomain: 'peca-facil-chat.firebaseapp.com',
  databaseURL: 'https://peca-facil-chat.firebaseio.com',
  projectId: 'peca-facil-chat',
  storageBucket: 'peca-facil-chat.appspot.com',
  messagingSenderId: '824618354196',
  appId: '1:824618354196:web:640663991b6647778f8901',
  measurementId: 'G-JS1VEDD1F1',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default function Chat({ route }) {
  const { item } = route.params;

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const appendMessages = useCallback(
    (messagesItem) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messagesItem),
      );
    },
    [messages],
  );

  async function handleSend(messagesArr) {
    const writes = messagesArr.map((m) => {
      return db.collection('chats').add({
        text: m.text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.id,
          email: user.email,
        },
      });
    });
    await Promise.all(writes);
  }

  const chatID = () => {
    const chatIDpre = [];
    chatIDpre.push(user.id);
    chatIDpre.push(item.id);
    chatIDpre.sort();
    return chatIDpre.join('_');
  };

  useEffect(() => {
    const readUser = async () => {
      const userStorage = await AsyncStorage.getItem('@PecaFacil:user');
      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
    };
    readUser();
  });

  useEffect(() => {
    /* const getMessages = async () => {
      db.collection('chats')
        .orderBy('createdAt', 'desc')
        .onSnapshot((doc) => {
          const receivedMessages = [];

          console.log(doc.docs);

          doc.docs.map((message) => {
            return receivedMessages.push({
              _id: message.id,

              ...message.data(),
            });
          });
          appendMessages(receivedMessages);
        });
    };
    getMessages(); */
    setMessages([
      {
        _id: 1,
        text: 'Olá, em que posso ajudar?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'FVJ',
          avatar: logoImg /* 'https://placeimg.com/140/140/any' */,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((message = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  return (
    <GiftedChat
      dateFormat="DD-MM-YYYY"
      timeFormat="h:mm"
      messages={messages}
      onSend={(messagesArr) => onSend(messagesArr)}
      user={user}
    />
  );
}
