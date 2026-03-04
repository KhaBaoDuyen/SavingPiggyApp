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
    SafeAreaView
} from "react-native";
import { styles } from "../style";
import { useState } from "react";
import { colors } from "../../../shared/theme/colors";
import { validateLogin } from "../validators/login.validator";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getMyGoals } from "../../../services/goal.api";
import { login } from "../../../services/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const logo = require("../../../../assets/images/logo-light.png");
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleLogin = async () => {
        try {
            const res = await login(email, password);

            const { token } = res.data.data;

            await AsyncStorage.setItem("token", token);

             const goalRes = await getMyGoals();

            if (!goalRes.data || goalRes.data.data.length === 0) {
                navigation.replace("CreateGoal");
            } else {
                navigation.replace("Home");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
                            <Text style={styles.title}>Đăng nhập tài khoản</Text>

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={colors.textSecondary}
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {errors.email && <Text style={styles.error}>{errors.email}</Text>}


                            <TextInput
                                placeholder="Mật khẩu"
                                placeholderTextColor={colors.textSecondary}
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

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
                                <Text style={styles.checkboxText}>Hiển thị mật khẩu</Text>
                            </Pressable>

                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: colors.primaryDark }]}
                                onPress={handleLogin}
                            >
                                <Text style={styles.buttonText}>Đăng nhập</Text>
                            </TouchableOpacity>

                            <Text style={styles.divider}>- Hoặc đăng nhập với -</Text>

                            <View style={styles.socialContainer}>
                                <TouchableOpacity
                                    style={styles.googleButton}
                                    onPress={() => {
                                        console.log("Login with Google");
                                    }}
                                >
                                    <AntDesign name="google" size={20} color="#DB4437" />
                                    <Text style={styles.googleText}>Đăng nhập bằng Google</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.signupText}>
                                Bạn chưa có tài khoản?{" "}
                                <Text style={styles.signupLink}
                                    onPress={() => navigation.navigate("RegisterEmail")}>Đăng ký ngay</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}