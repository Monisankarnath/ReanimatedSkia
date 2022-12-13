import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedCard from './src/AnimatedCard';
import BottomSheet from './src/BottomSheet';
import SkiaExample from './src/SkiaExample';
import SkiaNeuro from './src/SkiaNeuro';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <AnimatedCard />
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
