import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  FitBox,
  Group,
  rect,
  RoundedRect,
  rrect,
  Shadow,
} from '@shopify/react-native-skia';

const src = rect(0, 0, 24, 24);
const border = rrect(src, 5, 5);
const container = rrect(rect(1, 1, 22, 22), 5, 5);
const Theme = {
  white1: '#F0F0F3',
  white2: '#EEEEEE',
};
const Button = ({x, y, size}) => {
  return (
    <FitBox src={src} dst={rect(x, y, size, size)}>
      <RoundedRect rect={border} color={Theme.white2}>
        <Shadow dx={-1} dy={-1} blur={3} color="white" />
        <Shadow dx={1} dy={1} blur={3} color="rgba(174, 174, 192, 0.4)" />
      </RoundedRect>
      <RoundedRect rect={container} color={Theme.white1}>
        <Shadow
          dx={-1}
          dy={-1}
          blur={1}
          color="rgba(255, 255,255, 0.7)"
          inner
        />
        <Shadow
          dx={1.5}
          dy={1.5}
          blur={3}
          color="rgba(174, 174, 192, 0.2)"
          inner
        />
      </RoundedRect>
    </FitBox>
  );
};

export default Button;

const styles = StyleSheet.create({});
