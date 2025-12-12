import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { AppSettingsProvider } from "./context/AppSettingsContext";
import { ProgressProvider } from "./context/ProgressContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <ProgressProvider>
        <AppSettingsProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </AppSettingsProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}
