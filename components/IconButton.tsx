import { ThemeColors, useColor } from "@/hooks/useColor";
import { Octicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  icon: keyof typeof Octicons.glyphMap;
  color?: keyof ThemeColors;
  size?: "default" | "small" | "large";
  circle?: boolean;
};

const IconButton: FC<ButtonProps> = ({
  icon,
  color = "primary",
  style,
  disabled,
  size = "default",
  circle = false,
  ...props
}) => {
  const { color: theme } = useColor();
  const { bg, content } = theme[color];

  const buttonSize = {
    default: 48,
    small: 38,
    large: 60,
  };
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: bg,
          height: buttonSize[size],
          width: buttonSize[size],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          borderRadius: circle ? buttonSize[size] : 10,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      {icon && <Octicons name={icon} size={20} color={content} />}
    </TouchableOpacity>
  );
};

export default IconButton;