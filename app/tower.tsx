import { Text, View } from "react-native";

export default function Tower() {
  return (
    <View
      style={{
        backgroundColor: "papayawhip",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "80%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>TODO!</Text>
      </View>
    </View>
  );
}
