import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import {
  likeInactive,
  liveActive,
  notificationActive,
  notificationInactive,
  userActive,
  userInactive,
  missingPart,
  shoppingBagActive,
  shoppingBagInactive,
  videoActive,
  videoInactive,
} from '../assets/icons';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import MailScreen from '../screens/MailScreen/MailScreen';
import VideoScreen from '../screens/VideoScreen/VideoScreen';
import UserExtensionsScreen from '../screens/UserExtensionsScreen/UserExtensionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import SplashScreen from '../components/common/SplashScreen';
import useStore from '../stores/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SCREEN_NAME = {
  Home: 'Gợi ý',
  HomeTabs: 'HomeTabs',
  Login: 'Login',
  ProductDetail: 'ProductDetail',
  Mail: 'Mail',
  Video: 'Live & Video',
  UserExtensions: 'Tôi',
  Notifications: 'Thông báo',
  Splash: 'Splash',
};

// TabBarIcon Component
const TabBarIcon = ({route, focused}) => {
  let icon;

  switch (route.name) {
    case SCREEN_NAME.Home:
      icon = focused ? liveActive : likeInactive;
      break;
    case SCREEN_NAME.ProductDetail:
      icon = focused ? notificationActive : notificationInactive;
      break;
    case SCREEN_NAME.Mail:
      icon = focused ? shoppingBagActive : shoppingBagInactive;
      break;
    case SCREEN_NAME.Video:
      icon = focused ? videoActive : videoInactive;
      break;
    case SCREEN_NAME.UserExtensions:
      icon = focused ? userActive : userInactive;
      break;
    case SCREEN_NAME.Notifications:
      icon = focused ? notificationActive : notificationInactive;
      break;
    default:
      icon = missingPart;
      break;
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
      <Tab.Screen name={SCREEN_NAME.Mail} component={MailScreen} />
      <Tab.Screen name={SCREEN_NAME.Video} component={VideoScreen} />
      <Tab.Screen
        name={SCREEN_NAME.Notifications}
        component={NotificationsScreen}
      />
      <Tab.Screen
        name={SCREEN_NAME.UserExtensions}
        component={UserExtensionsScreen}
      />
    </Tab.Navigator>
  );
};

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const AppNavigator = () => {
  // const isLoading = useStore(state => state.isLoading);
  // const toggleLoading = useStore(state => state.toggleLoading);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_NAME.Splash}
        screenOptions={screenOptions}>
        <Stack.Screen name={SCREEN_NAME.Splash} component={SplashScreen} />
        <Stack.Screen name={SCREEN_NAME.HomeTabs} component={HomeTabs} />
        <Stack.Screen
          name={SCREEN_NAME.Login}
          component={LoginScreen}
          options={{headerBackVisible: false, cardStyleInterpolator: forFade}}
        />
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
