import { useGetMe } from "@/hooks/authentication/useGetMe"
import Wrapper from "./Wrapper";
import Avatar from "./Avatar";
import Text from "./Text";
import Button from "./Button";
import { useColor } from "@/hooks/useColor";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const UserCard = () => {
    const {data} = useGetMe();
    const {color} = useColor();
    const [seed, setSeed] = useState<string | null>(null);

    useEffect(() => {
        if (!data?.id) return;
        const key = `avatarSeed:${data.id}`;
        (async () => {
            try {
                const existing = await SecureStore.getItemAsync(key);
                if (existing) {
                    setSeed(existing);
                    return;
                }
                const newSeed = `${data.id}-${Math.random().toString(36).slice(2,9)}-${Date.now()}`;
                await SecureStore.setItemAsync(key, newSeed);
                setSeed(newSeed);
            } catch (e) {
                setSeed(`${data?.id ?? "anon"}-${Math.random().toString(36).slice(2,7)}`);
            }
        })();
    }, [data?.id]);
    console.log("UserCard", data);
    return (
        <Wrapper alignItems="center" justifyContent="center" height={250} gap={20}>
            <Avatar
                fallback="IF"
                size={100}
                src={{ uri: `https://robohash.org/${encodeURIComponent(seed ?? data?.id ?? "user")}.png?size=200x200` }}
            />
            <Wrapper alignItems="center">
                <Text variant="title">{data?.name}</Text>
                <Text variant="small">{data?.email}</Text>
            </Wrapper>
        </Wrapper>
    );
};

export default UserCard;