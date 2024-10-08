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

const LoadingScreen = ({}) => {
  const progress = useSharedValue(0);
  const progress2 = useSharedValue(0);
  const [currentProgress, setCurrentProgress] = useState(false);

  const duration = 2000;
  useEffect(() => {
    if (!currentProgress) {
      progress.value = withTiming(1, {
        duration: duration,
      });
      setTimeout(() => {
        setCurrentProgress(true);
        progress2.value = 0;
      }, duration + 100);
    } else {
      progress2.value = withTiming(1, {
        duration: duration,
      });
      setTimeout(() => {
        setCurrentProgress(false);
        progress.value = 0;
      }, duration + 100);
    }
  }, [currentProgress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress2.value),
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
        <Circle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={(R * 85) / 100}
          fill={colors.white}
        />
        {/* <ReAnimatedCircle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={scale.interpolate({
            inputRange: [1, 10],
            outputRange: [(R * 85) / 100, ((R * 85) / 100) * 10],
          })}
          fill={colors.white}
          scaleX={scale}
          scaleY={scale}
        /> */}
        <AnimatedCircle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={R}
          stroke={colors.white}
          strokeWidth={15}
          fill={'none'}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
        {currentProgress && (
          <AnimatedCircle
            cx={WIDTH / 2}
            cy={HEIGHT / 2}
            r={R}
            stroke={colors.darkOrange}
            strokeWidth={15}
            fill={'none'}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps2}
            strokeLinecap={'round'}
          />
        )}
      </Svg>
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

export default LoadingScreen;
