import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../style";
import { colors } from "../../../shared/theme/colors";

interface Props {
  username: string;
}

export default function Header({ username }: Props) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.welcomeText}>Chào {username},</Text>
        <Text style={styles.titleBold}>
          Cùng <Text style={{ color: colors.primary }}>Tiết kiệm</Text> nào!
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.iconPlaceholder, { backgroundColor: colors.surface }]}
      >
        <Text style={{ fontSize: 20 }}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
}