import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { styles } from "../style";
import { colors } from "../../../shared/theme/colors";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import Svg, { Circle } from "react-native-svg";

interface Props {
  percentage: number;
  currentAmount: number;
  targetAmount: number;
  onPressDetail: () => void;
}

export default function SummaryCard({
  percentage,
  currentAmount,
  targetAmount,
  onPressDetail
}: Props) {

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 800,
      useNativeDriver: false
    }).start();
  }, [percentage]);

  const size = 90;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedStroke = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0]
  });

  return (
    <View style={[styles.summaryCard, { backgroundColor: colors.primaryDark }]}>

      <View style={styles.summaryContent}>

        <Text style={styles.summaryTitle}>
          Tiến độ hoàn thành mục tiêu
        </Text>

        <Text style={styles.targetAmount}>
          {formatCurrency(currentAmount)} / {formatCurrency(targetAmount)}
        </Text>

        <TouchableOpacity
          style={[styles.viewTaskButton, { backgroundColor: colors.warning }]}
          onPress={onPressDetail}
        >
          <Text style={styles.viewTaskText}>
            Xem chi tiết
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.progressContainer}>

        <Svg width={size} height={size}>

          {/* Vòng nền trắng 100% */}

          <Circle
            stroke="#FFFFFF"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />

          {/* Vòng tiến độ vàng */}

          <AnimatedCircle
            stroke={colors.warning}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={animatedStroke}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />

        </Svg>

        <View
          style={{
            position: "absolute",
            width: size,
            height: size,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.progressText}>
            {percentage}%
          </Text>
        </View>

        <Text style={styles.targetLabel}>
          so với mục tiêu
        </Text>

      </View>

    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);