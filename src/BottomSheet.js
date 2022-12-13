import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import {Box, Text} from 'native-base';
import List from './components/List';

const screenHeight = Dimensions.get('window').height;
const sheetMaxHeight = screenHeight - 100;
const sheetMinHeight = 100;

const MAX_Y = sheetMinHeight - sheetMaxHeight;
const MID_Y = MAX_Y / 2;
const MIN_Y = 0;
const THRESHOLD = 60;

const AnimatedBox = Animated.createAnimatedComponent(Box);
const BottomSheet = () => {
  const offsetY = useSharedValue(0);
  const savedOffset = useSharedValue(0);
  const dragGesture = Gesture.Pan()
    .onUpdate(e => {
      offsetY.value = e.translationY + savedOffset.value;
    })
    .onEnd(e => {
      if (e.translationY < 0) {
        //dragging up
        if (savedOffset.value === MIN_Y) {
          if (e.translationY <= MID_Y) {
            offsetY.value = MAX_Y;
          } else {
            offsetY.value = e.translationY >= -THRESHOLD ? MIN_Y : MID_Y;
          }
        } else if (savedOffset.value === MID_Y) {
          offsetY.value = e.translationY >= -THRESHOLD ? MID_Y : MAX_Y;
        }
      } else {
        //dragging down
        if (savedOffset.value === MAX_Y) {
          if (e.translationY >= -MID_Y) {
            offsetY.value = MIN_Y;
          } else {
            offsetY.value = e.translationY < THRESHOLD ? MAX_Y : MID_Y;
          }
        } else if (savedOffset.value === MID_Y) {
          offsetY.value = e.translationY < THRESHOLD ? MID_Y : MIN_Y;
        }
      }
      savedOffset.value = offsetY.value;
    });

  const animatedStyles = useAnimatedStyle(() => {
    const animatedHeight = interpolate(
      offsetY.value,
      [MAX_Y, MIN_Y],
      [sheetMaxHeight, sheetMinHeight],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      height: withSpring(animatedHeight, {
        damping: 16,
        stiffness: 100,
        mass: 0.3,
      }),
    };
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <AnimatedBox style={[styles.sheetContainer, animatedStyles]}>
        <GestureDetector gesture={dragGesture}>
          <Box style={styles.dragbarContainer}>
            <Box style={styles.dragBar} />
          </Box>
        </GestureDetector>
        <List />
      </AnimatedBox>
    </GestureHandlerRootView>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#E1BEE7',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 200,
  },
  dragbarContainer: {
    width: '100%',
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,
    backgroundColor: '#E1BEE7',
  },
  dragBar: {
    width: 80,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
});
