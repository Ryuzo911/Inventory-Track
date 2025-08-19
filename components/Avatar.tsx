import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import { Image, ImageSourcePropType } from "react-native";
import Wrapper from "./Wrapper";
import Text from "./Text";

type AvatarProps = {
    size?: number;
    fallback?: string;
    src?: ImageSourcePropType;
}

const Avatar: FC<AvatarProps> = ({ size = 48, fallback, src }) => {
    const { color } = useColor();
    return(
        <Wrapper borderRadius={size / 2} backgroundColor={color.card.bg} width={size} height={size} justifyContent="center" alignItems="center" overflow="hidden">
            {src ? (
                <Image source={src} style={{ width: size, height: size, resizeMode: "cover" }} />
            ) : (
                <Text>{fallback}</Text>
            )}
        </Wrapper>
    )
}

export default Avatar;