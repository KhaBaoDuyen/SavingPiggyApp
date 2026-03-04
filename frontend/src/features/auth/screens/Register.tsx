import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { styles } from "../style";
import { useState } from "react";
import { colors } from "../../../shared/theme/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { validateRegister } from "../validators/register.validator";
import { useNavigation, useRoute } from "@react-navigation/native";
import { completeRegister } from "../../../services/auth.api";
import Toast from "react-native-toast-message";
import LoadingSpinner from "../../../shared/components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const logo = require("../../../../assets/images/logo-light.png");
  const navigation = useNavigation<any>();

  const route = useRoute<any>();
  const { email } = route.params;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
  }>({});


  const handleRegister = async () => {
    const validationErrors = validateRegister(
      email,
      password,
      confirmPassword,
      name
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);

        const res = await completeRegister(email, password, name);

        Toast.show({
          type: "success",
          text1: res.data.message,
        });

        // 🔥 Lưu token
        const token = res.data.data.token;
        await AsyncStorage.setItem("token", token);

        navigation.replace("SetupJourney");

      } catch (error: any) {
        Toast.show({
          type: "error",
          text1:
            error?.response?.data?.message ||
            error?.message ||
            "Có lỗi xảy ra",
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
              <Text style={styles.title}>Tạo tài khoản</Text>

              <TextInput
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={email}
                editable={false}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                placeholder="Tên đăng nhập"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
              />
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <TextInput
                placeholder="Mật khẩu"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TextInput
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
              {errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              <Pressable
                style={styles.checkboxContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <View
                  style={[
                    styles.checkbox,
                    showPassword && { backgroundColor: colors.primaryDark },
                  ]}
                />
                <Text style={styles.checkboxText}>
                  Hiển thị mật khẩu
                </Text>
              </Pressable>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primaryDark }]}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Đăng ký</Text>
              </TouchableOpacity>

              <Text style={styles.divider}>
                - Hoặc đăng ký với -
              </Text>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.googleButton}>
                  <AntDesign name="google" size={20} color="#DB4437" />
                  <Text style={styles.googleText}>
                    Đăng ký bằng Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.signupText}>
                Bạn đã có tài khoản?{" "}
                <Text style={styles.signupLink}
                  onPress={() => navigation.navigate("Nolayout", {
                    screen: "Login"
                  })}>
                  Đăng nhập
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}