import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import { TextInput, TextInputProps, ViewStyle } from "react-native"
import Wrapper from "./Wrapper";
import Text from "./Text";
import { Octicons } from "@expo/vector-icons";

type InputProps = TextInputProps & {
    label?: string;
    wrapperStyle?: ViewStyle;  
};

const Input: FC<InputProps> = ({ label, wrapperStyle, style, ...props }) => {
  const { color } = useColor();
  return (
    <Wrapper gap={5} {...wrapperStyle}>
      {label && <Text variant="label">{label}</Text>}
      <TextInput
        placeholderTextColor={"#808080"}
        style={[
          {
            minHeight: 48,
            backgroundColor: color.input.bg,
            color: color.input.content,
            fontFamily: "Medium",
            borderRadius: 10,
            paddingHorizontal: 20,
          },
          style,
        ]}
        {...props}
      />
    </Wrapper>
  );
};

export default Input;