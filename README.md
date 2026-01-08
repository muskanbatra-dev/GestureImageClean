# GestureImageClean

A React Native application that provides advanced gesture-based image manipulation capabilities. Users can select images from their device gallery and interact with them using intuitive pinch-to-zoom and pan gestures with dynamic focal point scaling.

## Features

### 1. Image Selection
Implement a simple button to launch the device's photo gallery, allowing the user to select and display a single image.

### 2. Pinch-to-Zoom
Implement the PinchGestureHandler to allow the user to zoom the displayed image in and out. The distance between the two fingers must control the image scale.

### 3. Pan/Drag
Implement the PanGestureHandler. Once the image is zoomed (scale > 1), the user must be able to drag it to pan across the content.

### 4. Simultaneous Gestures
The application must handle both Pan and Pinch gestures simultaneously without conflict. Use Gesture.Race() or an appropriate technique to define the gesture relationship.

### 5. Dynamic Zoom Origin (Focal Point Scaling)
This is the core challenge. The image must zoom from the point where the user is pinching (the focal point). If the user pinches the top-left corner, that point should remain stationary under their fingers as the image scales. The zoom should not simply scale from the image's centre.

### 6. Gesture Persistence
The final scale and translation state must persist after the user lifts their fingers (e.g., when the gesture ends).

### 7. Reset Function
Include a way (e.g., a button or a double-tap gesture) to reset the image to its original state (scale = 1, translations = 0).

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio and Android SDK

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd GestureImageClean
```

2. Install dependencies:
```sh
npm install
# OR
yarn install
```

3. For iOS, install CocoaPods dependencies:

First time setup:
```sh
bundle install
```

Then install pods:
```sh
cd ios
bundle exec pod install
cd ..
```

## Running the App

### Step 1: Start Metro

Start the Metro bundler:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and Run

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see the app running in your emulator/simulator or connected device.

## Usage

1. **Select an Image**: Tap the image picker button to open your device's photo gallery and select an image.

2. **Zoom**: Use a pinch gesture (two fingers) to zoom in and out. The zoom will occur from the point where you're pinching (focal point).

3. **Pan**: Once zoomed in (scale > 1), drag the image with one finger to pan around and explore different areas.

4. **Reset**: Tap the reset button to return the image to its original state (scale = 1, centered).

5. **Remove Image**: Tap the "Remove" button to clear the current image and return to the placeholder.

## Technical Details

### Key Dependencies

- **react-native-gesture-handler**: Handles gesture recognition and processing
- **react-native-reanimated**: Provides smooth animations and gesture-driven interactions
- **react-native-image-picker**: Enables image selection from device gallery
- **react-native-worklets**: Supports worklet-based animations

### Architecture

The app is structured with:

- `App.tsx`: Root component with gesture handler setup
- `Main.jsx`: Main application logic and state management
- `components/ImageCanvas.js`: Core image display component with gesture handling
- `components/ImagePickerButton.js`: Button component for image selection
- `components/ResetButton.js`: Reset functionality component
- `hooks/usePanGesture.js`: Custom hook for pan gesture logic
- `hooks/usePinchGesture.js`: Custom hook for pinch gesture logic

### Gesture Implementation

The app uses React Native Gesture Handler's `Gesture` API to:
- Combine pinch and pan gestures using `Gesture.Simultaneous()` or `Gesture.Race()`
- Calculate focal point transformations for accurate zoom behavior
- Persist gesture state using shared values from Reanimated
- Animate state transitions smoothly

## Development

### Running Tests

```sh
npm test
# OR
yarn test
```

### Linting

```sh
npm run lint
# OR
yarn lint
```

## Troubleshooting

If you're having issues:

1. **Metro bundler issues**: Clear cache with `npm start -- --reset-cache`
2. **iOS build issues**: Clean build folder in Xcode and reinstall pods
3. **Android build issues**: Clean gradle cache with `cd android && ./gradlew clean`
4. **Gesture not working**: Ensure `GestureHandlerRootView` wraps your app (already done in `App.tsx`)

For more troubleshooting help, see the [React Native Troubleshooting guide](https://reactnative.dev/docs/troubleshooting).

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Image Picker](https://github.com/react-native-image-picker/react-native-image-picker)

## License

This project is private and proprietary.
