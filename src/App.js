import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';

import Routes from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#D74D4D" />
      <View style={{ flex: 1, backgroundColor: '#D74D4D' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
}
