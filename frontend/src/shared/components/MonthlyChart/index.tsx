import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { colors } from "../../../shared/theme/colors";

type Props = {
  data: any[];
};

export default function MonthlyChart({ data }: Props) {

  if (!data || data.length === 0) return null;

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  const percent = previous
    ? ((latest.amount - previous.amount) / previous.amount) * 100
    : 0;

  const maxValue = Math.max(...data.map(item => item.amount));

  return (
    <View style={styles.container}>

      <View style={styles.headerRow}>
        <Text style={styles.title}>Thống kê theo ngày</Text>

        <Text
          style={[
            styles.percentText,
            {
              color:
                percent > 0
                  ? colors.success
                  : percent < 0
                  ? colors.danger
                  : colors.disabled,
            },
          ]}
        >
          {percent > 0 ? "↑" : percent < 0 ? "↓" : ""}
          {Math.abs(percent).toFixed(1)}%
        </Text>
      </View>

      <View style={styles.chartContainer}>
        {data.slice(-7).map((item, index) => {

          const height = (item.amount / maxValue) * 120;

          return (
            <View key={index} style={styles.barWrapper}>

              <Text style={styles.amountText}>
                {(item.amount / 1000).toFixed(0)}k
              </Text>

              <View
                style={[
                  styles.bar,
                  {
                    height,
                    backgroundColor:
                      item.date === latest.date
                        ? colors.primary
                        : colors.primaryDark,
                  },
                ]}
              />

              <Text style={styles.monthLabel}>
                {item.date.slice(5)}
              </Text>

            </View>
          );
        })}
      </View>

    </View>
  );
}