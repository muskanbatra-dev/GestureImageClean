import React, { useCallback } from 'react';
import { Button } from 'react-native';
import Toast from 'react-native-toast-message';

const ResetButton = ({ onReset }) => {
  const handleReset = useCallback(() => {
    onReset();
    Toast.show({
      type: 'info',
      text1: 'Image reset',
      text2: 'Back to original state',
    });
  }, [onReset]);

  return <Button title="Reset" onPress={handleReset} />;
};

export default React.memo(ResetButton);
