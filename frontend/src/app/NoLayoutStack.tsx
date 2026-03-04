import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../features/auth/screens/Login";
import Register from "../features/auth/screens/Register";

const Stack = createNativeStackNavigator();

import NoLayout from "../shared/layouts/NoLayout";
import AddSaving from "../features/add-saving";
import SetupJourney from "../features/setup";
import VerifyOtp from "../features/auth/screens/VerifyOtp";
import RegisterEmail from "../features/auth/screens/RegisterEmail";

function withNoLayout(Component: any) {
    return function WrappedScreen(props: any) {
        return (
            <NoLayout>
                <Component {...props} />
            </NoLayout>
        );
    };
}

export default function NoLayoutStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={withNoLayout(Login)} />
            <Stack.Screen name="RegisterEmail" component={withNoLayout(RegisterEmail)} />
            <Stack.Screen name="VerifyOtp" component={withNoLayout(VerifyOtp)} />
            <Stack.Screen name="SetupJourney" component={withNoLayout(SetupJourney)} />
            <Stack.Screen name="Register" component={withNoLayout(Register)} />
            <Stack.Screen name="AddSaving" component={withNoLayout(AddSaving)} />
        </Stack.Navigator>
    );
}