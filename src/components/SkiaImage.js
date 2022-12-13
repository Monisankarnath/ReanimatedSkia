import {StyleSheet} from 'react-native';
import React from 'react';
import {Canvas, Circle} from '@shopify/react-native-skia';

const SkiaImage = () => {
  return (
    <Canvas style={{flex: 1}}>
      <Circle r={128} cx={128} cy={128} color="red" />
    </Canvas>
  );
};

export default SkiaImage;

const styles = StyleSheet.create({});
