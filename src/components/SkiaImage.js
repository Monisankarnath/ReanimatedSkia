import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Canvas,
  Circle,
  ImageSVG,
  RoundedRect,
  Shadow,
  useSVG,
} from '@shopify/react-native-skia';

const SkiaImage = () => {
  const svg = useSVG(require('./Space.svg'));
  return (
    <Canvas style={styles.container}>
      {svg && <ImageSVG svg={svg} x={0} y={0} width={40} height={40} />}
    </Canvas>
  );
};

export default SkiaImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
