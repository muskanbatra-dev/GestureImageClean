import React, { useState } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

export default function Main() {
  const [imageUri, setImageUri] = useState(null);


  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);


  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;

      translateX.value =
        savedTranslateX.value + (e.focalX - width / 2) * (1 - e.scale);

      translateY.value =
        savedTranslateY.value + (e.focalY - height / 2) * (1 - e.scale);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

 
  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate(e => {
      if (scale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    });


  const gesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const reset = () => {
    scale.value = withTiming(1);
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);

    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };


  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (!result.didCancel && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
      reset();
    }
  };

  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button title="Pick Image" onPress={pickImage} />
        <Button title="Reset" onPress={reset} />
      </View>

      {imageUri && (
        <GestureDetector gesture={gesture}>
          <Animated.View style={styles.imageContainer}>
            <Animated.Image
              source={{ uri: imageUri }}
              style={[styles.image, animatedStyle]}
              resizeMode="contain"
            />
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttons: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width,
    height,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
