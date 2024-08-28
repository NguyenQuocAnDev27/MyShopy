import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../constants/colors';

const {width, height} = Dimensions.get('screen');
const statusBarHeight = StatusBar.currentHeight;
const WIDTH = width;
const HEIGHT = height - statusBarHeight * 1.5;

const MessageFullSreen = ({
  title = 'Title Alert',
  message = 'Content Alert',
  disableTitle = false,
  onPressMessage = () => {},
}) => {
  if (disableTitle) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text>{message}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('Close Message');
          onPressMessage();
        }}>
        <View style={styles.container}>
          <View style={styles.messageContainer}>
            <View>
              <Text>{title}</Text>
            </View>
            <Text>{message}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: colors.transparentBlack,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    width: (WIDTH * 70) / 100,
    padding: 10,
    backgroundColor: colors.white,
  },
});

export default MessageFullSreen;
