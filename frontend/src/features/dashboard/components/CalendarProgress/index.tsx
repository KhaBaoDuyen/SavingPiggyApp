import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { colors } from "../../../../shared/theme/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  realDays: any[];
  currentMonth: number;
  currentYear: number;
  streak?: number;
}

export default function CalendarProgress({
  realDays,
  currentMonth,
  currentYear,
  streak = 0
}: Props) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.streakCard}>

      <View style={styles.streakHeader}>

        <View style={styles.streakTag}>
          <Text style={styles.streakTagText}>
            HỘI STREAK
          </Text>
        </View>

        <Text style={styles.streakNumber}>
          {streak} ngày streak
        </Text>

        <Text style={styles.streakSub}>
          Hãy tiếp tục tiết kiệm để nối dài streak!
        </Text>

      </View>

      <View style={styles.weekRow}>

        {realDays.map((item, index) => (

          <View key={index} style={{ alignItems: "center" }}>

            <Text
              style={[
                styles.dayText,
                item.isToday && styles.todayText
              ]}
            >
              {item.dayName}
            </Text>

            <View
              style={[
                styles.dayCircle,
                item.status === "done" && styles.dayDone,
                item.status === "miss" && styles.dayMiss,
                item.status === "future" && styles.dayFuture,
                item.isToday && item.status !== "future" && styles.todayCircle
              ]}
            >

              {item.status === "done" ? (
                <Ionicons name="checkmark" size={18} color="white" />
              ) : (
                <Text style={styles.dayNumber}>
                  {item.dateNum}
                </Text>
              )}
            </View>

          </View>

        ))}

      </View>

      <TouchableOpacity
        style={styles.reminderBtn}
        onPress={() => navigation.navigate("NoLayout", {
          screen: "AddSaving"
        })}>
        <Text style={styles.reminderBtnText}>
          Bỏ ống tiết kiệm
        </Text>
      </TouchableOpacity>

    </View>
  );
}