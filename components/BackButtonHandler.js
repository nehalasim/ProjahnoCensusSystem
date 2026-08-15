import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const BackButtonHandler = () => {
  useEffect(() => {
    const backAction = () => {
      return true; // Disable the back button
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return null; // This component doesn't render anything
};

export default BackButtonHandler;