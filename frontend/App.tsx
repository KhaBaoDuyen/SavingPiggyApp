import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/app/AppNavigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
}