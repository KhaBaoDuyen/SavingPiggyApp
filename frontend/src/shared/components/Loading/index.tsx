import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { LoadingSpinnerProps } from "./interface";

export default function LoadingSpinner({
  visible,
  overlay = true,
}: LoadingSpinnerProps) {
  if (!visible) return null;

  if (overlay) {
    return (
      <Modal transparent animationType="fade">
        <View style={styles.overlay}>
          <ActivityIndicator
            size="large"
            color={colors.primaryDark}
          />
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator
        size="large"
        color={colors.primaryDark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  inline: {
    justifyContent: "center",
    alignItems: "center",
  },
});