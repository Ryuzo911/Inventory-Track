import { ThemeColors, useColor } from "@/hooks/useColor";
import { FC, PropsWithChildren, ReactNode } from "react";
import { ViewStyle } from "react-native";
import Wrapper from "./Wrapper";

type CardProps = PropsWithChildren & {
    header?: ReactNode;
    footer?: ReactNode;
    color?: keyof ThemeColors;
    wrapperStyle?: ViewStyle;
};

const Card: FC<CardProps> = ({header, footer, children, color= "card", wrapperStyle}) => {
    const {color: theme} = useColor();
    const  {bg} = theme[color];
    return (
        <Wrapper backgroundColor={bg} padding={20} borderRadius={10} gap={15}>
            {header && <Wrapper>{header}</Wrapper>}
            {children && <Wrapper>{children}</Wrapper>}
            {footer && <Wrapper>{footer}</Wrapper>}
        </Wrapper>
    );
};

export default Card;
