import { useColor } from "@/hooks/useColor"
import Wrapper from "./Wrapper";
import SpinningView from "./SpinningView";
import { Octicons } from "@expo/vector-icons";
import Text from "./Text";

const Loading = () => {
    const {color} = useColor();

    return (
        <Wrapper justifyContent="center" alignItems="center" gap={10} flex={1}>
            <SpinningView>
                <Octicons name="sync" color={color.base.content} size={24}/>
            </SpinningView>
            <Text>Loading...</Text>
        </Wrapper>
    )
};

export default Loading;