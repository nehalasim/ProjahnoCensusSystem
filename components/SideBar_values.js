import { Navigation } from "react-native-navigation";

export const passValueToSidebar = (userID, screenPosition, componentID) => {
    Navigation.updateProps('SidebarComponentId', {
      userID: userID,
      screenPosition:screenPosition,
      componentID:componentID
    });
  };