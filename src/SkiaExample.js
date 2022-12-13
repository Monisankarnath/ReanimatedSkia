import {StyleSheet, useWindowDimensions} from 'react-native';
import React, {useMemo} from 'react';
import {
  add,
  Canvas,
  Paint,
  Circle,
  Fill,
  Group,
  LinearGradient,
  mix,
  sub,
  useComputedValue,
  useLoop,
  vec,
  Blur,
  BackdropBlur,
  BackdropFilter,
  ColorMatrix,
  FractalNoise,
  DisplacementMap,
  Turbulence,
  RoundedRect,
  Shadow,
  Rect,
  Offset,
} from '@shopify/react-native-skia';
import {BLACK_AND_WHITE, SEPIA} from './constants/matrix';

const SkiaExample = () => {
  const {width, height} = useWindowDimensions();
  const c = vec(width / 2, height / 2);
  const r = c.x - 32;
  const rect = {x: 0, y: c.y, width, height: c.y};

  const progress = useLoop({duration: 2000});
  const start = useComputedValue(
    () => sub(c, vec(0, mix(progress.current, r, r / 2))),
    [progress],
  );
  const end = useComputedValue(
    () => add(c, vec(0, mix(progress.current, r, r / 2))),
    [],
  );
  const radius = useComputedValue(
    () => mix(progress.current, r, r / 2),
    [progress],
  );
  return (
    <Canvas style={styles.container}>
      <Fill color="black" />
      <Group>
        <LinearGradient
          start={start}
          end={end}
          colors={['#FFF723', '#E70696']}
        />
        {/* <Blur blur={6} /> */}
        <Circle c={c} r={radius} />

        {/* <RoundedRect
          x={32}
          y={32}
          width={192}
          height={192}
          r={32}
          color="lightblue">
          <Shadow dx={12} dy={12} blur={25} color="#93b8c4" />
          <Shadow dx={-12} dy={-12} blur={25} color="#c7f8ff" />
        </RoundedRect> */}
      </Group>
      <BackdropFilter
        clip={rect}
        filter={
          <Offset x={-5} y={0}>
            <DisplacementMap channelX="g" channelY="a" scale={20}>
              <Turbulence freqX={0.01} freqY={0.05} octaves={2} seed={2} />
            </DisplacementMap>
          </Offset>
        }
      />
      {/* <BackdropBlur blur={20} clip={rect} /> */}
    </Canvas>
  );
};

export default SkiaExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
