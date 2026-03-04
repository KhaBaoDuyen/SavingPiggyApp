import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../style";

interface Props {
  avatar: string | null;
  frameColor: string;
  onPress: () => void;
}

export default function AvatarFrame({
  avatar,
  frameColor,
  onPress,
}: Props) {
  return (
    <View style={styles.avatarWrapper}>
      <View
        style={[
          styles.avatarFrame,
          { borderColor: frameColor },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require("../../../../assets/images/avatar.png")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraIcon}>
        <Ionicons name="camera" size={14} color="#fff" />
      </View>
    </View>
  );
}