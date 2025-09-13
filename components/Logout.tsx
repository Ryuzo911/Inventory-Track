import { FC } from "react";
import Wrapper from "./Wrapper";
import Text from "./Text";
import Button from "./Button";
import { useColor } from "@/hooks/useColor";
import IconButton from "./IconButton";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import api from "@/utils/apis";
import apiUser from "@/utils/apis/apiUser";

const Logout = () => {
    const {color} = useColor();
    const handleLogout = async () => {
        Alert.alert(
            "Konfirmasi",
            "Apakah anda yakin ingin logout?",
            [
                {
                    text: "Tidak",
                    style: "cancel"
                },
                {
                    text: "Ya",
                    onPress: async () => {
                        apiUser.logout();
                        router.replace("/login");
                        console.log("Logout Berhasil");
                    }
                }
            ]
        )
    }

    return( 
    <Wrapper justifyContent="center" alignItems="center" gap={30}>
        <IconButton icon={"sign-out"} color={"warning"} size="large" onPress={handleLogout} />
    </Wrapper>
    );
};

export default Logout;