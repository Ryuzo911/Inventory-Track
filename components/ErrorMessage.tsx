import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import Text from "./Text";

type ErrorMessageProps = {
    message?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({message}) => {
    const {color} = useColor();

    return (
        <Text variant="label" color={color.error.bg}>
            {message}
        </Text>
    );
};

export default ErrorMessage;