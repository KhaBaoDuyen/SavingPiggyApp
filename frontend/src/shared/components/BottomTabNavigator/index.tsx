import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { colors } from "../../../shared/theme/colors";
import { styles } from "./style";

export default function BottomTabNavigator() {
    const navigation = useNavigation<any>();
    const route = useRoute();

    const currentRoute = route.name;

    const renderTab = (
        screenName: string,
        iconName: any,
        label: string
    ) => {
        const isActive = currentRoute === screenName;

        return (
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate(screenName)}
            >
                <Feather
                    name={iconName}
                    size={22}
                    color={isActive ? colors.primary : colors.textSecondary}
                />

                {isActive && (
                    <Text style={styles.label}>
                        {label}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {renderTab("Dashboard", "grid", "Tổng quan")}

                {renderTab("YearStreak", "calendar", "Chuỗi")}

                <TouchableOpacity style={styles.floatingButton}
                    onPress={() => navigation.navigate("NoLayout", {
                        screen: "AddSaving"
                    })}>
                    <AntDesign name="plus" size={24} color={colors.textLight} />
                </TouchableOpacity>

                {renderTab("SavingsHistory", "bar-chart-2", "Thống kê")}

                {renderTab("ProfileSetting", "user", "Cá nhân")}
            </View>
        </View>
    );
}