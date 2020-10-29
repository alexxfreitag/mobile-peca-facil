import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import SingUpOption from '../pages/SingUpOption';
import SingUpUser from '../pages/SingUpUser';
import Home from '../pages/Home';
import AutomobileType from '../pages/FiltersPage/AutomobileType';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SingUpOption" component={SingUpOption} />
      <Stack.Screen name="SingUpUser" component={SingUpUser} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AutomobileType" component={AutomobileType} />
    </Stack.Navigator>
  );
}
