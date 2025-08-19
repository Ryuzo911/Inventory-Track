import { FC } from "react";
import Text from "./Text";

type PasswordTogglerProps = {
    show: boolean;
    setShow: (show: boolean) => void;
};

const PasswordToggler: FC<PasswordTogglerProps> = ({show, setShow}) => {
    return (
        <Text variant="label" align="right" onPress={() => setShow(!show)}>
            {show ? "Hide" : "Show"} Password
        </Text>
    )
};

export default PasswordToggler;