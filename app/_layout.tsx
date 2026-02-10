import { GameProvider } from "@state/Context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GameProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="game" options={{ headerShown: false }} />
      <Stack.Screen name="tower" options={{ headerShown: false }} />
      <Stack.Screen name="unlock" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
    </Stack>
    </GameProvider>
  );
}
