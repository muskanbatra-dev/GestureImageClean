import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Main from './Main';

const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View
      style={{
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        marginTop: 50,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
        {text1}
      </Text>
      {text2 && <Text style={{ color: '#fff', marginTop: 4 }}>{text2}</Text>}
    </View>
  ),
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Main />
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
