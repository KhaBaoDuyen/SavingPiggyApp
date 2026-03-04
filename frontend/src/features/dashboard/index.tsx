import React, { useCallback, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { styles } from "./style";
import { colors } from "../../shared/theme/colors";
import LoadingSpinner from "../../shared/components/Loading";

import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import CalendarProgress from "./components/CalendarProgress";

import { Transaction } from "../../shared/components/MonthlyChart/data";
import { getGoal } from "../../services/goal.api";
import { getSavingHistory } from "../../services/saving.api";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MonthlyChart from "../../shared/components/MonthlyChart";
import { getProfile } from "../../services/profile.api";
import { groupByDay } from "../../shared/utils/groupByDay";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { generateWeekDays } from "../../shared/utils/generateWeekDays";
import { calculateStreak } from "../../shared/utils/streak";

export default function Dashboard() {
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [goal, setGoal] = useState<any>(null);
  const [totalSaving, setTotalSaving] = useState(0);

  const [savings, setSavings] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const loadData = async () => {
    try {
      setLoading(true);

      const goalRes: any = await getGoal();
      const historyRes: any = await getSavingHistory();
      const user: any = await getProfile();

      setUsername(user?.data?.name || "");

      const goalData = goalRes?.data?.goal;
      setGoal(goalData);

      const history = historyRes.data;

      const total = history.reduce(
        (sum: number, item: any) => sum + Number(item.amount),
        0
      );

      setTotalSaving(total);

      const percent = goalData?.targetAmount
        ? Math.min(
          100,
          Math.round((total / goalData.targetAmount) * 100)
        )
        : 0;

      setPercentage(percent);

      const latest = [...history]
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 6);

      setSavings(latest);

      const formatted = history.map((item: any) => ({
        id: item.id,
        amount: item.amount,
        createdAt: item.createdAt
      }));

      setTransactions(formatted);

      // console.log("savingHistory:", history);
      // console.log("totalSaving:", total);
      // console.log("targetAmount:", goalData?.targetAmount);
      // console.log("percent:", percent);
    } catch (error) {
      console.log("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const realDays = generateWeekDays(transactions);
  const streakData = calculateStreak(transactions);
  const dailyStats = groupByDay(transactions);

  const goToHistory = () => {
    navigation.navigate("SavingsHistory");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingSpinner visible={loading} />

      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header username={username} />

        {goal && (
          <SummaryCard
            percentage={percentage}
            currentAmount={totalSaving}
            targetAmount={goal.targetAmount}
            onPressDetail={goToHistory}
          />
        )}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary }
          ]}
        >
          Tiến trình theo ngày
        </Text>

        <CalendarProgress
          realDays={realDays}
          currentMonth={currentMonth}
          currentYear={currentYear}
          streak={streakData.streak}
        />

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary }
          ]}
        >
          Thống kê từng ngày
        </Text>

        <MonthlyChart data={dailyStats} />

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary }
          ]}
        >
          Lịch sử gần đây
        </Text>

        <View style={styles.gridContainer}>
          {savings.slice(0, 5).map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.taskBoxNew,
                {
                  backgroundColor:
                    index % 2 === 0
                      ? "#F6FAFD"
                      : "#EEF7F2"
                }
              ]}
            >
              <Text style={styles.boxTitle}>
                {item.note || "Tiết kiệm"}
              </Text>

              <Text style={styles.boxAmount}>
                +{formatCurrency(item.amount)}
              </Text>

              <Text style={styles.boxDate}>
                {new Date(item.createdAt).toLocaleDateString(
                  "vi-VN"
                )}
              </Text>

              <View style={styles.boxIcon}>
                <Image
                  source={require("../../../assets/images/savingPiggy.png")}
                  style={styles.boxImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={[styles.taskBoxNew, styles.addBox]}
            onPress={() =>
              navigation.navigate("NoLayout", {
                screen: "AddSaving"
              })
            }
          >
            <Text style={styles.addTitle}>
              Thêm khoản{"\n"}tiết kiệm
            </Text>

            <Text style={styles.addSub}>
              Nhấn để nhập +
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}