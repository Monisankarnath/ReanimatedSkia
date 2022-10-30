import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet from './src/BottomSheet';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <BottomSheet />
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
