import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { View, ViewStyle, useColorScheme } from "react-native";

type WrapperProps = PropsWithChildren & ViewStyle;

const Wrapper: FC<WrapperProps> = ({ children, ...props }) => {
  const colorSchema = useColorScheme() == "dark" ? "light" : "dark";
  return (
    <>
      <View style={[props]}>{children}</View>
      <StatusBar style={colorSchema} />
    </>
  );
};

export default Wrapper;