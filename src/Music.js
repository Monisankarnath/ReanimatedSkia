import React from 'react';
import {Box, HStack} from 'native-base';
import Volume from './components/Volume';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const Music = () => {
  const volBarW = useSharedValue(0);
  const startVolBarW = useSharedValue(0);
  const volBarH = 2;
  const volBarOuterW = useSharedValue(160);
  const animatedBar = useAnimatedProps(() => ({
    width: `${interpolate(volBarW.value, [0, volBarOuterW.value], [0, 100], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })}%`,
  }));
  const gesture = Gesture.Pan()
    .onBegin(e => {})
    .onUpdate(e => {
      volBarW.value = e.translationX + startVolBarW.value;
    })
    .onEnd(e => {
      if (volBarW.value < 0) {
        volBarW.value = 0;
      } else if (volBarW.value > 160) {
        volBarW.value = 160;
      }
      startVolBarW.value = volBarW.value;
    });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Box flex={1} bg="#1D2130" justifyContent="center">
        <Box
          bg="#1C1C1C"
          alignItems="center"
          justifyContent="center"
          height={40}>
          <GestureDetector gesture={gesture}>
            <AnimatedHStack space={2} alignItems="center">
              <Volume h={50} w={40} volBarW={volBarW} />
              <Box
                bg="#343434"
                w={`${volBarOuterW.value}px`}
                h={volBarH}
                borderRadius={8}>
                <AnimatedBox
                  bg="white"
                  animatedProps={animatedBar}
                  height={volBarH}
                  borderRadius={8}
                />
              </Box>
            </AnimatedHStack>
          </GestureDetector>
        </Box>
      </Box>
    </GestureHandlerRootView>
  );
};

export default Music;
