import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { Audio } from "expo-av";
import { colors } from "../../shared/theme/colors";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import Toast from "react-native-toast-message";
import LoadingSpinner from "../../shared/components/Loading";
import { checkinSaving } from "../../services/saving.api";

export default function AddSaving() {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const playSaveSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../../../assets/sounds/save.mp3")
        );
        await sound.playAsync();
    };

    const handlePress = (value: string) => {
        if (value === "delete") {
            setAmount((prev) => prev.slice(0, -1));
        } else {
            setAmount((prev) => prev + value);
        }
    };

    const renderKey = (label: string, value?: string) => (
        <TouchableOpacity
            style={styles.key}
            onPress={() => handlePress(value ?? label)}
        >
            {label === "delete" ? (
                <Feather name="delete" size={26} color={colors.primary} />
            ) : (
                <Text style={styles.keyText}>{label}</Text>
            )}
        </TouchableOpacity>
    );

    const handleSave = async () => {
        if (!amount) {
            Toast.show({
                type: "error",
                text1: "Vui lòng nhập số tiền"
            });
            return;
        }

        try {
            setLoading(true);

            const res: any = await checkinSaving({
                amount: Number(amount),
                note
            });
            await playSaveSound();

            Toast.show({
                type: "success",
                text1: res?.data?.message || "Lưu thành công"
            });

            navigation.goBack();

        } catch (err: any) {
            // console.log("ERROR DATA:", err?.response?.data);
            Toast.show({
                type: "error",
                text1: err?.response?.data?.message || err?.message || "Có lỗi xảy ra"
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LoadingSpinner visible={loading} />
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>

            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>
                    {amount ? formatCurrency(Number(amount)) : "0đ"}
                </Text>

                <TouchableOpacity>
                    <TextInput
                        style={styles.noteInput}
                        value={note}
                        onChangeText={setNote}
                        placeholder="Thêm ghi chú"
                        placeholderTextColor="#aaa"
                        maxLength={50} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
            >
                <Text style={styles.saveButtonText}>Lưu tiết kiệm</Text>
            </TouchableOpacity>

            <View style={styles.keypad}>
                {renderKey("1")}
                {renderKey("2")}
                {renderKey("3")}
                {renderKey("4")}
                {renderKey("5")}
                {renderKey("6")}
                {renderKey("7")}
                {renderKey("8")}
                {renderKey("9")}
                {renderKey("0")}
                {renderKey("000")}
                {renderKey("delete", "delete")}
            </View>
        </SafeAreaView>
    );
}