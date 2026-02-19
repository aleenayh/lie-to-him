import { GameProvider } from "@state/Context";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <GameProvider>
          <Stack
            screenOptions={{
              contentStyle: {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                backgroundColor: "black",
                overflow: "hidden",
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="game" options={{ headerShown: false }} />
            <Stack.Screen name="unlock" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="gameOver" options={{ headerShown: false }} />
          </Stack>
        </GameProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
