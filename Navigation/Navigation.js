import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Requests from '../Screens/Requests/Requests';
import Profile from '../Screens/Profile/Profile';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import AdditionalInfo from '../Screens/AdditionalInfo/AdditionalInfo';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPasword';
import LocationChange from '../Screens/LocationChange/LocationChange';
import Search from '../Screens/Search/Search';
import ViewRequest from '../Screens/ViewRequest/ViewRequest';
import Navigate from '../Screens/Navigate/Navigate';
import EditProfile from '../Screens/EditProfile/EditProfile';

const AppTabNav = createBottomTabNavigator();

function AppTabNavScreens() {
  return (
    <AppTabNav.Navigator>
      <AppTabNav.Screen name={'Search'} component={Search} />
      <AppTabNav.Screen name={'Requests'} component={Requests} />
      <AppTabNav.Screen name={'Profile'} component={Profile} />
    </AppTabNav.Navigator>
  );
}

const App = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <App.Navigator headerMode={'none'}>
        <App.Screen name={'Login'} component={Login} />
        <App.Screen name={'Signup'} component={Signup} />
        <App.Screen name={'LocationChange'} component={LocationChange} />
        <App.Screen name={'AdditionalInfo'} component={AdditionalInfo} />
        <App.Screen name={'ForgotPassword'} component={ForgotPassword} />
        <App.Screen name={'AppTab'} component={AppTabNavScreens} />
        <App.Screen name={'Requests'} component={Requests} />
        <App.Screen name={'ViewRequest'} component={ViewRequest} />
        <App.Screen name={'Navigate'} component={Navigate} />
        <App.Screen name={'EditProfile'} component={EditProfile} />
      </App.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
