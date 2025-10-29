import Loading from "@/components/Loading";
import Wrapper from "@/components/Wrapper";
import { useColor } from "@/hooks/useColor"
import { useSession } from "@/hooks/useSession";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUi  from "expo-system-ui"
import { SafeAreaView } from "react-native-safe-area-context";

const AdminLayout = () => {
    const {color} = useColor();
    SystemUi.setBackgroundColorAsync(color.base.bg);

    const {session, isLoading} = useSession();

    if (isLoading) {
        return (
            <Wrapper backgroundColor={color.base.bg} flex={1}>
                <Loading/>
            </Wrapper>
        );
    };

    if (!session) {
        return <Redirect href="/login"/>
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: color.base.bg}}>
            <StatusBar/>
            <Stack screenOptions={{
                contentStyle: {backgroundColor: color.base.bg, },
                headerTitleStyle: {
                    fontFamily: 'SemiBold',
                    color: color.base.content as string
                },
                headerTintColor: color.base.content as string,
                headerStyle: {
                    backgroundColor: color.base.bg as string,
                },
            }}>
                <Stack.Screen name="AdminScreen" options={{title: "Kelola Akun", }}/>
            </Stack>
        </SafeAreaView>
    );
};

export default AdminLayout;