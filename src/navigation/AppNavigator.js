/* eslint-disable no-unused-vars */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductDetailScreen from '../screens/Product/ProductDetailScreen';
import {
  likeInactive,
  liveActive,
  notificationActive,
  notificationInactive,
  userActive,
  userInactive,
  missingPart,
} from '../assets/icons';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SCREEN_NAME = {
  Home: 'Home',
  HomeTabs: 'HomeTabs',
  Login: 'Login',
  ProductDetail: 'ProductDetail',
};

// TabBarIcon Component
const TabBarIcon = ({route, focused}) => {
  let icon;
  if (route.name === SCREEN_NAME.Home) {
    icon = focused ? liveActive : likeInactive;
  } else if (route.name === SCREEN_NAME.ProductDetail) {
    icon = focused ? notificationActive : notificationInactive;
  } else {
    icon = missingPart;
  }
  return <Image source={icon} style={styles.icon} />;
};

// Function to return screen options
const screenOptions = ({route}) => ({
  tabBarIcon: props => <TabBarIcon route={route} {...props} />,
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  headerShown: false, // Hide the header
});

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.Login}
      screenOptions={screenOptions}>
      <Tab.Screen name={SCREEN_NAME.Home} component={HomeScreen} />
      <Tab.Screen
        name={SCREEN_NAME.ProductDetail}
        component={ProductDetailScreen}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAME.Login}
        screenOptions={screenOptions}>
        <Stack.Screen name={SCREEN_NAME.HomeTabs} component={HomeTabs} />
        <Stack.Screen name={SCREEN_NAME.Login} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
export {SCREEN_NAME};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
