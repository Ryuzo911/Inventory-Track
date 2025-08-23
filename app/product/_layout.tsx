import Loading from "@/components/Loading";
import Wrapper from "@/components/Wrapper";
import { useColor } from "@/hooks/useColor"
import { useSession } from "@/hooks/useSession";
import { Redirect, Stack } from "expo-router";
import * as SystemUi  from "expo-system-ui"

const ProductLayout = () => {
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
    }

    return (
        <Stack screenOptions={{
            contentStyle: {backgroundColor: color.base.bg},
            headerTitleStyle: {
                fontFamily: 'SemiBold',
                color: color.base.content as string
            },
            headerTintColor: color.base.content as string,
            headerStyle: {
                backgroundColor: color.base.bg as string,
            },
        }}>
            <Stack.Screen name="[id]" options={{title: "Product Detail"}}/>
            <Stack.Screen name="lowstock" options={{title: "Low Stock Product"}}/>
        </Stack>
    );
};

export default ProductLayout;