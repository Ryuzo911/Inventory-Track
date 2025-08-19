import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  ColorSchemeName,
  ColorValue,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useStorageState } from "./useStorageState";

type ColorScheme = {
  bg: ColorValue;
  content: ColorValue;
};

export type ThemeColors = {
  primary: ColorScheme;
  secondary: ColorScheme;
  accent: ColorScheme;
  neutral: ColorScheme;
  base: ColorScheme;
  info: ColorScheme;
  success: ColorScheme;
  warning: ColorScheme;
  error: ColorScheme;
  card: ColorScheme;
  input: ColorScheme;
};

type Colors = {
  light: ThemeColors;
  dark: ThemeColors;
};

const colors: Colors = {
  light: {
    primary: { bg: "#3ECF8E", content: "#0D3B2E" },
    secondary: { bg: "#1A202C", content: "#CBD5E0" },
    accent: { bg: "#0E9F6E", content: "#E6FFFA" },
    neutral: { bg: "#2D3748", content: "#F7FAFC" },
    base: { bg: "#F7FAFC", content: "#1A202C" },
    info: { bg: "#3182CE", content: "#EBF8FF" },
    success: { bg: "#38A169", content: "#F0FFF4" },
    warning: { bg: "#ED8936", content: "#FFFAF0" },
    error: { bg: "#E53E3E", content: "#FFF5F5" },
    card: { bg: "#FFFFFF", content: "#1A202C" },
    input: { bg: "#EDF2F7", content: "#1A202C" },
  },
  dark: {
    primary: { bg: "#3ECF8E", content: "#0D3B2E" },
    secondary: { bg: "#1A202C", content: "#E2E8F0" },
    accent: { bg: "#0E9F6E", content: "#D1FAE5" },
    neutral: { bg: "#171923", content: "#CBD5E0" },
    base: { bg: "#12151C", content: "#E2E8F0" },
    info: { bg: "#2B6CB0", content: "#DBEAFE" },
    success: { bg: "#276749", content: "#C6F6D5" },
    warning: { bg: "#C05621", content: "#FEEBCB" },
    error: { bg: "#9B2C2C", content: "#FED7D7" },
    card: { bg: "#1A1E24", content: "#E2E8F0" },
    input: { bg: "#2A2E35", content: "#CBD5E0" },
  },
};

const ThemeContext = createContext<{
  theme: ColorSchemeName;
  setTheme: (theme: "light" | "dark") => void;
  color: ThemeColors;
  isLoading: boolean;
}>({
  theme: "light",
  setTheme: () => {},
  color: colors.light,
  isLoading: false,
});

export const useColor = () => {
  const value = useContext(ThemeContext);
  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error("useColor must be used inside a <ThemeProvider />");
  }
  return value;
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const [[isLoading, theme], changeTheme] = useStorageState("theme");
  const systemTheme = useColorScheme() === "dark" ? "dark" : "light";

  const hasSetTheme = useRef(false);

  useEffect(() => {
    if (!isLoading && !theme && !hasSetTheme.current) {
      changeTheme(systemTheme);
      hasSetTheme.current = true;
    }
  }, [isLoading, theme, changeTheme, systemTheme]);

  if (isLoading || (!theme && !hasSetTheme.current)) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Loading...</Text>
      </View>
    )
}

const selectedTheme: ColorSchemeName =
    theme === "light" || theme === "dark" ? theme : systemTheme;

  const color = colors[selectedTheme];

  return (
    <ThemeContext.Provider
      value={{
        theme: selectedTheme,
        color,
        isLoading,
        setTheme: (theme) => {
          if (theme === null || theme === undefined) {
            throw new Error("Theme cannot be null or undefined");
          }
          changeTheme(theme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}




