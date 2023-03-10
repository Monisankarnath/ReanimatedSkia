import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Box, Button, CheckCircleIcon, HStack, Text} from 'native-base';
import SpaceShuttle from './assets/SpaceShuttle';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Canvas, Circle, Fill, vec} from '@shopify/react-native-skia';
import SkiaImage from './components/SkiaImage';
import SkiaExample from './SkiaExample';
import Blob from './assets/Blob';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = 0.8 * width;
const CARD_HEIGHT = 0.7 * height;

const IMAGE_HEIGHT = 0.45 * CARD_HEIGHT;
const c = vec(IMAGE_HEIGHT / 2, IMAGE_HEIGHT / 2);
const r = c.x - 32;
const AnimatedBox = Animated.createAnimatedComponent(Box);
const MAX_SWIPE = Math.ceil(CARD_WIDTH - 50);

const AnimatedCard = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const absoluteX = useSharedValue(0);
  const absoluteY = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const dragGesture = Gesture.Pan()
    .onBegin(e => {
      absoluteX.value = e.absoluteX;
      absoluteY.value = e.absoluteY;
    })
    .onUpdate(e => {
      const x = e.absoluteX - absoluteX.value;
      const y = e.absoluteY - absoluteY.value;
      if (x < MAX_SWIPE) {
        rotateX.value = x;
        imageScale.value = 1.2;
      }
      if (y < MAX_SWIPE) {
        rotateY.value = y;
        imageScale.value = 1.2;
      }
    })
    .onEnd(e => {
      rotateX.value = withSpring(0);
      rotateY.value = withSpring(0);
      imageScale.value = 1;
    });

  const animatedCard = useAnimatedStyle(() => {
    const xAxisRotation = `${interpolate(
      rotateX.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-40, 40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    const yAxisRotation = `${interpolate(
      rotateY.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [40, -40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    return {
      transform: [
        {perspective: 1500},
        {rotateX: yAxisRotation},
        {rotateY: xAxisRotation},
        {translateX: x.value},
        {translateY: y.value},
      ],
    };
  });
  const animatedImage = useAnimatedStyle(() => {
    const xAxisRotation = `${interpolate(
      rotateX.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-40, 40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    const yAxisRotation = `${interpolate(
      rotateY.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [40, -40],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    )}deg`;
    const translationX = interpolate(
      rotateX.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-80, 80],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    const translationY = interpolate(
      rotateY.value,
      [-MAX_SWIPE, MAX_SWIPE],
      [-80, 80],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [
        {perspective: 1500},
        {rotateX: yAxisRotation},
        {rotateY: xAxisRotation},
        {scale: withTiming(imageScale.value)},
        {translateX: translationX},
        {translateY: translationY},
      ],
    };
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <Box flex={1} justifyContent="center" alignItems="center" bg="white">
        <GestureDetector gesture={dragGesture}>
          <AnimatedBox
            borderRadius={30}
            h={CARD_HEIGHT}
            w={CARD_WIDTH}
            bg="#F6F3F0"
            shadow={4}
            style={animatedCard}>
            <AnimatedBox h={IMAGE_HEIGHT} style={animatedImage}>
              {/* <SkiaImage w={CARD_WIDTH} h={IMAGE_HEIGHT} /> */}
              <Blob h={IMAGE_HEIGHT} w={CARD_WIDTH} />
            </AnimatedBox>
            <Box h="40%" px={8}>
              <Text textAlign="center" fontSize="3xl" fontWeight="bold">
                Animated Card
              </Text>
              <Text textAlign="justify" pt={2}>
                This card animation is created using Reanimated 2.0, React
                Native Gesture Handler and Native Base.
              </Text>
            </Box>
            <HStack h="15%" borderBottomRadius={30} px={8} pb={6}>
              <Box w="50%">
                <HStack alignItems="center" space={1}>
                  <Text fontWeight="bold">Total Price</Text>
                  <CheckCircleIcon color="#2894E1" />
                </HStack>
                <Text fontWeight="bold">$ 8.00</Text>
              </Box>
              <Box w="50%">
                <Button
                  shadow={9}
                  borderRadius={10}
                  bg="black"
                  _text={{color: 'white'}}>
                  Add to cart
                </Button>
              </Box>
            </HStack>
          </AnimatedBox>
        </GestureDetector>
      </Box>
    </GestureHandlerRootView>
  );
};

export default AnimatedCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
