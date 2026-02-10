import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function ModalComponent({
  visible,
  onRequestClose,
  children,
}: {
  visible: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
}) {
  return (

          <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
    >
          <View style={styles.background}>
      <View style={styles.modalContainer}>
        {children}
        <Pressable onPress={onRequestClose} style={styles.button}>
          <Text style={styles.buttonText}>continue</Text>
        </Pressable>
      </View>
      </View>
    </Modal>

  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "papayawhip",
    flex:1,
    height: "100%",
    width: "100%"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "#e7cda7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});
