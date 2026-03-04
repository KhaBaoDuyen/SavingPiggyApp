import React, { useRef, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Animated,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { BS } from "../style";
import { formatCurrency } from "../../../shared/utils/formatCurrency";

const { height } = Dimensions.get("window");

interface Props {
    visible: boolean;
    day: number | null;
    note?: string;
    inputValue: string;
    setInputValue: (v: string) => void;
    existingAmount?: number;
    onClose: () => void;
    onSave: () => void;
    getDateLabel: (day: number) => string;
    isViewingPast: boolean;
}

export default function StreakModal({
    visible,
    day,
    note,
    inputValue,
    setInputValue,
    existingAmount,
    onClose,
    onSave,
    getDateLabel,
    isViewingPast,
}: Props) {

    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        } else {
            slideAnim.setValue(height);
        }
    }, [visible]);

    if (!visible || day === null) return null;

    const formatNumber = (value: string) => {
        if (!value) return "";
        return Number(value).toLocaleString("vi-VN");
    };

    const parseNumber = (value: string) => {
        return value.replace(/\D/g, "");
    };

    const amount = existingAmount ?? 0;

    return (
        <Modal transparent animationType="none" visible>

            <TouchableWithoutFeedback onPress={onClose}>
                <View style={BS.overlay} />
            </TouchableWithoutFeedback>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "position" : undefined}
                style={BS.kavWrapper}
            >

                <Animated.View
                    style={[BS.sheet, { transform: [{ translateY: slideAnim }] }]}
                >

                    <View style={BS.handle} />

                    <Text style={BS.dayLabel}>Ngày {day}</Text>
                    <Text style={BS.dateLabel}>{getDateLabel(day)}</Text>

                    <View style={BS.divider} />

                    {/* ===== PAST DAY ===== */}

                    {isViewingPast ? (

                        <View style={{ alignItems: "center", marginTop: 20 }}>

                            <Text style={{ fontSize: 14, color: "#888" }}>
                                Số tiền đã bỏ
                            </Text>

                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: "700",
                                    marginTop: 8,
                                }}
                            >
                                {formatCurrency(amount)}
                            </Text>

                            {note ? (
                                <Text style={BS.existingNote}>
                                    Ghi chú: {note}
                                </Text>
                            ) : null}

                        </View>

                    ) : (

                        <>
                            {/* ===== TODAY AMOUNT ===== */}

                            {amount > 0 && (
                                <View style={{ alignItems: "center", marginBottom: 20 }}>

                                    <Text style={{ fontSize: 14, color: "#888" }}>
                                        Đã bỏ hôm nay
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 26,
                                            fontWeight: "700",
                                            marginTop: 6,
                                        }}
                                    >
                                        {formatCurrency(amount)}
                                    </Text>

                                </View>
                            )}

                            {/* ===== INPUT ===== */}

                            <Text style={BS.inputLabel}>Bỏ thêm</Text>

                            <View style={BS.inputRow}>

                                <TextInput
                                    style={BS.input}
                                    value={formatNumber(inputValue)}
                                    onChangeText={(text) => {
                                        const raw = parseNumber(text);
                                        setInputValue(raw);
                                    }}
                                    keyboardType="numeric"
                                    placeholder="Nhập số tiền..."
                                    placeholderTextColor="#bbb"
                                    autoFocus
                                />

                                <Text style={BS.currency}>đ</Text>

                            </View>

                            {note ? (
                                <Text style={BS.existingNote}>
                                    Ghi chú: {note}
                                </Text>
                            ) : null}

                        </>
                    )}

                    {/* ===== BUTTON ===== */}

                    <View style={BS.btnRow}>

                        <TouchableOpacity
                            style={BS.btnCancel}
                            onPress={onClose}
                        >
                            <Text style={BS.btnCancelText}>Đóng</Text>
                        </TouchableOpacity>

                        {!isViewingPast && (
                            <TouchableOpacity
                                style={BS.btnSave}
                                onPress={onSave}
                            >
                                <Text style={BS.btnSaveText}>Lưu</Text>
                            </TouchableOpacity>
                        )}

                    </View>

                </Animated.View>

            </KeyboardAvoidingView>

        </Modal>
    );
}