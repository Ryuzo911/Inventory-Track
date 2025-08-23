import ChangeAvatar from "@/components/ChangeAvatar";
import ChangePassword from "@/components/ChangePassword";
import Logout from "@/components/Logout";
import ProfileInfo from "@/components/Logout";
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
            <TabPill options={[ "Security", "Avatar", "Danger"]} wrapperStyle={{flex: 1, justifyContent: "center"}} active={active} setActive={setActive}/>
            <Wrapper padding={30} gap={20}>
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
                {active === "Danger" && (
                    <Wrapper gap={20}>
                      <Logout />
                    </Wrapper>
                )}
            </Wrapper>
        </ScrollView>
    );
};

export default ProfileScreen;