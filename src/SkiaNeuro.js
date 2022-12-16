import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Canvas, Fill} from '@shopify/react-native-skia';
import Button from './components/Button';

const {width} = Dimensions.get('window');
const PADDING = 32;
const size = width - PADDING * 2;
const x = PADDING;
const y = 75;

const SkiaNeuro = () => {
  return (
    <Canvas style={styles.container}>
      <Button x={x} y={y} size={size} />
    </Canvas>
  );
};

export default SkiaNeuro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
