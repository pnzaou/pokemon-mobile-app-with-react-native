import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAudioPlayer } from "expo-audio"
import { Colors } from "@/constants/Colors";
import {
  formatSize,
  formatWeight,
  getPokemonArtwork,
} from "@/functions/pokemon";
import Card from "@/components/Card";
import PokemonType from "@/components/pokemon/PokemonType";
import PokemonSpec from "@/components/pokemon/PokemonSpec";
import PokemonStat from "@/components/pokemon/PokemonStat";

const Pokemon = () => {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id: params.id,
  });

  const player = useAudioPlayer();

  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replaceAll("\n", ". ");

  const onImagePress = () => {
    const cry = pokemon?.cries.latest
    if(!cry) {
      return
    }
    player.replace(cry)
    player.play()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorType }]}>
      <View>
        <Image
          source={require("@/assets/images/Pokeball_big.png")}
          style={styles.pokeball}
          width={208}
          height={208}
        />
        <Row style={styles.header}>
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image
                source={require("@/assets/images/arrow_back.png")}
                width={32}
                height={32}
              />
              <ThemedText color="grayWhite" variant="headline">
                {pokemon?.name}
              </ThemedText>
            </Row>
          </Pressable>
          <ThemedText color="grayWhite" variant="subtitle2">
            #{params.id.padStart(3, "0")}
          </ThemedText>
        </Row>
        <View style={styles.body}>
          <Row style={styles.imageRow}>
            <Pressable onPress={onImagePress}>
              <Image
                style={styles.artwork}
                source={{
                  uri: getPokemonArtwork(params.id),
                }}
                width={200}
                height={200}
              />
            </Pressable>
          </Row>

          <Card style={styles.card}>
            <Row gap={16}>
              {types.map((type) => (
                <PokemonType name={type.type.name} key={type.type.name} />
              ))}
            </Row>
            <ThemedText variant="subtitle1" style={{ color: colorType }}>
              About
            </ThemedText>
            <Row>
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderRightWidth: 1,
                  borderColor: colors.grayLight,
                }}
                title={formatWeight(pokemon?.weight)}
                description="Weight"
                image={require("@/assets/images/weight.png")}
              />
              <PokemonSpec
                style={{
                  borderStyle: "solid",
                  borderRightWidth: 1,
                  borderColor: colors.grayLight,
                }}
                title={formatSize(pokemon?.height)}
                description="Size"
                image={require("@/assets/images/straighten.png")}
              />
              <PokemonSpec
                title={pokemon?.moves
                  .slice(0, 2)
                  .map((m) => m.move.name)
                  .join("\n")}
                description="Size"
              />
            </Row>
            <ThemedText>{bio}</ThemedText>

            {/* Stats */}
            <ThemedText variant="subtitle1" style={{ color: colorType }}>
              Base Stats
            </ThemedText>

            <View style={{ alignSelf: "stretch" }}>
              {pokemon?.stats.map((stat) => (
                <PokemonStat
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                  color={colorType}
                />
              ))}
            </View>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },

  pokeball: {
    opacity: 0.1,
    position: "absolute",
    right: 8,
    top: 8,
  },

  imageRow: {
    position: "absolute",
    top: -140,
    zIndex: 2,
  },

  header: {
    margin: 20,
    justifyContent: "space-between",
  },

  artwork: {},

  body: {
    marginTop: 144,
  },

  card: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 16,
    alignItems: "center",
  },
});

export default Pokemon;

// 2:13:26
