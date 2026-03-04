import { SafeAreaView, View, Platform } from "react-native";
import BottomTabNavigator from "../components/BottomTabNavigator";
import { colors } from "../theme/colors";

export default function MainLayout({ children }: any) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,}}>
      <View style={{ flex: 1,}}>
        {children}
      </View>
      <BottomTabNavigator />
    </SafeAreaView>
  );
}