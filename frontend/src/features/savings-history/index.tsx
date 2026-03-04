import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Dimensions,
    Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./style";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { colors } from "../../shared/theme/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { getSavingHistory } from "../../services/saving.api";
import { getGoal } from "../../services/goal.api";

const { height } = Dimensions.get("window");

interface HistoryItem {
    id: string;
    amount: number;
    date: string;
    note: string;
}

export default function SavingsHistory() {

    const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const goalRes: any = await getGoal();
            const historyRes: any = await getSavingHistory();

            const goal = goalRes?.data?.goal;
            const percentValue = goalRes?.data?.percent ?? 0;

            setPercent(percentValue);

            const formatted: HistoryItem[] = historyRes.data.map((item: any) => ({
                id: item.id,
                amount: item.amount,
                date: new Date(item.createdAt).toLocaleDateString("vi-VN"),
                note: item.note
            }));

            setHistoryData(formatted);

        } catch (error) {
            console.log("Lỗi load dữ liệu:", error);
        }
    };
    const total = historyData.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const getLevelColor = (amount: number) => {
        if (amount >= 50000) return colors.success;
        if (amount >= 40000) return colors.accent;
        if (amount >= 30000) return colors.warning;
        if (amount >= 20000) return colors.primary;
        return colors.futureNodeBorder;
    };

    const renderItem = ({ item, index }: { item: HistoryItem; index: number }) => {

        const levelColor = getLevelColor(item.amount);
        const slideAnim = new Animated.Value(-50);

        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            delay: index * 80,
            useNativeDriver: true,
        }).start();

        return (
            <Animated.View
                style={[
                    styles.timelineRow,
                    { transform: [{ translateX: slideAnim }] },
                ]}
            >
                <View style={styles.timelineLeft}>
                    {index !== 0 && <View style={styles.lineTop} />}

                    <View style={[styles.dotRing, { borderColor: levelColor }]}>
                        <View
                            style={[styles.dotInner, { backgroundColor: levelColor }]}
                        />
                    </View>

                    {index !== historyData.length - 1 && (
                        <View style={styles.lineBottom} />
                    )}
                </View>

                <LinearGradient
                    colors={[levelColor + "33", levelColor + "15"]}
                    style={styles.cardOuter}
                >
                    <View style={styles.cardInner}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.amount}>
                                +{formatCurrency(item.amount)}
                            </Text>

                            <FontAwesome6
                                name="coins"
                                size={18}
                                color={levelColor}
                            />
                        </View>

                        <Text style={styles.note}>
                            {item.note || "Không có ghi chú"}
                        </Text>

                        <Text style={styles.date}>
                            {item.date}
                        </Text>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            <View
                style={[styles.headerSection, { height: height * 0.25 }]}
            >
                <Text style={styles.totalLabel}>
                    Lịch sử thống kê
                </Text>

                <Text style={styles.totalAmount}>
                    {formatCurrency(total)}
                </Text>

                <View style={styles.progressBackground}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${percent}%` },
                        ]}
                    />
                </View>

                <Text style={styles.percentLabel}>
                    hoàn thành {percent}%
                </Text>
            </View>

            <View style={[styles.historySection, { height: height * 0.8 }]}>
                <FlatList
                    data={historyData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </SafeAreaView>
    );
}