// Import des composants UI personnalisés
import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import ThemedText from "@/components/ThemedText";
import { getPokemeonId } from "@/functions/pokemon";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { View, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const index = () => {
  const colors = useThemeColors();

  // Hook qui récupère les Pokémon avec React Query et gère la pagination
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21');

  // Les données retournées sont paginées (data.pages)
  // On fusionne toutes les pages en une seule liste de Pokémon
  const pokemons = data?.pages.flatMap(page => page.results) ?? [];

  return (
    // SafeAreaView évite que le contenu passe sous la barre système
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>

      {/* Header de l'écran */}
      <View style={styles.header}>

        {/* Icône Pokéball */}
        <Image
          source={require("@/assets/images/pokeball.png")}
          width={24}
          height={24}
        />

        {/* Titre de la page */}
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </View>

      {/* Carte contenant la liste des Pokémon */}
      <Card style={styles.body}>

        {/* FlatList permet d'afficher une grande liste performante */}
        <FlatList

          // Données à afficher
          data={pokemons}

          // Affichage en grille de 3 colonnes
          numColumns={3}

          // Style appliqué au container de la liste
          contentContainerStyle={[styles.gridGap, styles.list]}

          // Style appliqué à chaque ligne de la grille
          columnWrapperStyle={styles.gridGap}

          // Loader affiché en bas pendant le chargement
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }

          // Quand on arrive en bas de la liste → on charge la page suivante
          onEndReached={() => fetchNextPage()}

          // Comment afficher chaque Pokémon
          renderItem={({ item }) => (
            <PokemonCard
              style={{ flex: 1 / 3, height: 200 }}

              // On extrait l'id du Pokémon depuis son URL
              id={getPokemeonId(item.url)}

              // Nom du Pokémon
              name={item.name}
            />
          )}

          // Clé unique pour chaque élément
          keyExtractor={(item) => item.url}
        />
      </Card>
    </SafeAreaView>
  );
};


// Styles du composant
const styles = StyleSheet.create({

  // Container principal de la page
  container: {
    flex: 1,
    padding: 4,
  },

  // Header contenant l'icône et le titre
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12,
  },

  // Corps de la carte contenant la liste
  body: {
    flex: 1,
  },

  // Espacement dans la grille
  gridGap: {
    gap: 8,
  },

  // Padding interne de la liste
  list: {
    padding: 12,
  },
});


// Export du composant
export default index;