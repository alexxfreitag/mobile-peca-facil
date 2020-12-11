import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../pages/Login';
import SignUpOption from '../pages/SignUpOption';
import SignUpUser from '../pages/SignUpUser';
import HomeUser from '../pages/HomeUser';
import HomeSeller from '../pages/HomeSeller';
import ProductDetail from '../pages/ProductDetail';
import ProductRegistration from '../pages/ProductRegistration';
import Chat from '../pages/Chat';
import SignUpSeller from '../pages/SignUpSeller';
// import MainTabScreen from '../pages/MainTab';

const Stack = createStackNavigator();

const TransitionRigthWithoutHeader = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

const HomeOptions = {};

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpOption"
        component={SignUpOption}
        options={TransitionRigthWithoutHeader}
      />
      <Stack.Screen
        name="SignUpUser"
        component={SignUpUser}
        options={TransitionRigthWithoutHeader}
      />
      <Stack.Screen
        name="SignUpSeller"
        component={SignUpSeller}
        options={TransitionRigthWithoutHeader}
      />
      {/* <Stack.Screen
        name="HomeUser"
        component={MainTabScreen}

      /> */}
      <Stack.Screen
        name="HomeUser"
        component={HomeUser}
        options={({ navigation }) => ({
          title: 'PeçaFácil',
          headerStyle: {
            backgroundColor: '#D74D4D',
          },
          // headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Icon
              name="log-out"
              color="#fff"
              size={25}
              style={{ marginRight: 10 }}
              onPress={async () => {
                await AsyncStorage.multiRemove([
                  '@PecaFacil:token',
                  '@PecaFacil:user',
                ]);
                navigation.navigate('Login');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="HomeSeller"
        component={HomeSeller}
        options={({ navigation }) => ({
          title: 'PeçaFácil',
          headerStyle: {
            backgroundColor: '#D74D4D',
          },
          // headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Icon
              name="log-out"
              color="#fff"
              size={25}
              style={{ marginRight: 10 }}
              onPress={async () => {
                await AsyncStorage.multiRemove([
                  '@PecaFacil:token',
                  '@PecaFacil:user',
                ]);
                navigation.navigate('Login');
              }}
            />
          ),
        })}
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
