import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { colors } from "../../../../shared/theme/colors";

interface Props {
  currentStep: number;
  totalSteps: number;
  onStepPress: (step: number) => void;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  onStepPress,
}: Props) {
  return (
    <View style={styles.stepContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isPast = stepNumber < currentStep;

        return (
          <TouchableOpacity
            key={index}
            disabled={!isPast}
            onPress={() => isPast && onStepPress(stepNumber)}
          >
            <Text
              style={[
                styles.stepDot,
                {
                  color: isActive
                    ? colors.primary
                    : isPast
                    ? colors.accent
                    : colors.futureNodeBorder,
                },
              ]}
            >
              {isActive ? "●" : "○"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}