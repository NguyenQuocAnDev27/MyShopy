import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import colors from '../../constants/colors';
import fontSettings from '../../assets/fonts/fontSettings';
import {error, info, warning} from '../../assets/icons';

const {width, height} = Dimensions.get('screen');
const statusBarHeight = StatusBar.currentHeight;
const WIDTH = width;
const HEIGHT = height - statusBarHeight * 1.5;

const TYPE_DIALOG = {
  NORMAL: 1,
  ERROR: 2,
  WARNING: 3,
};

// eslint-disable-next-line no-unused-vars
const LONG_TEXT =
  "In today's fast-paced world, technology plays a crucial role in shaping how we live, work, and connect. From smartphones to smart homes, our reliance on digital devices continues to grow, bringing both convenience and challenges.";

const MessageFullSreen = ({
  title = 'Title Alert',
  message = 'Content here',
  disableTitle = false,
  onPressMessage = () => {},
  type = TYPE_DIALOG.NORMAL,
}) => {
  const noteString = '--- Chạm màn hình để đóng ---';
  if (disableTitle) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('Close Message');
          onPressMessage();
        }}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.messageContainer,
              ...styles.onlyContentContainer,
            }}>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor:
                  type === TYPE_DIALOG.NORMAL
                    ? colors.info
                    : type === TYPE_DIALOG.WARNING
                    ? colors.warning
                    : colors.error,
              }}>
              <Image
                style={styles.iconDialog}
                source={
                  type === TYPE_DIALOG.NORMAL
                    ? info
                    : type === TYPE_DIALOG.WARNING
                    ? warning
                    : error
                }
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>{message}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
            <View
              style={{
                ...styles.titleContainer,
                backgroundColor:
                  type === TYPE_DIALOG.NORMAL
                    ? colors.info
                    : type === TYPE_DIALOG.WARNING
                    ? colors.warning
                    : colors.error,
              }}>
              <Image
                style={styles.iconDialog}
                source={
                  type === TYPE_DIALOG.NORMAL
                    ? info
                    : type === TYPE_DIALOG.WARNING
                    ? warning
                    : error
                }
              />
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>{message}</Text>
              <Text style={styles.noteText}>{noteString}</Text>
            </View>
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
    width: (WIDTH * 80) / 100,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  onlyContentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleContainer: {
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...fontSettings.h4.bold,
    color: colors.white,
  },
  contentContainer: {
    padding: 10,
    width: '85%',
  },
  contentText: {
    ...fontSettings.h5.bold,
    color: colors.text3,
  },
  noteText: {
    width: '100%',
    textAlign: 'center',
    marginTop: 14,
  },
  iconDialog: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  iconContainer: {
    width: 50,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default MessageFullSreen;
