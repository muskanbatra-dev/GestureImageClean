import { useCallback } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export const usePanGesture = ({
  scale,
  translateX,
  translateY,
  savedTranslateX,
  savedTranslateY,
}) => {
  const hasShownPanToast = useSharedValue(false);

 
  const showPanToast = useCallback(() => {
    Toast.show({
      type: 'info',
      text1: 'Panning image 🖐️',
      visibilityTime: 1200,
    });
  }, []);

  return Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      hasShownPanToast.value = false;
    })
    .onUpdate(e => {
      if (scale.value <= 1) return;

      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;

      if (!hasShownPanToast.value) {
        hasShownPanToast.value = true;
        runOnJS(showPanToast)(); 
      }
    });
};
