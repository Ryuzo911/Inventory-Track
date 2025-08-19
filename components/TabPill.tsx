import { FC } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Wrapper from "./Wrapper";
import Badge from "./Badge";

type TabsProps = {
    options: string[];
    active?: string;
    setActive?: (value: string) => void;
    wrapperStyle?: ViewStyle; 
};

const TabPill: FC<TabsProps> = ({options, active, setActive, wrapperStyle}) => {
    return (
        <Wrapper flexDirection="row" gap={10} {...wrapperStyle}>
            {options.map((item) => (
                <TouchableOpacity onPress={() => setActive?.(item)} key={item}>
                    <Badge color={item === active ? "primary" : "input"} label={item === "" ? "All" : item}/>
                </TouchableOpacity>
            ))}
        </Wrapper>
    );
};

export default TabPill;