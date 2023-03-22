import React from 'react';
import Animated, {withTiming, useAnimatedProps} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedVolume = ({d, index, volumePercentage, color}) => {
  const animatedVolProps = useAnimatedProps(() => {
    let value = 0;
    if (index === 0 && volumePercentage.value > 0) value = 1;
    else if (index === 1 && volumePercentage.value > 30) value = 1;
    else if (index === 2 && volumePercentage.value > 70) value = 1;
    return {
      opacity: withTiming(value, {
        duration: 500,
      }),
    };
  });
  return (
    <AnimatedPath d={d} path fill={color} animatedProps={animatedVolProps} />
  );
};

export default AnimatedVolume;
