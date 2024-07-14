import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from '@react-navigation/native';
import HomeScreen from '../../screens/Home/HomeScreen';

const Tab = createBottomTabNavigator();

const IconTab = ({routeName, focused, color, size}) => {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

const renderIconTab = (route, focused, color, size) => {
  return (
    <IconTab
      routeName={route.name}
      focused={focused}
      color={color}
      size={size}
    />
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          renderIconTab(route, focused, color, size),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {paddingBottom: 5, height: 60},
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
