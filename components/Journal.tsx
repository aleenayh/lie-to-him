import { useGame } from "@state/Context";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function Journal({ onSwipeAway }: { onSwipeAway: () => void }) {
	const { gameState, updateGameState } = useGame();
	const [journalText, setJournalText] = useState(gameState.journal);

	const saveJournal = () => {
		updateGameState({ ...gameState, journal: journalText });
		ToastAndroid.show("Journal saved", ToastAndroid.SHORT);
	};

	return (
		<Swipeable
			onSwipeableOpen={onSwipeAway}
			renderLeftActions={() => (
				<View style={[styles.swipePreview, styles.swipePreviewLeft]}>
					<Text style={[styles.swipePreviewText, styles.swipePreviewTextLeft]}>
						Back to Game
					</Text>
				</View>
			)}
			leftThreshold={100}
		>
			<Pressable
				onPress={() => Keyboard.dismiss()}
				style={styles.outerContainer}
			>
				<Text style={styles.header}>Journal</Text>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<View style={styles.interior}>
						<TextInput
							style={styles.input}
							multiline={true}
							textAlignVertical="top"
							value={journalText}
							onChangeText={setJournalText}
						/>

						<Pressable style={styles.button} onPress={saveJournal}>
							<Text style={styles.buttonText}>Save Journal</Text>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</Pressable>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#9a5341",
		justifyContent: "center",
		alignItems: "stretch",
	},
	container: {
		backgroundColor: "#9a5341",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	header: {
		color: "papayawhip",
		textAlign: "center",
		marginBottom: 12,
		fontFamily: "rocker",
		fontSize: 24,
	},
	interior: {
		maxHeight: "70%",
		overflowY: "auto",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	button: {
		backgroundColor: "rgba(255, 239, 213, 0.5)",
		width: "80%",
		padding: 10,
		borderRadius: 10,
		margin: 10,
		textAlign: "center",
		color: "#e7cda7",
		fontFamily: "typewriter",
		fontSize: 24,
	},
	buttonText: {
		textAlign: "center",
		color: "#9a5341",
		fontFamily: "typewriter",
		fontSize: 24,
	},
	input: {
		backgroundColor: "rgba(255, 239, 213, 0.5)",
		width: "80%",
		height: "100%",
		marginVertical: 20,
		padding: 10,
		borderRadius: 10,
		margin: 10,
		borderWidth: 1,
		borderColor: "#9a5341",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		fontFamily: "typewriter",
		fontSize: 14,
	},
	swipePreview: {
		backgroundColor: "#9a5341",
		display: "flex",
		flex: 1,
		justifyContent: "center",
		padding: 10,
		margin: 10,
	},
	swipePreviewLeft: {
		alignItems: "flex-start",
	},
	swipePreviewText: {
		color: "#e7cda7",
		fontFamily: "typewriter",
		fontSize: 24,
	},
	swipePreviewTextLeft: {
		transform: [{ rotate: "-90deg" }],
	},
});
