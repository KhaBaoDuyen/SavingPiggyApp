import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { colors } from "../../../shared/theme/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";

interface Props {
    day: number;
    isCurrent: boolean;
    isPast: boolean;
    hasSaving?: boolean;
    isMilestone?: boolean;
    onPress: () => void;
}

export default function StreakNode({
    day,
    isCurrent,
    isPast,
    hasSaving,
    isMilestone,
    onPress,
}: Props) {

    const baseSize = isCurrent ? 85 : 70;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const missedBg = "#ffb3b3";
    const missedText = "#d40000";

    const mainColor = isCurrent
        ? colors.warning
        : isPast && hasSaving
            ? colors.primary
            : isPast && !hasSaving
                ? missedBg
                : "#e8eef1";

    useEffect(() => {

        if (isCurrent) {

            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

        }

    }, [isCurrent]);

    return (

        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={{ alignItems: "center", justifyContent: "center" }}
        >

            {isMilestone && (
                <View
                    style={{
                        position: "absolute",
                        width: baseSize + 45,
                        height: baseSize + 45,
                        borderRadius: 200,
                        backgroundColor: "rgba(255,215,0,0.15)",
                    }}
                />
            )}

            {isCurrent && (
                <View
                    style={{
                        position: "absolute",
                        width: baseSize + 30,
                        height: baseSize + 30,
                        borderRadius: 200,
                        borderWidth: 4,
                        borderColor: colors.warning,
                        backgroundColor: "transparent",
                    }}
                />
            )}

            {isCurrent && (
                <View
                    style={{
                        position: "absolute",
                        width: baseSize + 15,
                        height: baseSize + 15,
                        borderRadius: 200,
                        borderWidth: 3,
                        borderColor: "rgba(255,165,0,0.4)",
                        backgroundColor: "transparent",
                    }}
                />
            )}

            <Animated.View
                style={{
                    transform: [{ scale: scaleAnim }],
                    width: baseSize,
                    height: baseSize,
                    borderRadius: 250,
                    backgroundColor: mainColor,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: isCurrent ? 0.35 : 0.15,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 12,
                }}
            >

                <View
                    style={{
                        position: "absolute",
                        top: baseSize * 0.12,
                        left: baseSize * 0.18,
                        width: baseSize * 0.45,
                        height: baseSize * 0.25,
                        borderRadius: 50,
                        backgroundColor: "rgba(255,255,255,0.35)",
                        transform: [{ rotate: "-20deg" }],
                    }}
                />

                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: baseSize,
                        height: baseSize / 2,
                        borderBottomLeftRadius: 200,
                        borderBottomRightRadius: 200,
                        backgroundColor: "rgba(0,0,0,0.05)",
                    }}
                />

                {hasSaving ? (

                    <FontAwesome6
                        name="check"
                        size={32}
                        color={colors.surface}
                    />
                ) : isMilestone ? (
                    <Octicons
                        name="star-fill"
                        size={32}
                        color={colors.futureNodeBorder}
                    />
                ) : (
                    <Text
                        style={{
                            fontSize: isCurrent ? 36 : 30,
                            fontWeight: "800",
                            color: isCurrent
                                ? "#fff"
                                : isPast && !hasSaving
                                    ? "#d40000"
                                    : colors.futureNodeIcon,
                        }}
                    >
                        {day}
                    </Text>
                )}

            </Animated.View>

        </TouchableOpacity>

    );

}