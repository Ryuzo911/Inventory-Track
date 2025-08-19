import { useColor } from "@/hooks/useColor"
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUi from "expo-system-ui"
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AuthLayout = () => {
    const color = useColor();
    SystemUi.setBackgroundColorAsync(color.color.base.bg ?? "black");
    
    return (
    <GestureHandlerRootView>
        <Stack screenOptions={{
            headerShown: false,
            headerLargeTitle: true,
            contentStyle: {backgroundColor: color.color.base.bg}
        }}>
            <Stack.Screen name="login"/>
            <Stack.Screen name="register"/>
        </Stack>
        <StatusBar style={"inverted"} animated={true}/>
    </GestureHandlerRootView>
)
};

export default AuthLayout;