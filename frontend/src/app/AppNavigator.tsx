import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../features/splash-screen";
import NoLayoutStack from "./NoLayoutStack";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="NoLayout" component={NoLayoutStack} />
      <Stack.Screen name="Main" component={MainStack} />
    </Stack.Navigator>
  );
}