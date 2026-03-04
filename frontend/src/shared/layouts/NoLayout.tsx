import { SafeAreaView, View } from "react-native";
import { colors } from "../theme/colors";

export default function NoLayout({ children }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1}}>
        {children}
      </View>
    </SafeAreaView>
  );
}