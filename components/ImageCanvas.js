import React, { useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ZoomableImage from './ZoomableImage';
import { usePinchGesture } from '../hooks/usePinchGesture';
import { usePanGesture } from '../hooks/usePanGesture';

export default function ImageCanvas(props) {
  const pinchGesture = usePinchGesture(props);
  const panGesture = usePanGesture(props);

  
  const composedGesture = useMemo(
    () => Gesture.Simultaneous(pinchGesture, panGesture),
    [pinchGesture, panGesture],
  );

  return (
    <GestureDetector gesture={composedGesture}>
      <ZoomableImage {...props} />
    </GestureDetector>
  );
}
