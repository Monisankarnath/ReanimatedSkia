import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {
  Canvas,
  Circle,
  ImageSVG,
  Rect,
  RoundedRect,
  Shadow,
  useSVG,
} from '@shopify/react-native-skia';

const SkiaImage = ({w, h}) => {
  // const svg = useSVG(require('../assets/Blob.js'));
  return (
    <Canvas style={styles.container}>
      {/* {svg && <ImageSVG svg={svg} x={0} y={0} width={100} height={100} />} */}
      <Rect x={0} y={0} width={w} height={h} color="red" />
    </Canvas>
  );
};

export default SkiaImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
