import {
  View,
  Text,
  ViewStyle,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Card from "@/components/Card";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { getPokemonArtwork } from "@/functions/pokemon";

type props = {
  style: ViewStyle;
  id: number;
  name: string;
};

const PokemonCard = ({ style, id, name }: props) => {
  const colors = useThemeColors();
  return (
    <Link href={{ pathname: "/pokemon/[id]", params: { id } }} asChild>
      <Pressable style={style}>{/*android_ripple={{color: colors.tint, foreground: true}} on peut ajouter cette props pour avoir un effet quand on clique sur la zone préssable. */}
        <Card style={styles.card}>
          <View
            style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
          />
          <ThemedText style={styles.id} variant="caption" color="grayMedium">
            #{id.toString().padStart(3, "0")}
          </ThemedText>

          <Image
            source={{
              uri: getPokemonArtwork(id),
            }}
            width={72}
            height={72}
          />

          <ThemedText>{name}</ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    alignItems: "center",
    padding: 4,
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
  },
});

export default PokemonCard;
