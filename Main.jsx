import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { cancelAnimation } from 'react-native-reanimated';
import ImagePickerButton from './components/ImagePickerButton';
import ResetButton from './components/ResetButton';
import ImageCanvas from './components/ImageCanvas';

const { width, height } = Dimensions.get('window');

export default function Main() {
  const [imageUri, setImageUri] = useState(null);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const isResetting = useSharedValue(false);

  const reset = () => {
    isResetting.value = true;

    cancelAnimation(scale);
    cancelAnimation(translateX);
    cancelAnimation(translateY);

    scale.value = withTiming(1, {}, () => {
      isResetting.value = false;
    });

    translateX.value = withTiming(0);
    translateY.value = withTiming(0);

    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <ImagePickerButton onPick={setImageUri} onReset={reset} />
        <ResetButton onReset={reset} />
      </View>

      {imageUri && (
        <ImageCanvas
          imageUri={imageUri}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          savedScale={savedScale}
          savedTranslateX={savedTranslateX}
          savedTranslateY={savedTranslateY}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  buttons: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
