import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';

import ImagePickerButton from './components/ImagePickerButton';
import ResetButton from './components/ResetButton';
import ImageCanvas from './components/ImageCanvas';
import UploadImage from './assests/upload_image.png';

export default function Main() {
  const [imageUri, setImageUri] = useState(null);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const isResetting = useSharedValue(false);

  const reset = useCallback(() => {
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
  }, []);

  const handlePickImage = useCallback(uri => {
    setImageUri(uri);
  }, []);

  const removeImage = useCallback(() => {
    reset();
    setImageUri(null);
  }, [reset]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <ImagePickerButton onPick={handlePickImage} onReset={reset} />
        <ResetButton onReset={reset} />
        {imageUri && (
          <Button title="Remove" color="#ff4444" onPress={removeImage} />
        )}
      </View>

      {!imageUri && <Image source={UploadImage} style={styles.placeholder} />}

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
    alignItems: 'center',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
