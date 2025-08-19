import { useColor } from "@/hooks/useColor";
import { FC } from "react";
import {
  ColorValue,
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from "react-native";

type TextProps = RNTextProps & {
    variant?: keyof typeof styles;
    color?: ColorValue;
    align?: TextStyle["textAlign"];
};

const Text: FC<TextProps> = ({
    variant = "text",
    align = "left",
    color: textColor,
    style,
    ...props
}) => {
     const { color } = useColor();
  return (
    <RNText
      style={[
        styles[variant],
        {
          textAlign: align,
          color: textColor ?? color.base.content,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default Text;

const styles = StyleSheet.create({
  small: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: "Medium",
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Medium",
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "Medium",
  },
  button: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "SemiBold",
  },
  menutitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SemiBold",
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "SemiBold",
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: "Bold",
  },
});