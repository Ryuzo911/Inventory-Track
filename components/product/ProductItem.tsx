import { FC } from "react";
import { Image, TouchableOpacity } from "react-native";
import Wrapper from "../Wrapper";
import { useColor } from "@/hooks/useColor";
import Text from "../Text";

type ProductItemProps = {
    image_url: string;
    name: string;
    stock: number;
    onPress?: () => void
}

const ProductItem: FC<ProductItemProps> = ({image_url, name, stock, onPress}) => {
    const {color: theme} = useColor();
    return (
        <TouchableOpacity onPress={onPress}>
            <Wrapper opacity={0.7} flexDirection="row" padding={20} paddingVertical={13} gap={15} backgroundColor={theme.card.bg} borderRadius={20} alignItems="center">
                <Image source={{uri: image_url}}/>
                <Wrapper>
                    <Text variant="menutitle">{name}</Text>
                    <Text variant="label">{stock}</Text>
                </Wrapper>
            </Wrapper>
        </TouchableOpacity>
    );
};

export default ProductItem;