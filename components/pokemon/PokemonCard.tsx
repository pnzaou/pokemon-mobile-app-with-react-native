import { View, Text, ViewStyle, Image, StyleSheet } from "react-native";
import Card from "@/components/Card";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/hookes/useThemeColors";

type props = {
  style: ViewStyle;
  id: number;
  name: string;
};

const PokemonCard = ({ style, id, name }: props) => {
  const colors = useThemeColors()
  return (
    <Card style={[style, styles.card]}>
      <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]}/>
      <ThemedText style={styles.id} variant="caption" color="grayMedium">
        #{id.toString().padStart(3, "0")}
      </ThemedText>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        }}
        width={72}
        height={72}
      />
      <ThemedText>{name}</ThemedText>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    alignItems: "center",
    padding: 4
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7
  }
});

export default PokemonCard;
