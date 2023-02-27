import React from 'react';
import {Box, HStack} from 'native-base';
import Volume from './components/Volume';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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
  const volBarPressed = useSharedValue(false);
  const volBarOuterW = useSharedValue(160);
  const animatedBar = useAnimatedProps(() => ({
    width: `${interpolate(volBarW.value, [0, volBarOuterW.value], [0, 100], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })}%`,
  }));
  const animatedOuterBar = useAnimatedStyle(() => {
    const springConfig = {
      damping: 5,
      mass: 0.1,
      stiffness: 50,
    };
    return {
      width: volBarPressed.value
        ? withSpring(220, springConfig)
        : withSpring(160, springConfig),
      height: volBarPressed.value
        ? withSpring(40, springConfig)
        : withSpring(8, springConfig),
    };
  });
  const gesture = Gesture.Pan()
    .onBegin(e => {
      volBarPressed.value = true;
    })
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
    })
    .onFinalize(() => {
      volBarPressed.value = false;
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
            <AnimatedHStack
              space={2}
              position="relative"
              alignItems="center"
              w="220px"
              h="50px">
              <Box position="absolute" left={4} zIndex={999}>
                <Volume h={50} w={40} volBarW={volBarW} color={'white'} />
              </Box>
              <AnimatedBox
                bg="#343434"
                style={animatedOuterBar}
                position="absolute"
                right={0}
                borderRadius={8}>
                <AnimatedBox
                  bg="white"
                  animatedProps={animatedBar}
                  height="100%"
                  borderRadius={8}
                />
              </AnimatedBox>
            </AnimatedHStack>
          </GestureDetector>
        </Box>
      </Box>
    </GestureHandlerRootView>
  );
};

export default Music;
