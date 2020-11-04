import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import Login from '../pages/Login';
import SingUpOption from '../pages/SingUpOption';
import SingUpUser from '../pages/SingUpUser';
import HomeUser from '../pages/HomeUser';
import HomeSeller from '../pages/HomeSeller';
import AutomobileType from '../pages/FiltersPage/AutomobileType';
import ProductDetail from '../pages/ProductDetail';
import ProductRegistration from '../pages/ProductRegistration';
import Chat from '../pages/Chat';
import SingUpSeller from '../pages/SingUpSeller';

const Stack = createStackNavigator();

const TransitionRigthWithoutHeader = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

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
        options={TransitionRigthWithoutHeader}
      />
      <Stack.Screen
        name="SingUpUser"
        component={SingUpUser}
        options={TransitionRigthWithoutHeader}
      />
      <Stack.Screen
        name="SingUpSeller"
        component={SingUpSeller}
        options={TransitionRigthWithoutHeader}
      />
      <Stack.Screen
        name="HomeUser"
        component={HomeUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeSeller"
        component={HomeSeller}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductRegistration"
        component={ProductRegistration}
        options={{
          title: 'Inserir novo produto',
          headerStyle: {
            backgroundColor: '#D74D4D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '300',
          },
        }}
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
