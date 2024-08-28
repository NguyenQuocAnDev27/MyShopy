/* eslint-disable no-unused-vars */
import React, {useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useStoreContext} from '../../stores';
import {app_logo} from '../../assets/images';
import {
  user,
  missingPart,
  password2,
  sms,
  facebook,
  appleid,
  google,
  user_focus,
  password_focus,
} from '../../assets/icons';
import fontSettings from '../../assets/fonts/fontSettings';
import colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_NAME} from '../../navigation/AppNavigator';
import LoadingScreen from '../../components/common/LoadingScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MessageFullSreen from '../../components/common/MessageFullSreen';

const LogoContainer = ({
  assetPath = missingPart,
  assetPathFocus = missingPart,
  isFocused = false,
}) => {
  return (
    <View
      style={
        !isFocused
          ? styles_logoContainer.container.normal
          : styles_logoContainer.container.focus
      }>
      <Image
        source={isFocused ? assetPathFocus : assetPath}
        style={styles_logoContainer.logo}
      />
    </View>
  );
};

const styles_logoContainer = StyleSheet.create({
  container: {
    normal: {
      padding: 8,
      borderWidth: 1,
      borderRadius: 999,
    },
    focus: {
      padding: 8,
      borderWidth: 1,
      borderRadius: 999,
      backgroundColor: colors.text4,
    },
  },
  logo: {
    width: 25,
    height: 25,
  },
});

const CustomTextInput = ({assetPath, assetPathFocus, ...props}) => {
  const [isFocused, setIsFocus] = useState(false);
  return (
    <View style={styles_InputInfoLoginFieldContainer.field}>
      <LogoContainer
        assetPath={assetPath}
        assetPathFocus={assetPathFocus}
        isFocused={isFocused}
      />
      <TextInput
        style={
          isFocused
            ? styles_InputInfoLoginFieldContainer.textInput.focus
            : styles_InputInfoLoginFieldContainer.textInput.normal
        }
        secureTextEntry={props.secureTextEntry ?? false}
        placeholder={props.placeholder}
        placeholderTextColor={colors.text4}
        onChangeText={newText => props.onChangeText(newText)}
        defaultValue={props.defaultValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

const InputInfoLoginFieldContainer = ({navigation, funtions = null}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fakeFetchAPILogin_v2 = ({input_user, input_pw}) => {
    return new Promise((resolve, reject) => {
      if (input_user === 'Admin' && input_pw === '999') {
        setTimeout(() => {
          console.log('-', input_user, input_pw, 'access app');
          resolve({
            Status: true,
            Message: 'Đăng nhập thành công',
            Exception: null,
            Data: {
              User: 'Admin',
              JWTToken: 'this_is_token',
            },
          });
        }, 3000);
      } else {
        setTimeout(() => {
          console.log('-', input_user, input_pw, 'access app');
          reject({
            Status: false,
            Message: null,
            Exception: {
              Code: 100,
              Error: 'Sai tài khoản hoặc mật khẩu',
            },
            Data: null,
          });
        }, 3000);
      }
    });
  };

  const CheckLogin = async (input_user, input_pw) => {
    if (funtions != null) {
      funtions.toggleLoading();
    }

    // Call API here
    const res = await fakeFetchAPILogin_v2({
      input_user: input_user,
      input_pw: input_pw,
    })
      .then(response => {
        console.log('Login Success:', response);
        return response;
      })
      .catch(error => {
        console.log('Login Failed:', error);
        return error;
      });

    // Check status
    if (res?.Status === false || res?.Message === null) {
      // Message error

      // Turn off Loading screen
      if (funtions != null) {
        funtions.toggleLoading();
      }
      return;
    }

    navigation?.navigate(SCREEN_NAME.HomeTabs);
  };

  return (
    <View style={styles_InputInfoLoginFieldContainer.container}>
      <View style={styles_InputInfoLoginFieldContainer.fieldGroup}>
        <CustomTextInput
          assetPath={user}
          assetPathFocus={user_focus}
          placeholder={'Nhập email của bạn'}
          onChangeText={newText => setUsername(newText)}
          defaultValue={username}
        />
        <CustomTextInput
          assetPath={password2}
          assetPathFocus={password_focus}
          secureTextEntry={true}
          placeholder={'Nhập mật khẩu'}
          onChangeText={newText => setPassword(newText)}
          defaultValue={password}
        />
      </View>
      <View style={styles_InputInfoLoginFieldContainer.buttons}>
        <LoginButton
          assetPath={sms}
          title="Đăng nhập"
          displayIcon={false}
          onClick={async () => await CheckLogin(username, password)}
        />
        <TouchableOpacity>
          <View style={styles_InputInfoLoginFieldContainer.textButtonContainer}>
            <Text style={styles_InputInfoLoginFieldContainer.textButton}>
              Quên mật khẩu
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles_InputInfoLoginFieldContainer = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 30,
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 0.7,
    marginTop: 5,
    marginBottom: 5,
  },
  textInput: {
    normal: {
      width: 300,
      borderBottomWidth: 0.3,
      borderColor: colors.not_focus,
      ...fontSettings.h6.regular,
      color: colors.text4,
      paddingLeft: 10,
    },
    focus: {
      width: 300,
      borderBottomWidth: 1,
      borderColor: colors.text4,
      ...fontSettings.h5.regular,
      color: colors.text4,
      paddingLeft: 10,
    },
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  textButtonContainer: {
    width: 340,
    marginTop: 10,
    marginBottom: 10,
  },
  textButton: {
    ...fontSettings.h6.regular,
    color: colors.text4,
    textAlign: 'right',
  },
});

const LoginButton = ({
  assetPath = missingPart,
  title = 'Button',
  displayIcon = true,
  onClick = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles_LoginButton.container}>
      {displayIcon ? (
        <Image source={assetPath} style={styles_LoginButton.icon} />
      ) : null}
      <Text style={styles_LoginButton.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles_LoginButton = StyleSheet.create({
  container: {
    padding: 8,
    width: 340,
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.text4,
    margin: 3,
  },
  icon: {
    width: 25,
    height: 25,
    position: 'absolute',
    left: 10,
  },
  title: {
    ...fontSettings.h5.bold,
    color: colors.text3,
  },
});

const ExtraLoginMethodsContainer = ({navigation}) => {
  return (
    <View style={styles_ExtraLoginMethodsContainer.container}>
      <View style={styles_ExtraLoginMethodsContainer.titleContainer}>
        <LinearGradient
          colors={[colors.surface, colors.surface2]}
          style={styles_ExtraLoginMethodsContainer.line}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
        <Text>HOẶC</Text>
        <LinearGradient
          colors={[colors.surface2, colors.surface]}
          style={styles_ExtraLoginMethodsContainer.line}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
      </View>
      <View style={styles_ExtraLoginMethodsContainer.buttonsContainer}>
        <LoginButton assetPath={sms} title="Đăng nhập bằng SMS" />
        <LoginButton assetPath={google} title="Đăng nhập bằng Google" />
        <LoginButton assetPath={appleid} title="Đăng nhập bằng AppleID" />
        <LoginButton assetPath={facebook} title="Đăng nhập bằng Facebook" />
      </View>
    </View>
  );
};

const styles_ExtraLoginMethodsContainer = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    width: 130,
    height: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
  },
});

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  function toggleLoading() {
    setIsLoading(preValue => !preValue);
  }

  // const {products, fetchProducts} = useStoreContext();

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  const {nameUser, OnChangeNameUser} = useState(
    'Enter email/phone number/name user',
  );

  const funtions = {
    toggleLoading: toggleLoading,
  };

  return (
    <SafeAreaProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          {showMessage && (
            <MessageFullSreen
              onPressMessage={() => {
                setShowMessage(false);
              }}
            />
          )}
          <Text style={styles.title}>ĐĂNG NHẬP</Text>
          <View>
            <View style={styles.logo_container}>
              <Image source={app_logo} style={styles.app_logo} />
            </View>
            <InputInfoLoginFieldContainer
              navigation={navigation}
              funtions={funtions}
            />
            <ExtraLoginMethodsContainer navigation={navigation} />
          </View>
        </View>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.surface,
  },
  title: {
    ...fontSettings.h3.bold,
    color: colors.text4,
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
    marginTop: 60,
    marginBottom: 60,
  },
  app_logo: {
    width: 85,
    height: 85,
  },
});

export default LoginScreen;
