import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import SingUpOption from '../pages/SingUpOption';
import SingUpUser from '../pages/SingUpUser';
import Home from '../pages/Home';
import AutomobileType from '../pages/FiltersPage/AutomobileType';
import ProductDetail from '../pages/ProductDetail';
import Chat from '../pages/Chat';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingUpOption"
        component={SingUpOption}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingUpUser"
        component={SingUpUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AutomobileType" component={AutomobileType} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          title: 'Detalhes do produto',
          headerStyle: {
            backgroundColor: '#D74D4D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '300',
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#D74D4D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '300',
          },
        }}
      />
    </Stack.Navigator>
  );
}
