import React, { useState, useEffect } from 'react';
import {
  AppState,
} from 'react-native';
import AUTHENTICATION from './assets/dataSource/authModel';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BeforeLoginScreen from './screens/BeforeLogin';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import FindUserScreen from './screens/FindUser';
import MainScreen from './screens/Main';
import DetailScreen from './screens/Detail';
import CateScreen from './screens/Category';
import AddScreen from './screens/Add';
import RingingScreen from './screens/Ringing';
import ChatListScreen from './screens/ChatList';
import ChatScreen from './screens/Chat';
import ChatInitialScreen from './screens/ChatInitial';
import MyinfoScreen from './screens/Myinfo';
import SearchScreen from './screens/Search';
import LocationScreen from './screens/Location';
import InviteScreen from './screens/Invite';
import NotificationScreen from './screens/Notification';
import CateListScreen from './screens/CateList';
import CustomerServiceScreen from './screens/CustomerService';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import ItemListScreen from './screens/ItemList';
import EditScreen from './screens/Edit';
import PickListScreen from './screens/PickList';
import SearchUserScreen from './screens/SearchUser';

import TabBar from './assets/components/TabBar';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const CateStack = createStackNavigator();
const ChatStack = createStackNavigator();
const MyinfoStack = createStackNavigator();
const LocationStack = createStackNavigator();

function getTabBarVisible(route) {
  if (route.state == undefined) {
    return true;
  } else {
    if (route.state.index !== 0) {
      return false;
    }
    return true;
  }
}

const LocationStackScreens = () => {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen
        name='Location'
        component={LocationScreen}
        options={{
          headerShown: true,
        }}
      />
    </LocationStack.Navigator>
  )
}

const MyinfoStackScreens = () => {
  return (
    <MyinfoStack.Navigator>
      <MyinfoStack.Screen
        name='Myinfo'
        component={MyinfoScreen}
      />
      <MyinfoStack.Screen
        name='Add'
        component={AddScreen}
      />
      <MyinfoStack.Screen
        name='Ringing'
        component={RingingScreen}
      />
      <MyinfoStack.Screen
        name='Invite'
        component={InviteScreen}
      />
      <MyinfoStack.Screen
        name='Notification'
        component={NotificationScreen}
      />
      <MyinfoStack.Screen
        name='CustomerService'
        component={CustomerServiceScreen}
      />
      <MyinfoStack.Screen
        name='Profile'
        component={ProfileScreen}
      />
      <MyinfoStack.Screen
        name='Settings'
        component={SettingsScreen}
      />
      <MyinfoStack.Screen
        name='ItemList'
        component={ItemListScreen}
      />
      <MyinfoStack.Screen
        name='Edit'
        component={EditScreen}
      />
      <MyinfoStack.Screen
        name='PickList'
        component={PickListScreen}
      />
    </MyinfoStack.Navigator>
  )
}

const ChatStackScreens = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name='ChatList'
        component={ChatListScreen}
      />
      <ChatStack.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
    </ChatStack.Navigator>
  )
}

const CateStackScreens = () => {
  return (
    <CateStack.Navigator>
      <CateStack.Screen
        name='Cate'
        component={CateScreen}
      />
      <CateStack.Screen
        name='CateList'
        component={CateListScreen}
      />
    </CateStack.Navigator>
  )
}
const config = {
  animation: 'timing',
  config: {
    duration: 1,
  },
};

const MainStackScreens = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const GET_USER_INFO = async () => {
      var userInfo = await AUTHENTICATION.GET_USER_INFOs();
      console.log('userInfo', userInfo)
    }
    GET_USER_INFO();
  }, [])

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  const handleAppStateChange = (nextAppState) => {
    console.log('App State: ' + nextAppState);
    if (appState != nextAppState) {

      setAppState(nextAppState);
    }
  };
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerLeft: null,
          headerTransparent: true,
          gestureDirection: 'horizontal'
        }}
      />
      <MainStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <MainStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
        }}
      />
      <MainStack.Screen
        name='Location'
        component={LocationStackScreens}
        options={{
          headerShown: false,
        }}
      />
      <CateStack.Screen
        name='CateList'
        component={CateListScreen}
      />
      <ChatStack.Screen
        name='ChatInitial'
        component={ChatInitialScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  )
}

const MainTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Main"
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="Main"
        component={MainStackScreens}
        options={({ route }) => ({
          tabBarLabel: '홈',
          tabBarVisible: getTabBarVisible(route),
        })} />
      <Tabs.Screen
        name="Cates"
        component={CateStackScreens}
        options={({ route }) => ({
          tabBarLabel: '카테고리',
          tabBarVisible: getTabBarVisible(route),
        })} />
      <Tabs.Screen
        name="Chat"
        component={ChatStackScreens}
        options={({ route }) => ({
          tabBarLabel: '채팅',
          tabBarVisible: getTabBarVisible(route),
        })} />
      <Tabs.Screen
        name="Myinfo"
        component={MyinfoStackScreens}
        options={({ route }) => ({
          tabBarLabel: '나의당근',
          tabBarVisible: getTabBarVisible(route)
        })} />
    </Tabs.Navigator>
  )
}

const App = () => {

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="BeforeLogin">
        <AuthStack.Screen
          name="BeforeLogin"
          component={BeforeLoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: true,
            headerStyle: {
              elevation: 0,
              backgroundColor: '#ffffff',
              shadowOffset: {
                height: 0,
              }
            }
          }}
        />
        <AuthStack.Screen
          name="FindUser"
          component={FindUserScreen}
          options={{
            headerShown: true,
            headerTransparent: true
          }}
        />
        <AuthStack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="SearchUser"
          component={SearchUserScreen}
          options={{
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
              }
            }
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;