import React, { useCallback } from 'react';
import { Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

export default function ImagePickerButton({ onPick, onReset }) {
  const pickImage = useCallback(async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });

      if (result.didCancel) {
        Toast.show({ type: 'info', text1: 'Image selection cancelled' });
        return;
      }

      if (result.assets?.[0]?.uri) {
        onPick(result.assets[0].uri);
        onReset();

        Toast.show({
          type: 'success',
          text1: 'Image selected 📸',
          text2: 'Pinch to zoom & pan',
        });
      }
    } catch {
      Toast.show({ type: 'error', text1: 'Something went wrong' });
    }
  }, [onPick, onReset]);

  return <Button title="Pick Image" onPress={pickImage} />;
}
