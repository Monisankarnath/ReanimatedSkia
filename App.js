import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedCard from './src/AnimatedCard';
import BottomSheet from './src/BottomSheet';
import SkiaImage from './src/components/SkiaImage';
import SkiaExample from './src/SkiaExample';
import SkiaNeuro from './src/SkiaNeuro';
import SkiaPath from './src/SkiaPath';
import LiquidSwipe from './src/LiquidSwipe';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <NativeBaseProvider>
        <LiquidSwipe />
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
  },
});

export default App;
