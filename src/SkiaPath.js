import {StyleSheet} from 'react-native';
import React from 'react';
import {Canvas, Easing, Fill, useLoop} from '@shopify/react-native-skia';

const SkiaPath = () => {
  return (
    <Canvas style={styles.container} mode="continuous" debug>
      <Fill color="black" />
    </Canvas>
  );
};

export default SkiaPath;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
