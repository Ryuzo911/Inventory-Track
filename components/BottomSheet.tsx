import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import { Modal, ModalProps, Pressable } from "react-native";
import Wrapper from "./Wrapper";
import Text from "./Text";

type BottomSheetProps = ModalProps & {
    title: string;
};

const BottomSheet: FC<BottomSheetProps> = ({title, children, ...props}) => {
    const {color} = useColor();
    console.log("BottomSheet rendered with title:", title);
    return (
        <Modal transparent animationType="slide" statusBarTranslucent visible={props.visible} {...props} onRequestClose={props.onRequestClose}>
            <Wrapper backgroundColor={"rgba(0, 0, 0, 0.5)"} flex={1} elevation={1}>
                <Pressable onPress={props.onRequestClose} style={{flex: 1}}/>
                <Wrapper flex={0} maxHeight={"90%"} backgroundColor={color.base.bg} padding={20} paddingTop={7} borderTopRightRadius={20} borderTopLeftRadius={20} gap={20}>
                <Wrapper height={5} backgroundColor={color.base.content} width={100} alignSelf="center" borderRadius={5} marginBottom={5}/>
                <Text variant="subtitle" align="center">{title}</Text>
                {children}
                </Wrapper>
            </Wrapper>
        </Modal>
    );
};

export default BottomSheet;