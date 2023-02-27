import React, {useRef, useState} from 'react';
import Animated, {useAnimatedProps, withTiming} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedVolume = ({d, index, volBarW}) => {
  const ref = useRef();
  const animatedVolProps = useAnimatedProps(() => {
    let value = 0;
    if (index === 0 && volBarW.value > 0) value = 1;
    else if (index === 1 && volBarW.value > 30) value = 1;
    else if (index === 2 && volBarW.value > 70) value = 1;
    return {
      opacity: withTiming(value, {
        duration: 500,
      }),
    };
  });
  const color = 'white';
  return (
    <AnimatedPath
      d={d}
      path
      fill={color}
      ref={ref}
      animatedProps={animatedVolProps}
    />
  );
};

export default AnimatedVolume;
