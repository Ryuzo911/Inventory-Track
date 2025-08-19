import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import Text from "./Text";
import Wrapper from "./Wrapper";
import Avatar from "./Avatar";

type ImageSelectorProps = {
    label?: string;
    value: string;
    onChange: (image: string) => void;
};

const ImageSelector: FC<ImageSelectorProps> = ({label, value, onChange}) => {
    const {color} = useColor();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            onChange(result.assets[0].uri);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage} style={{gap: 5}}>
            {label && <Text variant="label">{label}</Text>}
            <Wrapper flexDirection="row" alignItems="center" gap={10} backgroundColor={color.input.bg} borderRadius={10} paddingHorizontal={12} height={48}>
                <Avatar src={value ? {uri: value}: undefined} size={30} fallback="A"/>
                <Wrapper flex={1}>
                    {value ? (<Text numberOfLines={1}>{value}</Text>): (<Text numberOfLines={1} color={"#808080"}>Choose Image</Text>)}
                </Wrapper>
            </Wrapper>
        </TouchableOpacity>
    )
};

export default ImageSelector;