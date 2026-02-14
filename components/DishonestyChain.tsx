import { useGame } from "@state/Context";
import { Text, View } from "react-native";
import Animated, {
  RotateInUpLeft,
  RotateOutDownLeft,
} from "react-native-reanimated";
import { chainStyles } from "./DesperationChain";

export default function DishonestyChain() {
  const {
    gameState: { dishonesty: dishonestyLevel },
  } = useGame();
  return (
    <View style={chainStyles.container}>
      <View style={chainStyles.string}>
        <View style={chainStyles.chainBackground} />
        {Array.from({ length: Math.max(9, dishonestyLevel) }, (_, index) => {
          const filled = index + 1 <= dishonestyLevel;
          return filled ? (
            <Animated.View
              entering={RotateInUpLeft.duration(1000)}
              exiting={RotateOutDownLeft.duration(1000)}
              key={`dishonesty-chain-item-${
                // biome-ignore lint/suspicious/noArrayIndexKey: visual only
                index
              }`}
            >
              <View style={chainStyles.chainItemFilled} />
            </Animated.View>
          ) : (
            <View
              style={chainStyles.chainItemPlaceholder}
              key={`dishonesty-chain-item-${
                // biome-ignore lint/suspicious/noArrayIndexKey: visual only
                index
              }`}
            />
          );
        })}
      </View>
      <Text style={chainStyles.sidewaysText}>Dishonesty</Text>
    </View>
  );
}
