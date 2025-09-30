import { useGetMe } from "@/hooks/authentication/useGetMe"
import Wrapper from "./Wrapper";
import Avatar from "./Avatar";
import Text from "./Text";
import Button from "./Button";
import { useColor } from "@/hooks/useColor";

const UserCard = () => {
    const {data} = useGetMe();
    const {color} = useColor();
    console.log("UserCard", data);
    return (
        <Wrapper alignItems="center" justifyContent="center" height={250} gap={20}>
            <Avatar fallback="IF" size={100} src={{uri: "https://robohash.org/user"}}/>
            <Wrapper alignItems="center">
                <Text variant="title">{data?.name}</Text>
                <Text variant="small">{data?.email}</Text>
            </Wrapper>
        </Wrapper>
    );
};

export default UserCard;