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

const Tab = createBottomTabNavigator();

const SCREEN_NAME = {
  Home: 'Home',
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

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={SCREEN_NAME.Login}
        screenOptions={screenOptions}>
        <Tab.Screen name={SCREEN_NAME.Home} component={HomeScreen} />
        <Tab.Screen
          name={SCREEN_NAME.ProductDetail}
          component={ProductDetailScreen}
        />
        <Tab.Screen name={SCREEN_NAME.Login} component={LoginScreen} />
      </Tab.Navigator>
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
