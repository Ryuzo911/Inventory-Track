import { useColor } from "@/hooks/useColor";
import { FC, useState } from "react";
import { ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import Input from "./Input";
import { Octicons } from "@expo/vector-icons";
import BottomSheet from "./BottomSheet";
import Wrapper from "./Wrapper";
import Text from "./Text";

type Option = {label: string, value: string | number};
type SelectProps = {
    placeholder?: string;
    withReset?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    options: Option[];
    style?: ViewStyle;
    label?: string;
};

const Select: FC<SelectProps> = ({label, placeholder = "Pilih", withReset = true, value, onChange, options, style}) => {
    const {color} = useColor();
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <TouchableOpacity onPress={() => setShow(true)}>
                <Input
                  label={label}
                  editable={false}
                  placeholder={placeholder}
                  value={options.find((o) => o.value === value)?.label || ""}
                />
                <Octicons name="chevron-down" color={color.base.content} size={10} style={{position: "absolute", right: 10, bottom: 30}}/>
            </TouchableOpacity>
            <BottomSheet title={placeholder} visible={show} onRequestClose={() => setShow(false)}>
                <ScrollView style={{maxHeight: 500}} showsVerticalScrollIndicator={false}>
                    <Wrapper>
                        {options.map((opt, index) => (
                            <TouchableOpacity
                              style={{paddingHorizontal: 20, borderRadius: 10, backgroundColor: opt.value === value ? color.card.bg : "transparent", height: 48, justifyContent: "center"}}
                              key={index}
                              onPress={() => {onChange?.(String(opt.value)); setShow(false)}}
                            >
                                <Wrapper flexDirection="row" gap={10}>
                                    {opt.value === value && <Octicons name="check" color={color.success.bg} size={16}/>}
                                    <Text>{opt.label}</Text>
                                </Wrapper>
                            </TouchableOpacity>
                        ))}
                        {withReset && (
                            <TouchableOpacity style={{paddingHorizontal: 20, borderRadius: 10, height: 48, justifyContent: "center"}} onPress={() => {onChange?.(""); setShow(false)}}>
                                <Text>Reset Pilihan</Text>
                            </TouchableOpacity>
                        )}
                    </Wrapper>
                </ScrollView>
            </BottomSheet>

        </>
    );
};

export default Select;