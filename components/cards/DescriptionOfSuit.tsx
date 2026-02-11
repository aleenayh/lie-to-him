import {
    Image,
    type ImageSourcePropType,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function DescriptionOfSuit({
	suit,
	image,
}: {
	suit: "swords" | "wands" | "cups" | "pentacles";
	image: ImageSourcePropType;
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Minor Arcana: {suit.charAt(0).toUpperCase() + suit.slice(1)}
			</Text>
			<View style={styles.imageContainer}>
				<Image source={image} style={styles.image} />
			</View>
			{descriptions[suit].map((description, index) => (
				<Text
					key={`suit-${suit}-${
						// biome-ignore lint/suspicious/noArrayIndexKey: not important
						index
					}`}
					style={styles.description}
				>
					{description}
				</Text>
			))}
		</View>
	);
}

const descriptions: Record<
	"swords" | "wands" | "cups" | "pentacles",
	string[]
> = {
	swords: [
		"Intimidate him with your certainty.",
		"He believes you when the force of your argument beats his doubts away.",
		"He doubts you when his anger rears its head in response.",
	],
	wands: [
		"Appeal to his emotions.",
		"He believes you when you break his heart.",
		"He doubts you when your passion is performative.",
	],
	cups: [
		"Overwhelm him with details.",
		"He believes you when the specificity feels real.",
		"He doubts you when the details begin to contradict each other.",
	],
	pentacles: [
		"Disarm him with logic.",
		"He believes you when you confuse him with complexity.",
		"He doubts you when your argument is fallacious or circular.",
	],
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "90%",
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		color: "#9a5341",
		fontFamily: "typewriter",
	},
	imageContainer: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "75%",
		aspectRatio: 9 / 16,
		width: "auto",
		padding: 10,
		borderWidth: 2,
		borderColor: "#e7cda7",
		overflow: "hidden",
	},
	image: {
		resizeMode: "center",
		opacity: 0.8,
		zIndex: -1,
		inset: 0,
	},
	description: {
		fontSize: 16,
		textAlign: "center",
		color: "#9a5341",
		fontFamily: "typewriter",
		marginBottom: 10,
	},
});
