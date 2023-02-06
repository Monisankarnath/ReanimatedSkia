import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Wave, {HEIGHT, MARGIN_WIDTH, MIN_LEDGE, WIDTH} from './Wave';
import LiquidButton from './LiquidButton';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {snapPoint, useVector} from 'react-native-redash';

const PREV = WIDTH;
const NEXT = 0;

export const Side = {
  NONE: 0,
  LEFT: -1,
  RIGHT: 1,
};
const Slider = ({index, children: current, prev, next, setIndex}) => {
  const hasPrev = !!prev;
  const hasNext = !!next;
  const activeSide = useSharedValue(Side.NONE);
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);
  const left = useVector(0, HEIGHT / 2);
  const right = useVector(0, HEIGHT / 2);

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: activeSide.value === Side.LEFT ? 100 : 0,
  }));
  const onGestureEvent = Gesture.Pan()
    .onBegin(({x}) => {
      if (x < MARGIN_WIDTH && hasPrev) {
        activeSide.value = Side.LEFT;
      } else if (x > WIDTH - MARGIN_WIDTH && hasNext) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    })
    .onUpdate(({x, y}) => {
      if (activeSide.value === Side.LEFT) {
        left.x.value = x;
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        right.x.value = WIDTH - x;
        right.y.value = y;
      }
    })
    .onEnd(({x, velocityX, velocityY}) => {
      if (activeSide.value === Side.LEFT) {
        const snapPoints = [MIN_LEDGE, WIDTH];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitioningLeft.value = dest === WIDTH;
        left.y.value = withSpring(HEIGHT / 2, {velocity: velocityY});
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningLeft.value ? true : false,
            restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningLeft.value) {
              runOnJS(setIndex)(index - 1);
            }
          },
        );
      } else if (activeSide.value === Side.RIGHT) {
        const snapPoints = [WIDTH - MIN_LEDGE, 0];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitioningRight.value = dest === 0;
        right.y.value = withSpring(HEIGHT / 2, {velocity: velocityY});
        right.x.value = withSpring(
          WIDTH - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningRight.value ? true : false,
            restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningRight.value) {
              runOnJS(setIndex)(index + 1);
            }
          },
        );
      }
    });
  useEffect(() => {
    left.x.value = withSpring(MIN_LEDGE);
    right.x.value = withSpring(MIN_LEDGE);
  }, [left.x, right.x]);
  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {current}
          {prev && (
            <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
              <Wave
                side={Side.LEFT}
                position={left}
                isTransitioning={isTransitioningLeft}>
                {prev}
              </Wave>
            </Animated.View>
          )}
          {next && (
            <View style={StyleSheet.absoluteFill}>
              <Wave
                side={Side.RIGHT}
                position={right}
                isTransitioning={isTransitioningRight}>
                {next}
              </Wave>
            </View>
          )}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Slider;
