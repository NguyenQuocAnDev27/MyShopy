import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useStoreContext} from '../../stores';
import {app_logo} from '../../assets/images';
import fontSettings from '../../assets/fonts/fontSettings';
import colors from '../../constants/colors';

const LoginScreen = () => {
  // const {products, fetchProducts} = useStoreContext();

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  const {nameUser, OnChangeNameUser} = useState(
    'Enter email/phone number/name user',
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <View style={styles.logo_container}>
          <Image source={app_logo} style={styles.app_logo} />
        </View>
        <View style={styles.inputInfoLoginFieldContainer}>
          <View />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    ...fontSettings.h1.regular,
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo_container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  app_logo: {
    width: 45,
    height: 45,
  },
  inputInfoLoginFieldContainer: {
    width: '100%',
  },
});

export default LoginScreen;
