import { FC } from "react";
import Wrapper from "./Wrapper";
import Text from "./Text";
import Button from "./Button";
import { useColor } from "@/hooks/useColor";
import IconButton from "./IconButton";

const Logout = () => {
    const {color} = useColor();

    return( 
    <Wrapper justifyContent="center" alignItems="center" gap={30}>
        <IconButton icon={"sign-out"} color={"warning"} size="large" />
    </Wrapper>
    );
};

export default Logout;