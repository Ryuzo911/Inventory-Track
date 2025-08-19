import ChangeAvatar from "@/components/ChangeAvatar";
import ChangePassword from "@/components/ChangePassword";
import ProfileInfo from "@/components/ProfileInfo";
import TabPill from "@/components/TabPill";
import Text from "@/components/Text";
import UserCard from "@/components/UserCard";
import Wrapper from "@/components/Wrapper";
import { useState } from "react"
import { ScrollView } from "react-native";

const ProfileScreen = () => {
    const [active, setActive] = useState("Profile info");

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Wrapper padding={20} gap={20}>
                <UserCard />
            </Wrapper>
            <TabPill options={["Profile info", "Security", "Avatar"]} wrapperStyle={{flex: 1, justifyContent: "center"}} active={active} setActive={setActive}/>
            <Wrapper padding={30} gap={20}>
                {active === "Profile info" && (
                    <Wrapper gap={20}>
                      <ProfileInfo />
                    </Wrapper>
                )}
                {active === "Security" && (
                    <Wrapper gap={20}>
                        <ChangePassword/>
                    </Wrapper>
                )}
                {active === "Avatar" && (
                    <Wrapper gap={20}>
                        <ChangeAvatar />
                    </Wrapper>
                )}
            </Wrapper>
        </ScrollView>
    );
};

export default ProfileScreen;