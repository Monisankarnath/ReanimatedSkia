import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Wave, {HEIGHT, MARGIN_WIDTH, WIDTH} from './Wave';
import LiquidButton from './LiquidButton';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
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
  const left = useVector();
  const right = useVector();

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: activeSide.value === Side.LEFT ? 100 : 0,
  }));
  const onGestureEvent = Gesture.Pan()
    .onBegin(({x}) => {
      if (x < MARGIN_WIDTH) {
        activeSide.value = Side.LEFT;
      } else if (x > WIDTH - MARGIN_WIDTH) {
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
        const snapPoints = [MARGIN_WIDTH, WIDTH];
        const dest = snapPoint(x, velocityX, snapPoints);
        left.x.value = withSpring(dest, {velocity: velocityX});
      } else if (activeSide.value === Side.RIGHT) {
        const snapPoints = [WIDTH - MARGIN_WIDTH, 0];
        const dest = snapPoint(x, velocityX, snapPoints);
        left.x.value = withSpring(dest, {velocity: velocityX});
        right.x.value = withSpring(WIDTH - dest, {velocity: velocityX});
      }
    });
  useEffect(() => {
    left.x.value = withSpring(MARGIN_WIDTH);
    right.x.value = withSpring(MARGIN_WIDTH);
  }, [left.x, right.x]);
  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {current}
          {prev && (
            <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
              <Wave side={Side.LEFT} position={left}>
                {prev}
              </Wave>
            </Animated.View>
          )}
          {next && (
            <View style={StyleSheet.absoluteFill}>
              <Wave side={Side.RIGHT} position={right}>
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
