import { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export const usePinchGesture = ({
  scale,
  translateX,
  translateY,
  savedScale,
  savedTranslateX,
  savedTranslateY,
}) => {
  const hasShownToast = useSharedValue(false);

  
  const showZoomToast = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: 'Zoomed beyond 2× 🔍',
      text2: 'You can pan the image now',
      visibilityTime: 1500,
    });
  }, []);

  return Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
      hasShownToast.value = false;
    })
    .onUpdate(e => {
      const nextScale = savedScale.value * e.scale;
      const scaleChange = nextScale / savedScale.value;

      scale.value = nextScale;

      translateX.value =
        savedTranslateX.value + (e.focalX - width / 2) * (1 - scaleChange);

      translateY.value =
        savedTranslateY.value + (e.focalY - height / 2) * (1 - scaleChange);

      if (nextScale > 2 && !hasShownToast.value) {
        hasShownToast.value = true;
        runOnJS(showZoomToast)(); 
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });
};
