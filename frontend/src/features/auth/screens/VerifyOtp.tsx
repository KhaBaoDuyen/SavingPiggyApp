import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { styles } from "../style";
import { useState } from "react";
import { colors } from "../../../shared/theme/colors";
import { validateOtp } from "../validators/otp.validator";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from "../../../shared/components/Loading";
import { verifyOtp } from "../../../services/auth.api";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";

export default function VerifyOtp() {
  const logo = require("../../../../assets/images/logo-light.png");
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<{ otp?: string }>({});
  const [loading, setLoading] = useState(false);
  const { email } = route.params;

  const handleVerifyOtp = async () => {
    const validationErrors = validateOtp(otp);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);

        const res = await verifyOtp(email, otp);

        Toast.show({
          type: "success",
          text1: res.data.message,
        })
        navigation.replace("Register", {email});
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: error?.response?.data?.message || "Đã xảy ra lỗi !!!",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <LoadingSpinner visible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            </View>

            <View style={styles.formContent}>
              <Text style={styles.title}>Nhập mã OTP</Text>

              <TextInput
                placeholder="Nhập mã 6 số"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
              {errors.otp && (
                <Text style={styles.error}>{errors.otp}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primaryDark }]}
                onPress={handleVerifyOtp}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>

              <Text style={styles.divider}>- Hoặc đăng nhập với -</Text>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.googleButton}>
                  <AntDesign name="google" size={20} color="#DB4437" />
                  <Text style={styles.googleText}>
                    Đăng nhập bằng Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}