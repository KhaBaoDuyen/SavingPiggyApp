import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { styles } from "../style";
import { useState } from "react";
import { colors } from "../../../shared/theme/colors";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { sendOtp } from "../../../services/auth.api";
import { validateEmail } from "../validators/registerEmail.validator";
import LoadingSpinner from "../../../shared/components/Loading";
import { AntDesign } from "@expo/vector-icons";

export default function RegisterEmail() {
    const logo = require("../../../../assets/images/logo-light.png");
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState("");
    const [error, setError] = useState<{
        email?: string;
    }>({});
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        const validatorError = validateEmail(
            email,
        )

        setError(validatorError);
        if (Object.keys(validatorError).length === 0) {
            try {
                setLoading(true);
                const res = await sendOtp(email);
                Toast.show({
                    type: "success",
                    text1: res.data.message,
                });

                navigation.navigate("VerifyOtp", { email });

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

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image source={logo} style={styles.logo} resizeMode="contain" />
                        </View>

                        <View style={styles.formContent}>
                            <Text style={styles.title}>Nhập email của bạn</Text>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={colors.textSecondary}
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none" />
                            {error.email && <Text style={styles.error}>{error.email}</Text>}

                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: colors.primaryDark }]}
                                onPress={handleSendOtp}>
                                <Text style={styles.buttonText}>Gửi OTP</Text>
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
            <LoadingSpinner visible={loading} />
        </SafeAreaView>
    );
}