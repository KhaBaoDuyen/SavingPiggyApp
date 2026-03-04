import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import StepIndicator from "./components/StepIndicator";
import NumberKeypad from "./components/NumberKeypad";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createGoal } from "../../services/goal.api";
import Toast from "react-native-toast-message";
import LoadingSpinner from "../../shared/components/Loading";

export default function SetupJourney() {
    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState("");
    const [daily, setDaily] = useState("");

    const goalNumber = Number(goal || 0);
    const dailyNumber = Number(daily || 0);

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();

    const days =
        dailyNumber > 0 ? Math.ceil(goalNumber / dailyNumber) : 0;

    const handleKeyPress = (value: string) => {
        if (value === "delete") {
            if (step === 1) setGoal((prev) => prev.slice(0, -1));
            if (step === 2) setDaily((prev) => prev.slice(0, -1));
        } else {
            if (step === 1) setGoal((prev) => prev + value);
            if (step === 2) setDaily((prev) => prev + value);
        }
    };


    const handleCreateGoal = async () => {
        try {
            setLoading(true);

            await createGoal(
                goalNumber,
                dailyNumber
            );

            Toast.show({
                type: "success",
                text1: "Tạo mục tiêu thành công 🎉",
            });

            navigation.replace("Main", {
                screen: "Dashboard",
            });

        } catch (error: any) {
            Toast.show({
                type: "error",
                text1:
                    error?.response?.data?.message ||
                    "Không thể tạo mục tiêu",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../../../assets/images/logo-dark.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.card}>
                <StepIndicator
                    currentStep={step}
                    totalSteps={3}
                    onStepPress={(s) => setStep(s)}
                />

                {step === 1 && (
                    <>
                        <Text style={styles.title}>
                            Bạn muốn tiết kiệm bao nhiêu?
                        </Text>

                        <Text style={styles.bigNumber}>
                            {goalNumber ? formatCurrency(goalNumber) : "0đ"}
                        </Text>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Text style={styles.title}>
                            Mỗi ngày bạn tiết kiệm bao nhiêu?
                        </Text>

                        <Text style={styles.bigNumber}>
                            {dailyNumber ? formatCurrency(dailyNumber) : "0đ"}
                        </Text>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Text style={styles.title}>
                            Bạn sẽ đạt mục tiêu trong
                        </Text>

                        <Image
                            source={require("../../../assets/images/piggySaving.gif")}
                            style={styles.gif}
                            resizeMode="contain"
                        />

                        <Text style={styles.result}>
                            {days} ngày
                        </Text>
                    </>
                )}
            </View>

            <View style={styles.footer}>
                {step < 3 ? (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            step === 1 && !goal && styles.buttonDisabled,
                            step === 2 && !daily && styles.buttonDisabled,
                        ]}
                        disabled={
                            (step === 1 && !goal) ||
                            (step === 2 && !daily)
                        }
                        onPress={() => setStep(step + 1)}
                    >
                        <Text style={styles.buttonText}>
                            Tiếp theo
                        </Text>
                        <Ionicons
                            name="arrow-forward"
                            size={18}
                            color="#fff"
                            style={{ marginLeft: 6 }}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleCreateGoal}
                    >
                        <Text style={styles.buttonText}>
                            Bắt đầu hành trình
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {step < 3 && (
                <View style={styles.keypadContainer}>
                    <NumberKeypad onPress={handleKeyPress} />
                </View>
            )}
        </SafeAreaView>
    );
}