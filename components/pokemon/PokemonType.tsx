import { Colors } from "@/constants/Colors";
import { View, Text, ViewStyle } from "react-native";
import ThemedText from "../ThemedText";

type Props = {
  name: keyof (typeof Colors)["type"];
};

const PokemonType = ({ name }: Props) => {
  return (
    <View style={[rootStyle, { backgroundColor: Colors.type[name] }]}>
      <ThemedText
        color="grayWhite"
        variant="subtitle3"
        style={{ textTransform: "capitalize" }}
      >
        {name}
      </ThemedText>
    </View>
  );
};

const rootStyle = {
  flex: 0,
  height: 20,
  paddingHorizontal: 8,
  borderRadius: 8,
} satisfies ViewStyle;

export default PokemonType;
