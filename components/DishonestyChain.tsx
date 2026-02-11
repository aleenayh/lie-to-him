import { useGame } from "@state/Context";
import { Text, View } from "react-native";
import { chainStyles } from "./DesperationChain";

export default function DishonestyChain() {
  const {
    gameState: { dishonesty: dishonestyLevel },
  } = useGame();
  return (
    <View style={chainStyles.container}>
      <View style={chainStyles.string}>
        <View style={chainStyles.chainBackground} />
        {Array.from({ length: dishonestyLevel }, (_, index) => (
          <View
            key={`chain-item-${
              // biome-ignore lint/suspicious/noArrayIndexKey: visual only
              index
            }`}
            style={chainStyles.chainItemFilled}
          />
        ))}
      </View>
      <Text style={chainStyles.sidewaysText}>Dishonesty</Text>
    </View>
  );
}
