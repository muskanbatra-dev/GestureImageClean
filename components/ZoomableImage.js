import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ZoomableImage = ({ imageUri, scale, translateX, translateY }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={styles.container}>
      <Animated.Image
        source={{ uri: imageUri }}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};
export default React.memo(ZoomableImage);
const styles = StyleSheet.create({
  container: { width, height },
  image: { width: '100%', height: '100%' },
});
