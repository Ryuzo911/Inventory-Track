import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import Wrapper from "../Wrapper";
import { Image, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Text from "../Text";
import { useGetCategory } from "@/hooks/useCategory";

type ProductCardProps = {
    name?: string;
    stock?: number;
    image_url?: string;
}

const ProductCard: FC<ProductCardProps> = ({name, stock, image_url}) => {
    const {color} = useColor();
    console.log("ProductCard rendered with name:", name, "stock:", stock, "image_url:", image_url);

    return (
        <Wrapper padding={20} borderRadius={12} gap={12} backgroundColor={color.base.bg}>
            <TouchableOpacity activeOpacity={0.7}  >
                <Wrapper alignItems="center" gap={12} justifyContent="center">
                    {image_url ? (
                        <Image source={{uri: image_url}} style={{width: "100%", height: 200, borderRadius: 10, backgroundColor: color.card.bg}}/>
                    ) : (
                        <Wrapper width={60} height={60} borderRadius={10} backgroundColor={color.base.content} justifyContent="center" alignItems="center" > 
                            <Octicons name="package" color={color.primary.content} size={50}/>
                        </Wrapper>
                    )}
                    <Wrapper flex={1} alignItems="center">
                        <Text variant="title">{name}</Text>
                        <Text variant="subtitle">{stock}</Text>
                    </Wrapper>
                </Wrapper>
            </TouchableOpacity>
        </Wrapper>
    );
};

export default ProductCard;