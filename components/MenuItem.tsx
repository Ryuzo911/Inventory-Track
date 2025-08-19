import { ThemeColors, useColor } from "@/hooks/useColor";
import { Octicons } from "@expo/vector-icons"
import { FC } from "react";
import { TouchableOpacity } from "react-native";
import Wrapper from "./Wrapper";
import IconButton from "./IconButton";
import Text from "./Text";

type MenuItemProps = {
    key: number;
    title: string;
    subtitle: string;
    icon: keyof typeof Octicons.glyphMap;
    onPress?: () => void;
    color?: keyof ThemeColors;
    disabled: boolean;
    image_url?: string;
};

const MenuItem: FC<MenuItemProps> = ({ title, subtitle, icon, onPress, color = "primary", disabled = false }) => {
    const { color: theme } = useColor();
    return(
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Wrapper opacity={disabled ? 0.5 : 1} flexDirection="row" padding={20} paddingVertical={13} gap={15} backgroundColor={theme.card.bg} borderRadius={20} alignItems="center">
                <IconButton icon={icon} color={color} onPress={onPress} />
                <Wrapper>
                    <Text variant="menutitle">{title}</Text>
                    <Text variant="label">{subtitle}</Text> 
                </Wrapper>
            </Wrapper>
        </TouchableOpacity>
    );
};

export default MenuItem ;