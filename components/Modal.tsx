import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

const borderSrc = require("../assets/images/border.png");

export default function ModalComponent({
  visible,
  onRequestClose,
  children,
  continueButtonEnabled = true,
}: {
  visible: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
  continueButtonEnabled?: boolean;
}) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.background}>
        <View style={styles.modalContainer}>
          <TopLeftBorder />
          <TopRightBorder />
          <BottomLeftBorder />
          <BottomRightBorder />
          <View style={styles.interior}>
            {children}

            <Pressable
              onPress={onRequestClose}
              style={[styles.button, !continueButtonEnabled && styles.disabled]}
              disabled={!continueButtonEnabled}
            >
              <Text style={styles.buttonText}>continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const TopLeftBorder = () => {
  return (
    <Image
      source={borderSrc}
      style={{
        position: "absolute",
        tintColor: "#9a5341",
        top: -40,
        left: -16,
        width: "30%",
        resizeMode: "contain",
        transform: [{ rotate: "90deg" }],
      }}
    />
  );
};

const TopRightBorder = () => {
  return (
    <Image
      source={borderSrc}
      style={{
        position: "absolute",
        tintColor: "#9a5341",
        top: -40,
        right: -16,
        width: "30%",
        resizeMode: "contain",
        transform: [{ rotate: "90deg" }, { scaleY: -1 }],
      }}
    />
  );
};

const BottomLeftBorder = () => {
  return (
    <Image
      source={borderSrc}
      style={{
        position: "absolute",
        tintColor: "#9a5341",
        bottom: -40,
        left: -16,
        width: "30%",
        resizeMode: "contain",
        transform: [{ rotate: "270deg" }, { scaleY: -1 }],
      }}
    />
  );
};

const BottomRightBorder = () => {
  return (
    <Image
      source={borderSrc}
      style={{
        position: "absolute",
        bottom: -40,
        right: -16,
        width: "30%",
        resizeMode: "contain",
        transform: [{ rotate: "270deg" }],
        tintColor: "#9a5341",
      }}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
    backgroundColor: "#e7cda7",
    borderRadius: 10,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    elevation: 5,
    position: "relative",
    borderWidth: 1,
    borderColor: "#9a5341",
  },
  interior: {
    padding: 20,
    paddingTop: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#9a5341",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    color: "#e7cda7",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "rocker",
    fontSize: 24,
  },
  buttonText: {
    textAlign: "center",
    color: "#e7cda7",
    fontFamily: "typewriter",
    fontSize: 24,
  },
  disabled: {
    opacity: 0.8,
  },
});
