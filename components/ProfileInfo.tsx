import { FC } from "react";
import Wrapper from "./Wrapper";
import Text from "./Text";

type ProfileInfoProps = {
    name?: string;
    email?: string;
    role?: string;
}

const ProfileInfo: FC<ProfileInfoProps> = ({name, email, role}) => {
    return( 
    <Wrapper justifyContent="center" alignItems="center" gap={30}>
        <Text>{name}</Text>
        <Text>{email}</Text>
        {role && (<Wrapper><Text>{role}</Text></Wrapper>)}
    </Wrapper>
    );
};

export default ProfileInfo;