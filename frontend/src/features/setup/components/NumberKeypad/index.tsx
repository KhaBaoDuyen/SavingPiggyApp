import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { colors } from "../../../../shared/theme/colors";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  onPress: (value: string) => void;
}

export default function NumberKeypad({ onPress }: Props) {
  const renderKey = (label: string, value?: string) => (
    <TouchableOpacity
      style={styles.key}
      onPress={() => onPress(value ?? label)}
    >
      {label === "delete" ? (
        <Feather name="delete" size={22} color={colors.primary} />
      ) : (
        <Text style={styles.keyText}>{label}</Text>
      )}
    </TouchableOpacity>
  );

  return (
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
  );
}