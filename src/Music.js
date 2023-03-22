import React from 'react';
import {Box} from 'native-base';
import Volume from './components/Volume';
import {useSharedValue} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const springConfig = {
  damping: 5,
  mass: 0.1,
  stiffness: 50,
};
const Music = () => {
  const volBarW = useSharedValue(0);
  const startVolBarW = useSharedValue(0);
  const volBarPressed = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      volBarPressed.value = true;
    })
    .onUpdate(e => {
      volBarW.value = e.translationX + startVolBarW.value;
    })
    .onEnd(() => {
      if (volBarW.value < 0) {
        volBarW.value = 0;
      } else if (volBarW.value >= 140) {
        volBarW.value = 140;
      }
      startVolBarW.value = volBarW.value;
    })
    .onFinalize(() => {
      volBarPressed.value = false;
    });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Box flex={1} bg="#1D2130" justifyContent="center">
        <Box
          bg="#1C1C1C"
          alignItems="center"
          justifyContent="center"
          height={40}>
          <GestureDetector gesture={gesture}>
            <Volume
              h={50}
              w={40}
              volBarW={volBarW}
              volBarPressed={volBarPressed}
              springConfig={springConfig}
              color={'white'}
            />
          </GestureDetector>
        </Box>
      </Box>
    </GestureHandlerRootView>
  );
};

export default Music;
