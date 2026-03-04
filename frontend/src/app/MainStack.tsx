import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../features/dashboard";
import YearStreak from "../features/year-streak";
import MainLayout from "../shared/layouts/MainLayout";
import SavingsHistory from "../features/savings-history";
import ProfileSetting from "../features/profile-setting";

const Stack = createNativeStackNavigator();

function withLayout(Component: any) {
    return function WrappedScreen(props: any) {
        return (
            <MainLayout >
                <Component {...props} />
            </MainLayout>
        );
    };
}

export default function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={withLayout(Dashboard)} />
            <Stack.Screen name="YearStreak" component={withLayout(YearStreak)} />
            <Stack.Screen name="SavingsHistory" component={withLayout(SavingsHistory)} />
            <Stack.Screen name="ProfileSetting" component={withLayout(ProfileSetting)} />
        </Stack.Navigator>
    );
}