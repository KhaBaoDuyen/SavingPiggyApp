import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/app/AppNavigator";
import Toast from "react-native-toast-message";
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
}