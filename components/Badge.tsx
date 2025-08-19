import { ThemeColors, useColor } from "@/hooks/useColor";
import { FC } from "react";
import Wrapper from "./Wrapper";
import Text from "./Text";

type BadgeProps = {
    label: string;
    color?: keyof ThemeColors;
};

const Badge: FC<BadgeProps> = ({label, color = "primary"}) => {
    const {color: theme} = useColor();
    const {bg, content} = theme[color];

    return (
        <Wrapper backgroundColor={bg} borderRadius={20} height={30} alignItems="center" justifyContent="center" paddingHorizontal={12} minWidth={50}>
          <Text variant="label" color={content}>{label}</Text>
        </Wrapper>
    );
};

export default Badge;