import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Logout from "@/components/Logout";
import ProfileInfo from "@/components/Logout";
import TabPill from "@/components/TabPill";
import Text from "@/components/Text";
import UserCard from "@/components/UserCard";
import Wrapper from "@/components/Wrapper";
import { usePermissions } from "@/hooks/authentication/usePermissions";
import { router } from "expo-router";
import { useState } from "react"
import { ScrollView } from "react-native";

const ProfileScreen = () => {
    const {hasPermission} = usePermissions();

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Wrapper padding={20} gap={20}>
                <UserCard />
            </Wrapper>
            <Wrapper paddingHorizontal={20} gap={10}>
                <Text variant="subtitle">Hi, ini halaman profile</Text>
                <Text variant="text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui pariatur modi maiores praesentium iste excepturi molestias voluptatem culpa reprehenderit minima deleniti, sapiente, nam officia perspiciatis quo. Eveniet voluptates ad perferendis?</Text>
            </Wrapper>
            <Wrapper flexDirection="row-reverse" paddingHorizontal={20} gap={10}>
                <Wrapper paddingTop={60}>
                    <Logout/>
                </Wrapper>
               {hasPermission("manage_product") && (
                 <Wrapper paddingTop={60}>
                    <IconButton icon="people" color="primary" size="large" onPress={() => router.push("/admin/AdminScreen")}/>
                </Wrapper>
               )}
            </Wrapper>
        </ScrollView>
    );
};

export default ProfileScreen;