/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../constants/colors';
import {Circle, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import fontSettings from '../../assets/fonts/fontSettings';
import {ReText} from 'react-native-redash';
import {Animated as reactAnimated} from 'react-native';
import {SCREEN_NAME} from '../../navigation/AppNavigator';

const {width, height} = Dimensions.get('screen');
const statusBarHeight = StatusBar.currentHeight;
const WIDTH = width;
const HEIGHT = height - statusBarHeight * 1.5;

// console.log(
//   `Width screen: ${width}, Height screen: ${height} - statusBarHeight: ${statusBarHeight}`,
// );

const CIRCLE_LENGTH = 600;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const ReAnimatedCircle = reactAnimated.createAnimatedComponent(Circle);

const AnimatedReText = ({text, delaytime = 3000}) => {
  const opacity = useSharedValue(1);

  // Animated style for ReText
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    // Trigger the opacity animation from 1 to 0
    setTimeout(() => {
      opacity.value = withTiming(0, {duration: 500});
    }, delaytime + 500);
  }, [opacity]);

  return (
    <Animated.View style={animatedStyle}>
      <ReText style={styles.progressText} text={text} />
    </Animated.View>
  );
};

const SplashScreen = ({disableProgressText = false, navigation}) => {
  const progress = useSharedValue(0);
  const scale = useRef(new reactAnimated.Value(1)).current;

  useEffect(() => {
    progress.value = withTiming(1, {duration: 3000});

    setTimeout(() => {
      reactAnimated
        .sequence([
          reactAnimated.timing(scale, {
            toValue: 0.6,
            duration: 500, // time to animation 2
            useNativeDriver: true,
          }),
          reactAnimated.timing(scale, {
            toValue: 10,
            duration: 1000, // time to animation 3
            useNativeDriver: true,
          }),
        ])
        .start();
    }, 3200);

    setTimeout(() => {
      navigation.navigate(SCREEN_NAME.Login);
    }, 4500);
  }, [progress]);

  // useEffect(() => {
  //   progress.value = withTiming(currentTotalProgress / totalProgress, {
  //     duration: 1000,
  //   });

  //   if (currentTotalProgress / totalProgress === 1) {
  //     setTimeout(() => {
  //       reactAnimated
  //         .sequence([
  //           reactAnimated.timing(scale, {
  //             toValue: 0.6,
  //             duration: 500, // time to animation 2
  //             useNativeDriver: true,
  //           }),
  //           reactAnimated.timing(scale, {
  //             toValue: 10,
  //             duration: 1000, // time to animation 3
  //             useNativeDriver: true,
  //           }),
  //         ])
  //         .start();
  //     }, 1200);
  //   }
  // }, [totalProgress, currentTotalProgress]);

  const circleAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  return (
    <View style={styles.container}>
      <Svg style={styles.circleContainer}>
        <Circle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={R}
          stroke={colors.darkOrange}
          strokeWidth={15}
          fill={'none'}
        />
        {/* <Circle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={(R * 85) / 100}
          fill={colors.white}
        /> */}
        <ReAnimatedCircle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={scale.interpolate({
            inputRange: [1, 10],
            outputRange: [(R * 85) / 100, ((R * 85) / 100) * 10],
          })}
          fill={colors.white}
          scaleX={scale}
          scaleY={scale}
        />
        <AnimatedCircle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={R}
          stroke={colors.white}
          strokeWidth={15}
          fill={'none'}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={circleAnimatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      {!disableProgressText && (
        <AnimatedReText text={progressText} delaytime={3000} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  circleContainer: {
    position: 'absolute',
  },
  progressText: {
    width: 200,
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
    textAlign: 'center',
  },
});

export default SplashScreen;
